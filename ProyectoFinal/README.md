Proyecto 3: Red Social de Recetas

Descripción
Plataforma donde usuarios comparten recetas, las califican y comentan.

Requerimientos
Usuarios pueden publicar recetas con ingredientes e instrucciones
Sistema de likes y comentarios
Búsqueda por ingredientes o tipo de cocina
Ranking de recetas mejor valoradas

Estructura de Datos
// Colección: usuarios
{
  _id: ObjectId,
  nombre: "Chef Ana",
  email: "ana@chef.com",
  nivel: "Intermedio",
  recetasPublicadas: 15,
  seguidores: 234
}

// Colección: recetas
{
  _id: ObjectId,
  titulo: "Paella Valenciana",
  descripcion: "Receta tradicional española",
  autorId: ObjectId,
  ingredientes: [
    { nombre: "arroz", cantidad: "400g" },
    { nombre: "pollo", cantidad: "1 kg" }
  ],
  instrucciones: ["Paso 1...", "Paso 2..."],
  tiempoCoccion: 45,
  dificultad: "Media",
  tipoCocina: "Española",
  likes: 127,
  fechaPublicacion: ISODate
}

// Colección: comentarios
{
  _id: ObjectId,
  recetaId: ObjectId,
  autorId: ObjectId,
  texto: "¡Deliciosa receta!",
  calificacion: 5,
  fecha: ISODate
}


Funciones a Implementar
+ publicarReceta(receta) - Publicar nueva receta
+ buscarPorIngrediente(ingrediente) - Buscar recetas que contengan ingrediente
+ darLike(recetaId, usuarioId) - Dar/quitar like a receta
+ comentarReceta(recetaId, usuarioId, comentario) - Añadir comentario
+ topRecetas(limite) - Recetas mejor valoradas