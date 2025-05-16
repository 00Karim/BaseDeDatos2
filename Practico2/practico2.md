# PRACTICO 2

### Ejercicio 1
Consigna:
    *1 - Crea una base de datos llamada empresa.
    2 - Agrega una colección empleados con 3 documentos que incluyan nombre, edad y puesto.
    3 - Actualiza la edad de uno de los empleados.
    4 - Elimina al empleado que tenga el puesto de "pasante".*

##### A continuacion adjuntamos una captura con los comandos ejecutados en la terminal:

<p align="center">
    <img src="img/ejercicio1SS.png"/>
</p>

### Ejercicio 2
Consigna:
*Consulta todos los empleados cuya edad esté entre 25 y 40 años. Usa operadores relacionales y lógicos.*

##### A continuacion adjuntamos una captura con los comandos ejecutados en la terminal:

<p align="center">
    <img src="img/ejercicio2SS.png"/>
</p>

### Ejercicio 3
Consigna:
*Recupera los nombres y puestos de todos los empleados, sin mostrar el `_id.`*

##### A continuacion adjuntamos una captura con los comandos ejecutados en la terminal:

<p align="center">
    <img src="img/ejercicio3SS.png"/>
</p>

### Ejercicio 4
Consigna:
*Agrega un campo direccion que incluya `calle`, `ciudad` y `codigo_postal`.*

##### A continuacion adjuntamos una captura con los comandos ejecutados en la terminal:

<p align="center">
    <img src="img/ejercicio4SS.png"/>
</p>

### Ejercicio 5
Consigna:
*Dada una colección `ventas` con campos `producto`, `cantidad` y `precio_unitario`, calcula el total de ventas por producto usando `$group` y `$sum`.*

##### A continuacion adjuntamos una captura con los comandos ejecutados en la terminal:

<p align="center">
    <img src="img/ejercicio5SS.png"/>
</p>

### Ejercicio 6
Consigna:
*Crea un índice compuesto sobre los campos `apellido` y `nombre` en una colección de `clientes`*

##### A continuacion adjuntamos una captura con los comandos ejecutados en la terminal:

<p align="center">
    <img src="img/ejercicio6SS.png"/>
</p>

### Ejercicio 7
Consigna:
*Crea una colección `cursos` y una colección `alumnos`. Luego inserta documentos donde los alumnos tengan una lista de  `id_curso` referenciando a los cursos.*

Primero vamos a crear la coleccion cursos para poder extraer el id de cada documento

##### Captura con el primer paso:

<p align="center">
    <img src="img/ejercicio7SSa.png"/>
</p>

Despues de eso ya podemos crear la coleccion alumnos con cada documento teniendo un campo `curso` que haga referencia al id del curso.

##### Captura con el segundo y ultimo paso:

<p align="center">
    <img src="img/ejercicio7SSb.png"/>
</p>

### Ejercicio 8
Consigna:
*Realiza una agregación donde se combinen los datos de alumnos y cursos usando `$lookup`.*

##### A continuacion adjuntamos una captura con los comandos ejecutados en la terminal:

<p align="center">
    <img src="img/ejercicio8SS.png"/>
</p>

### Ejercicio 9
Consigna:
*Describe con tus palabras las ventajas de usar un Replica Set y qué beneficios aporta el sharding en una base de datos de alto volumen.*

La ventaja principal de usar replica set es la rapida disponibilidad de los backups, si el primario falla entonces el que le siga puede tomar su lugar instantaneamente, desde el punto de vista de un usuario nisiquiera se habria notado que ocurrio ese evento. Por otro lado, usando Replica Set podemos tener unos cuantos backups de la misma base por lo que seria muchisimo mas dificil que el software que dependa de la base de datos quede sin funcionar. Otra ventaja que tiene Replica Set es el hecho que el backup esta siendo creado en tiempo real entonces cualquier modificacion que se haga es guardada instantaneamente por lo cual es casi imposible perder informacion si se cae
la base de datos primaria.

En una base de datos de alto volumen, el sharding hace que las operaciones sean mucho mas rapidas lo cual basicamente permite extender el tamano de la base de datos a dimensiones gigantes sin afectar el rendimiento de las operaciones que se hagan en ella.

### Ejercicio 10
Consigna:
*Muestra los pasos para crear un usuario con permisos de lectura y escritura, y los comandos necesarios para hacer backup y restauración de una base de datos.*
