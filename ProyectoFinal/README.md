# Proyecto 3: Red Social de Recetas

### Descripción
Plataforma donde usuarios comparten recetas, las califican y comentan.

### Como iniciar la app
Para iniciar la app hay que darle permisos de ejecucion al archivo iniciar.sh y luego ejecutarlo --> Esto va a hacer que se cree un contenedor de Docker que contiene el backend y luego se va a ejecutar por separado un comando que permite que usemos la terminal de nuestra computadora para ver la salida del archivo ejecutado (inicio.py). Asi podemos ejecutar la UI y el back todo junto de manera simple. Se hizo asi porque dentro de docker no se puede usar una terminal aparentemente.
Se tiene que tener en cuenta que si por alguna razon se decide salir de la app entonces la proxima vez que se quiera ejecutar va a
ser suficiente ejecutar solo el archivo de python con el comando ```python3 frontend/inicio.py```. Si se vuelve a ejecutar iniciar.sh se va a perder toda la informacion guardad en la bdd (se va a reiniciar la bdd)
**Comandos (dentro de la carpeta ProyectoFinal):**
```chmod +x iniciar.sh```
```./iniciar.sh```

### Posibles credenciales para probar la app
email: juan@test.com
contrasenia: contraseniaPro

email: mario@test.com
contrasenia: otraContrasenia

### Posibles errores

**Instancia local de mongo activa**
```ERROR: for proyectofinal_mongodb_1  Cannot start service mongodb: driver failed programming external connectivity on endpoint proyectofinal_mongodb_1 (44e28f1d889725d8cd345fec08f7979c50c4e2bc31a930c11c9c93ec67e7922f): failed to bind port 0.0.0.0:27017/tcp: Error starting userland proxy: listen tcp4 0.0.0.0:27017: bind: address already in use```
**Solucion:** hay que detener monogdb en la maquina local para que la app pueda usar el puerto correspondiente
**Comando en linux:** ```sudo systemctl stop mongod```

**No se encuentra el contenedor**
```Error response from daemon: No such container: proyectofinal_backend_1```
**Solucion:** cuando ocurria este error simplemente borrabamos el container con el nombre proyectofinal_backend_1 y ejecutabamos iniciar.sh de nuevo. Primero tenes que identificarlo y luego borrarlo.
**Comandos en linux:** 
```sudo docker ps -a``` - y copia el nombre del container que sea proyectofinal_backend_1 (va a tener unos numero en frente)
```sudo docker rm <nombre_del_container>```

