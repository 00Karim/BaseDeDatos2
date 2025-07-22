from time import sleep
import requests
import os
import sys

recetasLocal = [] # Esta lista la usamos para poder manipular los datos localmente sin tener que hacer muchas requests
idUsuarioActual = "" # En esta variable guardamos el id del usuario que este ingresando a la app basandonos en las credenciales ingresadas al incio
recetasLikeadas = [] 

URL_BASE = "http://localhost:3000/api"

def clear_terminal():
    os.system('cls' if os.name == 'nt' else 'clear') # esta funcion limpia la terminal en linux y en windows

def borrar_ultima_linea():
    sys.stdout.write("\033[F")  
    sys.stdout.write("\033[K")

def es_integer(variable):
    try:
        int(variable)
        return True
    except ValueError:
        return False

def printRecetas(datos, ingrediente = None): # muestra algunos datos de las recetas, si se ingresa una variable ingredientes entonces el titulo va cambiar
    clear_terminal()
    opcion = 1
    global recetasLocal
    recetasLocal = [] # vaciamos la lista para que los datos de una operacion pasada no se guarden y asi solo se analizan las recetas del top o las recetas con cierto ingrediente
    titulo = f"---Recetas con {ingrediente}---" if ingrediente else "---Top recetas---" # si hay un ingrediente el titulo cambia acorde a la operacion seleccionada
    print(titulo)
    for dato in datos:
        recetasLocal.append(dato) # agregamos las recetas a la lista declarada mas arriba para poder manipular y ver los datos localmente 
        print(f"\nOpcion {opcion}")
        opcion += 1
        print("============================")
        print("Titulo: ", dato['titulo'])
        print("Likes: ", dato['likes'])
        print("Ingredientes: ")
        for ingrediente in dato['ingredientes']:
            print(ingrediente['nombre'].capitalize(), " - ", "Cantidad: ", ingrediente['cantidad'])
        print("============================\n")

def printReceta(recetaElegida): # muestra todos los datos de una receta y ademas nos da la opcion de dar like o comentar
    if recetaElegida != "0": #chequeamos que el usuario no haya elegido salir 
        if es_integer(recetaElegida): # chequeamos que su input se pueda convertir a int, sino le mostramos un error
            if int(recetaElegida) < 0 or int(recetaElegida) - 1 > len(recetasLocal): # si ingreso un numero menor a 0 entonces no va a ser valido y si eligio un numero mayor al tamanio de la lista daria error asi que lo evitamos
                print("Error, opcion no valida!")
                sleep(1.5)
            else:
                receta = recetasLocal[int(recetaElegida) - 1] # pasamos como parametro el numero elegido que vendria a ser el indice de la receta en la lista recetas para mostrar todos los datos de esta y darle la opcion al usuario de darle like o quitar su like
                clear_terminal()
                print("Receta elegida:")
                print("============================")
                print("Titulo: ", receta['titulo'])
                print("Descripcion: ", receta['descripcion'])
                print("Tiempo de coccion: ", receta['tiempoCoccion'])
                print("Dificultad: ", receta['dificultad'])
                print("Likes: ", receta['likes'])
                print("Ingredientes: ")
                for ingrediente in receta['ingredientes']:
                    print(ingrediente['nombre'].capitalize(), " - ", "Cantidad: ", ingrediente['cantidad'])
                print("Publicado el: ", receta['fechaPublicacion'])
                print("Instrucciones: ", receta['instrucciones'])
                print("============================\n")
                operacionesSobreRecetas(receta['_id'])
        else:
            print("Error, ingresaste un valor no permitido!")
            sleep(1.5)
    

def operacionesSobreRecetas(id_receta):
    if id_receta in recetasLikeadas: # si la receta elegida ya fue likeada entonces se da la opcion de sacar like, sino se da la opcion de hacer lo contrario
        print("1 - Quitar Like")
        funcion = lambda: quitarLike(id_receta)
        operacion = lambda: recetasLikeadas.remove(id_receta) # sacamos el id de la receta al registro local de recetas likeadas del usuario
    else:
        print("1 - Dar like")
        funcion = lambda: darLike(id_receta)
        operacion = lambda: recetasLikeadas.append(id_receta) # agregamos el id de la receta al registro local de recetas likeadas del usuario
    print("2 - Comentar")
    print("3 - Salir")
    eleccion = input("Elige una opcion: ")
    match eleccion:
        case "1":
            funcion() # llamamos a la funcion que hace las requests para ejecutar los cambios en la base de datos
            operacion() # agregamos o sacamos el id de la receta en el registro local de los likes del usuario para que no pueda repetir likes o quitar likes que nunca dio
        case "2":
            comentar(id_receta)
        case "3":
            None
        case _:
            print("Opcion invalida!")
            sleep(1.5)

def darLike(id_receta):
    global recetasLikeadas
    identificadores = {
        "recetaId": id_receta,
        "usuarioId": idUsuarioActual
        }
    respuesta1 = requests.put(URL_BASE + "/recetas/sumarLike", json=identificadores)
    respuesta2 = requests.put(URL_BASE + "/usuarios/darLike", json=identificadores) 
    if respuesta1.status_code == 200 and respuesta2.status_code == 200:
        recetasLikeadas.append(id_receta) # agregamos la receta al registro local para decidir si podemos likear o no las recetas mas adelante
        print("Se likeo la receta!")
        sleep(1.5)
    else:
        print("Hubo un error al likear la receta")
        sleep(1.5)


def quitarLike(id_receta):
    global recetasLikeadas
    identificadores = {
        "recetaId": id_receta,
        "usuarioId": idUsuarioActual
        }
    respuesta1 = requests.put(URL_BASE + "/recetas/restarLike", json=identificadores)
    respuesta2 = requests.put(URL_BASE + "/usuarios/sacarLike", json=identificadores) 
    if respuesta1.status_code == 200 and respuesta2.status_code == 200:
        recetasLikeadas.remove(id_receta) # sacamos la receta del registro local para decidir si podemos likear o no las recetas mas adelante
        print("Se saco el like!")
        sleep(1.5)
    else:
        print("Hubo un error al sacar el like")
        sleep(1.5)

def comentar(id_receta):
    comentario = None
    calificacion = None 
    eleccion = None
    clear_terminal()
    while True:
        clear_terminal()
        print("========================================")
        print("Comentario: Agregado correctamente ✅" if comentario else "Comentario: Esperando comentario...")
        print("Calificacion: Agregada correctamente ✅" if calificacion else "Calificacion: Esperando calificacion...")
        print("========================================\n") 
        if comentario is None:
            comentario = input("Escribe tu comentario: ")
        elif calificacion is None:
            while True:
                calificacion = input("Ingresa tu calificacion (1 - 10): ")
                if es_integer(calificacion):
                    if int(calificacion) > 10 or int(calificacion) < 0:
                        print("Error, tenes que ingresar un numero entre el 1 y el 10")
                        sleep(2)
                        borrar_ultima_linea()
                        borrar_ultima_linea()
                    else:
                        break
                else:
                    print("Error, no valido, intenta nuevamente!")
                    sleep(2)
                    borrar_ultima_linea()
                    borrar_ultima_linea()
        else:
            eleccion = input("Presiona enter para enviar --> ")
        if eleccion != None:
            data_comentario = {
                "id_receta": id_receta,
                "id_autor": idUsuarioActual,
                "texto": comentario,
                "calificacion": calificacion
            }
            print("Enviando...")
            sleep(1)
            requests.post(URL_BASE + "/comentarios/", json=data_comentario)
            print("Enviado! ✅")
            sleep(1)
            break
         

def publicarUnaReceta():
    eleccion = None
    titulo = None
    descripcion = None
    ingredientes = None
    instrucciones = None
    tiempoCoccion = None 
    dificultad = None
    tipoCocina = None
    print("---Publicar una receta---")
    clear_terminal()
    while True:
        clear_terminal()
        print("========================================")
        print(f"Titulo: {titulo.capitalize()} ✅" if titulo else "Titulo: Esperando titulo...")
        print(f"Descripcion: {descripcion.capitalize()} ✅" if descripcion else "Descripcion: Esperando calificacion...")
        if(ingredientes):
            print("Ingredientes: ")
            ingrediente_nro = 1
            for ingrediente in ingredientes:
                print(f"    Ingrediente {ingrediente_nro}: {ingrediente['nombre'].capitalize()} {ingrediente['cantidad']} ✅")
                ingrediente_nro += 1
        else:
            print("Ingredientes: Esperando ingredientes...")
        if(instrucciones):
            print("Instrucciones: ")
            paso = 1
            for instruccion in instrucciones:
                print(f"    Paso {paso}: {instruccion.capitalize()} ✅")
                paso += 1
        else:
            print("Instrucciones: Esperando instrucciones...")
        print(f"Tiempo de coccion: {tiempoCoccion} minutos ✅" if tiempoCoccion else "Tiempo de coccion: Esperando tiempo de coccion...")
        print(f"Dificultad: {dificultad} ✅" if dificultad else "Dificultad: Esperando dificultad...")
        print(f"Tipo de cocina: {tipoCocina.capitalize()} ✅" if tipoCocina else "Tipo de cocina: Esperando tipo de cocina...")
        print("========================================\n") 
        if titulo is None:
            while True:
                titulo = input("Escribe tu titulo: ")
                if len(titulo.strip()) < 3:
                    print("Tu titulo no puede tener menos de 3 letras!") # no puede estar vacio porque es required: true en mongo y ademas preferimos que sea mayor a 3 letras para que no se pueda ingresar cualquier cosa
                    sleep(1.5)
                    borrar_ultima_linea()
                    borrar_ultima_linea()
                else:
                    break
        elif descripcion is None:
            while True:
                descripcion = input("Escribe una descripcion: ")
                if len(descripcion.strip()) < 25:
                        print("Tu descripcion no puede tener menos de 25 letras!")  # no puede estar vacio porque es required: true en mongo y ademas preferimos que sea mayor a 20 letras para que el usuario se vea obligado a dar informacion de la receta (aunque puede spammear letras random, pero se entiende la idea)
                        sleep(1.5)
                        borrar_ultima_linea()
                        borrar_ultima_linea()
                else:
                    break
        elif ingredientes is None:
            print("Escribe tus ingredientes y su cantidad (uno por uno).")
            print("Cuando termines, presiona Enter sin escribir nada.\n")
            ingredientes_lista = []

            while True:
                ingrediente = input(f"Ingrediente {len(ingredientes_lista) + 1}: ")
                if ingrediente: # solo si el usuario ingresa un ingrediente nos molestamos por preguntar la cantidad, sino no es necesario
                    cantidad = input("  Cantidad: ")
                if ingrediente.strip() == "" and len(ingredientes_lista) < 1: # si toca enter y no escribio nada entonces se sale del loop y se pasa al siguiente elemento
                    print("Tu receta tiene que tener al menos 1 ingrediente!")
                    sleep(1.5)
                    borrar_ultima_linea()
                    borrar_ultima_linea()
                elif ingrediente.strip() == "":
                    break
                else:
                    ingredientes_lista.append({"nombre": ingrediente.strip().lower(), "cantidad": cantidad.strip().capitalize()})
            ingredientes = ingredientes_lista  
        elif instrucciones is None:
            print("Escribe los pasos de la receta uno por uno.")
            print("Cuando termines, presiona Enter sin escribir nada.\n")
            pasos = []

            while True:
                paso = input(f"Paso {len(pasos) + 1}: ")
                if paso.strip() == "" and len(pasos) < 1: # si toca enter y no escribio nada en el input, pero ademas nunca ingreso un paso entonces se mantiene dentro del loop
                    print("Tu receta tiene que tener al menos 1 paso!")
                    sleep(1.5)
                    borrar_ultima_linea()
                    borrar_ultima_linea()
                elif paso.strip() == "": # si ya ingreso algo en los pasos y esta vez solo toco enter se sale del loop y se pasa al siguiente elemento
                    break
                else: 
                    pasos.append(paso.strip().capitalize())

            instrucciones = pasos  
        elif tiempoCoccion is None:
            while True:
                tiempoCoccion = input("Escribe el tiempo de coccion en minutos: ")
                if es_integer(tiempoCoccion):
                    int(tiempoCoccion) # lo convertimos a int porque en mongo es type: Number
                    break
                else:
                    print("Error, ingresa un numero!")
                    sleep(1.5)
                    borrar_ultima_linea()
                    borrar_ultima_linea()
        elif dificultad is None:
            while True:
                dificultad = input("Elige una dificultad [1 - Facil, 2 - Intermedio, 3 - Dificil]: ")
                match dificultad:
                    case "1":
                        dificultad = "Facil"
                        break
                    case "2": 
                        dificultad = "Intermedio"
                        break
                    case "3": 
                        dificultad = "Dificil"
                        break
                    case _:
                        print("Error, ingresa 1, 2, o 3!")
                        sleep(1.5)
                        borrar_ultima_linea()
                        borrar_ultima_linea()
        elif tipoCocina is None:
            tipoCocina = input("Ingresa el tipo de cocina: ")
        else:
            eleccion = input("Presiona enter para enviar o ingresa 0 para cancelar --> ")
            if eleccion != "0":
                data_receta = {
                    "titulo": titulo.capitalize(),
                    "descripcion": descripcion.capitalize(),
                    "autorId": idUsuarioActual,
                    "ingredientes": ingredientes,
                    "instrucciones": instrucciones,
                    "tiempoCoccion": tiempoCoccion,
                    "dificultad": dificultad,
                    "tipoCocina": tipoCocina
                }
                print("Enviando...")
                sleep(1)
                receta = requests.post(URL_BASE + "/recetas/crearReceta", json=data_receta)
                receta.json() # convertimos los datos de l areceta a json 
                recetasLocal.append(receta) # y los agregamos al registro local de recetas para poder usarlo en las otras operaciones
                print("Enviado! ✅")
                sleep(1)
                break
            else:
                print("Cancelando...")
                sleep(1)
                print("Cancelado! ☹️")
                sleep(1)
                break

def buscarRecetaPorIngrediente():
    global recetasLocal
    clear_terminal()
    print("---Buscar receta por ingrediente---")
    ingrediente = input("Ingresa el ingrediente: ")
    recetas = requests.get(URL_BASE + "/recetas/buscar/" + ingrediente.lower())
    if recetas.status_code == 200:
        datos = recetas.json()
        print("DATOS DE COSO: ", datos)
        input("")
        if datos:
            printRecetas(datos, ingrediente) # en esta funcion se agregar los datos a la lista local y se muestran ordenados en la terminal
            recetaElegida = input("Ingresa el numero de una receta para verla en detalle o 0 para salir: ")
            printReceta(recetaElegida)
        else:
            print("No hay recetas con ese ingrediente")
            sleep(2)
    else:
        print("Hubo un error del servidor")

def verTopRecetas():
    global recetasLocal
    clear_terminal()
    print("---Ver top de recetas---")
    recetas = requests.get(URL_BASE + "/recetas/top")
    print(recetas.status_code)
    if recetas.status_code == 200:
        datos = recetas.json()
        if datos:
            printRecetas(datos) # en esta funcion se agregar los datos a la lista local y se muestran ordenados en la terminal
            recetaElegida = input("Ingresa el numero de una receta para verla en detalle o 0 para salir: ")
            printReceta(recetaElegida) # pasamos como parametro el numero elegido que vendria a ser el indice de la receta en la lista recetas para mostrar todos los datos de esta y darle la opcion al usuario de darle like o quitar su like
        else:
            print("No hay recetas")
            sleep(2)
    else:
        print("Hubo un error del servidor")



try:
    while True:
        clear_terminal()
        print("--Iniciar sesion--")
        email = input("Ingresa tu email: ") 
        contrasenia = input("Ingresa tu contrasenia: ")
        credenciales = { # esto va a ser el body de la request
            "email": email,
            "contrasenia": contrasenia
        }
        respuesta = requests.post(URL_BASE + "/usuarios/", json=credenciales) # si se nos devuelve un usuario entonces las credenciales son correctas y podemos seguir con la ejecucion del programa
        usuario = respuesta.json()
        if usuario: 
            idUsuarioActual = usuario['_id'] # guardamos el id del usuario localmente para poder usarlo en las diferentes operacion que requieren el id del usuario
            recetasLikeadas = usuario['recetasLikeadas'] # gurdamos las recetas likeadas localmente para no hacer requests a cada rato y modificarla localmente para tener un registro de cuales recetas podemos o no podemos likear
            break
        else:
            print("Credenciales invalidas, intenta nuevamente!")
            sleep(2)
    while True:
        clear_terminal()
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
except Exception as e:
    print(f"Error inesperado: {e}")
    input("Presiona Enter para salir...")