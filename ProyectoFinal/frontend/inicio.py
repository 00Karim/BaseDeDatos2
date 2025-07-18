from time import sleep
import requests
import os

def clear_terminal():
    os.system('cls' if os.name == 'nt' else 'clear') # esta funcion limpia la terminal en linux y en windows

def buscarRecetaPorIngrediente():
    print("---Buscar receta por ingrediente---")
    ingrediente = input("Ingresa el ingrediente: ")
    sleep(5)

def verTopRecetas():
    print("---Ver top de recetas---")
    sleep(5)

def publicarUnaReceta():
    print("---Publicar una receta---")
    sleep(5)

while True:
    print(
            "Recetas Online\n",
            "1 - Buscar receta por ingrediente\n",
            "2 - Ver top recetas\n",
            "3 - Publicar una receta\n",
            "0 - Salir\n"
        )
    eleccion = input("Ingresa el numero de tu eleccion: ")
    match eleccion:
        case "1":
            clear_terminal()
            buscarRecetaPorIngrediente()
            clear_terminal()
        case "2": 
            clear_terminal()
            verTopRecetas()
            clear_terminal()
        case "3": 
            clear_terminal()
            publicarUnaReceta()
            clear_terminal()
        case "0": 
            print("Saliendo...")
            sleep(3)
            clear_terminal()
            break
        case _:
            print("Eleccion no valida")
            sleep(2)
            clear_terminal()
            