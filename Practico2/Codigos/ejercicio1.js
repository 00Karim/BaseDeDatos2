use empresa;
db.empleados.insertMany([
    {nombre: "Marcos", edad: 20, puesto: "Pasante"},
    {nombre: "Pedro", edad: 48, puesto: "Reponedor"},
    {nombre: "Maria", edad: 29, puesto: "Cajero"}
]);
db.empleados.updateOne({nombre: "Pedro"}, { $set: {edad: 109}});
db.empleados.deleteOne({puesto: "Pasante"});
db.empleados.find().pretty();
