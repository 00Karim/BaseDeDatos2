from time import sleep
import requests

def esperar_backend():
    print("Conectando con el servidor backend...")
    while True:
        cantidad_puntos = 0
        try:
            response = requests.get("http://localhost:3000/activo")
            if response.status_code == 200:
                print("Servidor disponible!\n")
                break
        except requests.exceptions.ConnectionError:
            puntos = "." * cantidad_puntos
            print("Cargando", puntos, end="\r")
            cantidad_puntos += 1
            if cantidad_puntos == 4:
                cantidad_puntos = 0
            sleep(1)

esperar_backend()