const express = require('express')
const conectarDB = require('./database/db');

// PRUEBAS
const probarModelos = require('./tests/testDeModelos');
const probarComentar = require('./tests/testHacerComentario');
// FIN PRUEBAS

const app = express();
const PORT = 3000;

conectarDB(); 

app.use(express.json());

// insertar rutas = app.use('api/recetas')

app.listen( PORT, () => {
    console.log(`Server corriendo en localhost${PORT}`);
})

probarModelos();
probarComentar();

