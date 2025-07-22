const ComentarioModel = require('../models/comentario.model')
const Usuario = require('../models/entities/usuario')
const Receta = require('../models/entities/receta');

async function probarComentar(){
    const usuario = await Usuario.create({ 
        nombre: 'Mario', 
        email: 'mario@test.com',
        nivel: 'Bajo',
        recetasPublicadas: 2,
        seguidores: 0,
        contrasenia: "otraContrasenia"
    });

    // 2. Crear una receta
    const receta = await Receta.create({
        titulo: "Sopa",
        descripcion: "Receta tradicional española",
        autorId: usuario._id,
        ingredientes: [
            { nombre: "agua", cantidad: "100ml" },
            { nombre: "sal", cantidad: "200g" }
        ],
        instrucciones: ["Paso 1...", "Paso 2..."],
        tiempoCoccion: 200,
        dificultad: "Facil",
        tipoCocina: "Española"
    });

    try{
        await ComentarioModel.hacerComentario(
            receta._id, 
            usuario._id,  
            "El sabor es traumatico",        
            5                            
        )
        console.log("Comentario creado correctamente");
    }
    catch(error){
        console.log(error, "No se pudo crear un comentario");
    }
} 

module.exports = probarComentar;
    