# RV: RV: Re: Re: Antes del lanzamiento

> Hilo reenviado por Mariana. Lo pego tal cual para que quede en algún lado, porque acá se
> decidieron cosas que no están en ningún documento.

---

**De:** Mariana
**Para:** Diego, Fernando
**Fecha:** 03/03/2026 08:41
**Asunto:** RV: RV: Re: Re: Antes del lanzamiento

Chicos, les reenvío todo el hilo porque me lo pidió Sol y me di cuenta de que **nada de esto
está en la especificación**. La spec sigue en la 0.3 y ya no describe lo que estamos por
sacar.

Lo que quedó decidido, resumido:

1. Los mails salen por **Resend**, no por el servicio de Supabase.
2. **El recordatorio del día anterior no entra en el lanzamiento.**
3. El soft launch es con **20 a 50 profesionales** de conocidos, y medimos **8 semanas**.
4. El botón del banner se llama **"Más información sobre el Plan Pro"**.

Diego, el punto 2 me sigue preocupando. Lo dejo asentado abajo.

M.

---

**De:** Diego
**Para:** Mariana, Fernando
**Fecha:** 28/02/2026 19:22
**Asunto:** Re: Re: Antes del lanzamiento

Va por partes.

**Mails.** Los pasé a **Resend**. El servicio que venía integrado con Supabase está pensado
para los correos del propio sistema de autenticación —confirmar cuenta, resetear
contraseña— y para eso anda bien. Para los correos del producto se quedaba corto: no puedo
armar las plantillas como quiero y la entregabilidad venía mal, varios iban a spam.

Con Resend ya está andando. Ojo que **todavía no tenemos dominio propio verificado**, así que
por ahora los mails salen desde el dominio de prueba de ellos. Eso hay que resolverlo antes
de escalar, porque va a seguir cayendo en spam para algunos proveedores.

**Recordatorio del día anterior.** Acá necesito ser claro: **no llega para el lanzamiento.**

No es que no lo quiera hacer. El problema es que un recordatorio "el día anterior" necesita
algo que se ejecute solo todos los días a una hora fija, y eso en el plan que tenemos en
Vercel no existe. Las opciones son:

- Pagar el plan de arriba de Vercel
- Meter un servicio externo que dispare la tarea
- Hacerlo a mano todos los días (no)

Cualquiera de las dos primeras son dos o tres días de trabajo más la plata. Con el
lanzamiento encima, **prefiero salir sin recordatorios y agregarlos después.**

Todo lo demás de mails funciona: confirmación, aviso al profesional y aviso de cancelación.

**Soft launch.** De acuerdo con arrancar con conocidos.

D.

---

**De:** Fernando
**Para:** Diego, Mariana
**Fecha:** 27/02/2026 11:05
**Asunto:** Re: Antes del lanzamiento

Sobre lo del recordatorio: entiendo que sea complicado pero **es literalmente la mitad de lo
que le vendo a la gente**. El entrenador que entrevistamos, al que le cancelan quince
minutos antes, si le decís que no hay recordatorio te dice "entonces me quedo con mi
libreta".

Igual no voy a frenar el lanzamiento por eso. Salgamos, pero que quede como lo primero que
se hace después.

Sobre el lanzamiento: junté **treinta y dos profesionales** que están dispuestos a probarlo.
Hay de todo, psicólogos, entrenadores, dos estilistas y una nutricionista. Ninguno paga nada
obviamente.

Lo que quiero mirar en esas primeras semanas:

- Que se registren **más de 20 por semana** una vez que abramos
- Que **más del 60 %** de los que se registran terminen configurando su agenda y reciban al
  menos una reserva **en los primeros 7 días**. Si se registran y no lo usan, no sirvió de
  nada
- Que a las **4 semanas siga usándolo más del 40 %**
- Y el número que a mí más me importa: que **más del 60 % de las citas las cree el cliente
  final** desde el link, y no el profesional a mano. Si el profesional termina cargando todo
  él, no le ahorramos nada

Le damos **8 semanas** y ahí decidimos si esto sigue o no.

F.

---

**De:** Mariana
**Para:** Diego, Fernando
**Fecha:** 22/02/2026 16:47
**Asunto:** Re: Antes del lanzamiento

Tres cosas que necesito cerrar antes de que salga:

**1. El botón del banner de límite.** En la reunión de arranque lo llamamos "Solicitar
Upgrade", en la especificación quedó como "Ver Opciones", y en la pantalla que hizo Sol dice
otra cosa. **Elijamos uno.**

Mi voto: **"Más información sobre el Plan Pro"**. Es más largo pero deja claro que no está
comprometiéndose a nada, que es lo que frena a la gente a hacer clic. Y como todavía no
tenemos plan pago, "Solicitar Upgrade" promete algo que no existe.

**2. Los mails.** Diego, ¿cómo quedó esto? Me habías comentado que estabas viendo de
cambiarlo.

**3. ¿Sigue en pie el recordatorio del día anterior?** Pregunto porque no lo vi en la demo
del viernes.

M.

---

**De:** Fernando
**Para:** Mariana, Diego
**Fecha:** 12/02/2026 09:30
**Asunto:** Antes del lanzamiento

Gente, arranco el hilo para no perder las cosas en el chat.

Vi la demo y está muy bien. Reservé un turno desde el celular en menos de un minuto, que era
justo lo que queríamos.

Tengo dudas sobre algunas cosas del alcance y quiero que las cerremos antes de ponerle esto
a alguien de verdad en la mano. Las voy tirando en los próximos mails.

F.
