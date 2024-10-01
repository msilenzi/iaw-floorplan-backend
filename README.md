# Dudas

**Cuando esté la autenticación hecha se puede usar para identificar al usuario?**

> Los proyectos tienen un propietario por lo que deben vincularse entre sí.
> De momento el id del usuario se pasa como parte del body, pero en un futuro
> con la autenticación hecha podría usarse eso para identificar al usuario.

...

**Cómo puedo manejar la información de los propietarios, proyectistas, etc.**

> Me gustaría que se pueda garantizar que tengan una estructura común
> Debería crear _"tablas"_ o puedo poner como un arreglo de objetos.

...

**Cómo hacer la relación muchos a muchos entre Usuario y Organización**

> Eso. No tengo ni idea

> Un arreglo de miembros en Organización??  
> _Pero después como hago para saber a que organizaciones pertenece un usuario_

> Lo mismo con un Plano y sus etiquetas

...

**Las etiquetas por proyecto se hacen?**

> Estoy pensando en algo parecido a lo que tiene Notion.
> Aunque parece medio difícil de implementar.

...

**Pensar cómo manejar el RegEx para el expediente**

> Al momento de crear la organización tengan que definirlo y se guarda en la BD.

...

**Usar enums o relaciones en la base de datos**

> Eso. Qué es mejor?
> Entiendo que con enums va a ser más fácil

...

**Existe algún tipo de standard para las escalas**

> Quiero ver si es un string o un enum o algo de eso

...

**Debería agregar timestamps**

> La fecha en la que se creó un usuario, recurso, organización, etc.

...

## Sobre NestJS

**Puedo hacer que un service conozca a otro para realizar tareas**

> Por ejemplo, si al borrar un usuario tengo que aplicar un cambio en las
> organizaciones definir la operatoria de esos cambios en el service de
> organizaciones y que el otro simplemente lo llame.

**Quién debería hacer validaciones sobre info en la BD**

> Service o Controller

...
