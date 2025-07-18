const express = require('express')
const conectarDB = require('./database/db');

// RUTAS
const Rutas = require('./routes/index')
// FIN RUTAS

// PRUEBAS
const probarModelos = require('./tests/testDeModelos');
const probarComentar = require('./tests/testHacerComentario');
// FIN PRUEBAS

const app = express();
const PORT = 3000;

conectarDB(); 

// RUTA PARA PROBAR SI FUNCIONA LA CONEXION -->  al final no fue usada
app.get('/activo', (req, res) => {
    res.sendStatus(200);
});
//

app.use(express.json());

app.use('/api', Rutas)

app.listen( PORT, () => {
    console.log(`Server corriendo en localhost${PORT}`);
})

probarModelos();
probarComentar();

