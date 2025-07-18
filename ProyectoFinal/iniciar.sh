#!/bin/bash
echo "Cargando..."
# construir la imagen y hacemos que no se vea ninguno de los mensajes que se muestran normalmente asi queda mas bonito
sudo docker-compose up --build -d > /dev/null 2>&1
clear
# correr la app, mapeando puertos
sudo docker exec -it proyectofinal_backend_1 python3 frontend/inicio.py