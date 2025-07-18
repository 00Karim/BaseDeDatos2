from time import sleep
import os

def clear_terminal():
    os.system('cls' if os.name == 'nt' else 'clear') # esta funcion limpia la terminal en linux y en windows

while True:
    print(
            "Recetas Online\n",
            "1 - Buscar receta por ingrediente\n",
            "2 - Ver top recetas\n",
            "3 - Publicar una receta\n",
            "0 - Salir\n"
        )
    eleccion = int(input("Ingresa el numero de tu eleccion: "))
    match eleccion:
        case 1:
            print("Buscando por ingrediente...")
            sleep(5)
            clear_terminal()
        case 2: 
            print("Viendo top recetas...")
            sleep(5)
            clear_terminal()
        case 3: 
            print("Publicando una receta...")
            sleep(5)
            clear_terminal()
        case 0: 
            print("Saliendo...")
            sleep(5)
            clear_terminal()
            break
        case _:
            print("Eleccion no valida")
            sleep(2)
            clear_terminal()
            