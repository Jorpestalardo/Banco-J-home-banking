# notas tecnicas - cita.ai

apuntes mios para no olvidarme como quedo armado esto. si lo lee alguien mas, suerte.

## stack

- **next.js** con app router. deploy en **vercel**: push a main = deploy. no hay pipeline
  ni nada, vercel se encarga
- **typescript**. aclaro: el tsconfig tiene `strict: false`. se que el documento de
  estandares dice que va en strict. lo puse en false para avanzar y nunca lo volvi a tocar
- **supabase** para todo el backend: postgres + auth + row level security. no hay servidor
  propio, no hay ORM, uso el cliente tipado de supabase
- **tailwind** + componentes de radix para la UI. iconos de lucide
- **react-hook-form** + **zod** para los formularios y las validaciones
- **date-fns** para fechas, con locale es
- los mails salen por el **servicio de correo transaccional de supabase**. al principio
  habia arrancado con sendgrid de otro proyecto pero al final use lo que ya venia integrado,
  una cosa menos que configurar

## tablas

cinco tablas, todas en public:

```
professionals   { id (FK a auth.users), name, email, slug, appointment_duration_minutes, created_at }
clients         { id, name, email, created_at }
appointments    { id, professional_id, client_id, start_time, end_time, status, created_at }
availability_rules { id, professional_id, day_of_week, start_time, end_time, created_at }
time_blocks     { id, professional_id, start_time, end_time, reason, created_at }
```

**professionals extiende auth.users**: el id es el mismo que el del usuario de supabase.
hay un trigger que crea el registro cuando alguien se registra.

`day_of_week` es un entero, **0 = domingo, 6 = sabado**. anotarlo porque me equivoque dos
veces.

`status` es un string con un check constraint. valores: `confirmed` | `cancelled`. no hay
enum de postgres, es un check. **esto ya me rompio una vez en produccion**, ver abajo.

`clients.email` esta como unique global. o sea que si la misma persona reserva con dos
profesionales distintos, es **un solo registro** de cliente compartido. la logica de negocio
en cambio habla de "clientes unicos de este profesional", que se resuelve por join contra
appointments. **funciona pero es raro y en algun momento va a molestar.**

`time_blocks.reason` esta en la tabla pero **no lo uso en ningun lado todavia**.

no hay views, no hay functions, no hay stored procedures. todo se resuelve desde el codigo.

## row level security

esta activo en las cinco tablas. las politicas:

- `professionals`: select publico (hace falta para la pagina de reservas), insert/update
  solo el dueño
- `clients`: select solo autenticados, **insert publico** (porque el cliente que reserva no
  tiene sesion)
- `appointments`: select/update solo el profesional dueño, **insert publico**
- `availability_rules`: select publico, todo lo demas solo el dueño
- `time_blocks`: idem

la politica de appointments es basicamente `auth.uid() = professional_id`.

## auth

- email + password, supabase auth
- el token de sesion vive **15 minutos** y se renueva con un refresh token de **7 dias**
- van en cookie httpOnly, no en localstorage
- el token de reseteo de password vence **a la hora**
- el reset usa PKCE, me costo mas de lo que esperaba
- la proteccion de rutas del dashboard esta en `middleware.ts`

## los slots

no guardo los turnos disponibles en ningun lado, los genero al vuelo:

1. agarro las availability_rules del profesional
2. genero la grilla del dia segun appointment_duration_minutes
3. le resto los appointments con status confirmed
4. le resto los time_blocks
5. lo que queda es lo disponible

se calcula **para la semana** desde la fecha que pidan. mientras los profesionales tengan
agendas chicas esto va bien. si alguna vez hay alguien con 200 turnos por dia hay que
repensarlo.

**pendiente conocido:** si el horario de atencion cruza la medianoche esto se rompe. el
profesor de la entrevista da clases hasta las 21 asi que por ahora no molesta.

## endpoints

quedaron dos grupos, y la separacion importa:

**los del profesional** (piden sesion):
```
GET    /api/appointments
GET    /api/clients
PUT    /api/professionals/settings
POST   /api/availability/rules
GET    /api/availability/blocks
POST   /api/availability/blocks
DELETE /api/availability/blocks
POST   /api/appointments/[id]/cancel
```

**los publicos** (sin sesion, para el flujo del cliente final):
```
GET    /api/public/availability
POST   /api/public/appointments
POST   /api/public/appointments/[id]/cancel
```

el namespace `/api/public/*` es a proposito: son los unicos que no piden auth y quiero
tenerlos separados para no confundirme.

**ojo con la cancelacion publica**: el cliente no tiene sesion, entonces RLS le bloquea el
update. tuve que usar el client de admin (service role) para saltear RLS en ese endpoint
puntual. funciona pero es el lugar mas delicado del codigo, si alguien adivina un id de
turno puede cancelarlo.

## la reserva

el POST hace:
- busca o crea el cliente por email
- valida el limite del plan gratuito
- valida que el slot este libre
- inserta el appointment

**el problema**: son operaciones separadas, lectura y escritura, sin transaccion. si dos
clientes mandan al mismo tiempo pueden pasar los dos la validacion. le agregue una segunda
verificacion justo antes del insert, que achica muchisimo la ventana pero **no la cierra**.

lo correcto seria hacerlo con una funcion de postgres y resolverlo en una sola transaccion.
anotado, no lo hice.

## limite del plan gratuito

```
FREE_PLAN_CLIENT_LIMIT = 10
```

esta en `src/lib/business/freemium.ts`, hardcodeado. si hay que cambiarlo es tocar codigo y
redeploy, **no hay panel de configuracion**.

el conteo es de clientes unicos del profesional, por email, contra la tabla appointments. es
un count con join. funciona pero se ejecuta en cada reserva y no esta indexado como
corresponde.

deje preparada la estructura para un campo `plan_tier` pero esta comentada: para el MVP
siempre es gratuito.

el mensaje de error tiene code `LIMIT_REACHED` y devuelve 403.

## mails

lo que sale hoy:
- bienvenida al registrarse
- confirmacion al cliente cuando reserva, con el link de cancelacion
- aviso al profesional cuando le reservan
- aviso de cancelacion a la parte que no cancelo

**el recordatorio del dia anterior NO esta hecho.** necesita un cron y vercel en el plan que
tenemos no da cron. hay que buscarle la vuelta o pagar. lo dejo pendiente y lo aviso porque
se que producto lo tiene como requisito.

el remitente esta hardcodeado en `src/lib/email/send.ts`. **no tenemos dominio propio
verificado**, asi que sale desde el dominio de prueba del proveedor. entregabilidad regular,
varios van a spam.

los envios son sincronos, dentro del request de la reserva. o sea que si el servicio de mail
tarda, la reserva tarda. deberia mandarlos en background.

## ambientes

dos:

| | url | que es |
| --- | --- | --- |
| UAT | uat.cita.ai | donde se prueba antes de liberar |
| produccion | cita.ai | lo que ve la gente |

cada uno con su proyecto de supabase, o sea **dos bases separadas**. eso esta bien.

**no hay ambiente de desarrollo ni de integracion.** cuando toco algo lo pruebo en local
contra la base de UAT, y despues subo a UAT. o sea que mientras yo estoy probando algo, UAT
se mueve. lo hablamos y por ahora se banca.

### los datos de UAT — leer esto

la base de UAT **se refresca copiando la de produccion**. es la forma rapida de tener datos
que se parezcan a los reales para probar.

le pase un script de anonimizacion que reemplaza los nombres y los emails de la tabla
clients. **pero solo esa tabla.** professionals quedo con los nombres y mails reales, porque
si los cambiaba se rompian los slugs y las urls publicas de prueba dejaban de funcionar.

o sea: **en UAT hay mails reales de profesionales de produccion.** lo se, esta mal, no
tuve tiempo de resolverlo bien. la vuelta correcta seria anonimizar tambien professionals y
regenerar los slugs, o directamente armar un seed con datos inventados.

no hay script de seed ni migraciones versionadas. el schema vive en la nube y los cambios
los hago desde el panel de supabase. **si se pierde el proyecto, no hay forma de recrear la
base.**

usuarios de prueba: uso mails de mailinator para poder leer los correos sin tener casillas
reales. las credenciales las tengo en un txt en la raiz del proyecto, que **me acabo de dar
cuenta que no esta en el gitignore**. arreglar.

## numeros de rendimiento

producto me pidio "objetivos de performance" para la spec y les pase esto. **son los
numeros que medi yo en local y en UAT**, no son un requisito que me haya dado nadie:

- la pagina publica de reservas carga en **menos de 2 segundos**. es la que mas me importa
  porque es la que ve el cliente final, y ademas es la unica que esta cacheada
- las llamadas a la api estan en el orden de los **300 a 500 ms** en el peor caso. lo mido
  con el percentil 95, o sea que 95 de cada 100 requests entran ahi
- las consultas simples a la base (traer un perfil) dan **menos de 100 ms**
- la pagina queda usable en **menos de 3 segundos**

**concurrencia**: no lo probe en serio. tirando requests a mano aguanta tranquilo, y por lo
que entiendo de como escala vercel deberiamos bancar **unos 100 usuarios al mismo tiempo**
sin despeinarnos. si esto crece a **mil o mas** hay que revisar el calculo de slots, que es
lo unico que hace trabajo de verdad.

**disponibilidad**: no tenemos monitoreo, asi que no puedo decir un numero real. vercel y
supabase publican **99.9 %** cada uno. si alguno de los dos se cae, nos caemos.

**errores**: tampoco los mido. no hay dashboard de errores, los veo cuando alguien reporta
algo o cuando miro los logs de vercel a mano.

**recuperacion**: si se rompe algo, el rollback en vercel es volver al deploy anterior desde
el panel. son **dos o tres minutos**. si el problema es de la base, no tengo backups propios
mas alla de los que hace supabase solo.

> anoto que **producto puso estos numeros como si fueran objetivos acordados**, y no lo son.
> son lo que da hoy. si alguien quiere garantizar 99.9 % hay que poner monitoreo y alertas,
> que no existen.

## deploy

- push a main y vercel deploya solo
- no hay github actions, no hay tests que correr
- una sola rama, main
- las variables de entorno estan cargadas a mano en el panel de vercel

## lo que no esta hecho

- recordatorio del dia anterior (necesita cron)
- horarios que crucen la medianoche
- transaccion real en la reserva (hoy es doble verificacion)
- rate limiting en el endpoint publico de reservas. **cualquiera puede tirarle requests**
- manejo de errores con clases propias, hoy es todo generico
- toasts, hoy uso alerts nativos
- tests. **no hay ninguno, de ningun tipo**
- indice para el conteo de clientes unicos

## cosas que me pasaron y anoto para no repetirlas

**el error 500 al reservar.** el status que mandaba no coincidia con el check constraint de
la tabla. reventaba con un error de base de datos que en el front se veia como error 500
generico. ya esta arreglado pero me costo encontrarlo porque el mensaje no decia nada util.

**los horarios.** guardo timestamps sin pensar demasiado en zonas horarias. el profesional
carga "9 a 18" y yo lo guardo tal cual. **no probe que pasa si el cliente esta en otro huso
horario que el profesional**, y tenemos usuarios en argentina, mexico y chile. **esto me
huele mal.**

**la url publica.** el profesional se registra, se le genera el slug, y en ningun lado del
dashboard se ve cual es. o sea que tiene su pagina de reservas y no sabe cual es el link. me
lo reportaron y todavia no lo arregle, es de UI.

---

*ultima edicion: 30/10/2025*
