const Receta = require('../models/entities/receta');
const Comentario = require('../models/entities/comentario');
const Usuario = require('../models/entities/usuario');

async function probarModelos(){
    try {
        // 1. Crear un usuario
        const usuario = await Usuario.create({ 
            nombre: 'Juan', 
            email: 'juan@test.com',
            nivel: 'Avanzado',
            recetasPublicadas: 500,
            seguidores: 1200 
        });

        // 2. Crear una receta
        const receta = await Receta.create({
            titulo: "Paella Valenciana",
            descripcion: "Receta tradicional española",
            autorId: usuario._id,
            ingredientes: [
                { nombre: "arroz", cantidad: "400g" },
                { nombre: "pollo", cantidad: "1 kg" }
            ],
            instrucciones: ["Paso 1...", "Paso 2..."],
            tiempoCoccion: 45,
            dificultad: "Media",
            tipoCocina: "Española"
        });

        // 3. Crear un comentario
        const comentario = await Comentario.create({
            recetaId: receta._id,
            autorId: usuario._id,
            texto: "¡Deliciosa receta!",
            calificacion: 5
        });

        console.log("Datos insertados correctamente, los modelos se crearon correctamente"); 
    } 
    catch (error) {
        console.error(error);
        console.log("Error al cargar los datos, hay un error en los modelos");  
    }
};

module.exports = probarModelos;