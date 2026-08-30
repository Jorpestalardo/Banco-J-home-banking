# donde esta esto y como entrar

esto es lo que te decia en el mail. escribo sin acentos como siempre, es como tipeo, no es
que este apurado. bueno, si estoy apurado.

## la direccion

**https://cita-ai.vercel.app/**

esa es. no es `cita.ai` ni `uat.cita.ai`, aunque en mis notas viejas figure asi.

que paso: el dominio `cita.ai` esta comprado, lo pagamos, esta a nombre nuestro. pero nunca
lo apunte a ningun lado. hay que tocar unos registros de DNS y configurarlo del lado del
hosting, son veinte minutos, y hace ocho meses que digo que los veinte minutos los saco la
semana que viene.

asi que mientras tanto la aplicacion vive en la direccion que te da el hosting sola, que es
esa de arriba. **es la que usan los usuarios de verdad.** cuando Fernando le manda el link a
un profesional, le manda ese.

lo mismo aplica a las paginas publicas de cada profesional. lo que en los documentos figura
como `cita.ai/carlos-rojas` en la realidad es `cita-ai.vercel.app/carlos-rojas`.

## lo del ambiente de UAT

aca me tengo que hacer cargo de algo.

en mis notas escribi que hay dos ambientes, UAT y produccion, cada uno con su base. **eso hoy
no es asi.** arme el segundo proyecto, es cierto, y estuvo un tiempo. despues dejo de tener
sentido: cada vez que tenia que probar algo lo probaba contra produccion porque era mas
rapido y porque los datos que me servian estaban ahi. hace meses que no lo toco. no se ni si
sigue levantando.

o sea que **hoy hay un solo lugar y es el que usa la gente.**

lo digo sin vueltas porque te cambia como trabajas:

- todo lo que hagas lo hacen tambien los usuarios reales, al mismo tiempo
- los turnos que crees son turnos de verdad en la base de verdad
- si mandas un mail de prueba, sale un mail de verdad
- no hay forma de volver atras. no hay copia, no hay backup propio, no hay script para
  rearmar la base desde cero. lo que se cargo, se cargo

no me enorgullece pero es lo que hay, y prefiero que lo sepas ahora y no cuando ya cargaste
cincuenta turnos.

## como entrar

registrate como si fueras un profesional. la aplicacion no distingue, todos los que se
registran son lo mismo.

para el mail **usa mailinator o algo parecido**, una casilla descartable que puedas leer sin
tener una casilla de verdad. lo vas a necesitar, porque el sistema te manda correos y vas a
querer leerlos: la confirmacion de la reserva lleva adentro el link con el que el cliente
cancela, y sin abrir el mail no hay forma de llegar a esa pantalla.

dos cosas mas sobre los correos:

1. **salen desde un dominio de prueba**, no desde uno nuestro verificado. mucho proveedor los
   manda directo a correo no deseado. si no te llega nada, mira ahi antes de reportarlo.
2. son sincronos, o sea que salen dentro del mismo pedido de la reserva. si el servicio de
   mail esta lento, la reserva parece lenta. no es la reserva, es el mail.

## un par de cosas para que no pierdas tiempo

**la cuenta de Fernando no la toques.** tiene profesionales y clientes reales que reservaron
en serio.

**el plan gratuito tiene un tope.** si probas mucho con la misma cuenta vas a chocar contra
el, y a partir de ahi la aplicacion se comporta distinto. no es un error, esta puesto a
proposito. si te pasa y queres seguir probando otra cosa, registrate con otra casilla y
arranca de cero.

**los horarios.** cuando guardas tu horario de atencion, lo que guardas reemplaza todo lo que
habia antes, no se suma. la primera vez que te pase vas a pensar que se borro solo.

**si algo se rompe feo**, avisame y lo miro. lo que no puedo es adivinar: mandame que hiciste,
en que orden, y que esperabas que pasara.

---

*ultima edicion: 21/05/2026*
