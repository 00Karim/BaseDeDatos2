#!/bin/bash
echo "Cargando..."
# sudo docker-compose down 
#> /dev/null 2>&1
# construir la imagen y hacemos que no se vea ninguno de los mensajes que se muestran normalmente asi queda mas bonito
sudo docker-compose up --build -d 
#> /dev/null 2>&1
# clear
# correr el front
python3 frontend/inicio.py
