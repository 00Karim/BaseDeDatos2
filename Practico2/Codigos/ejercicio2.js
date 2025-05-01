use empresa;
db.empleados.find(
    {edad: {$gt: 25, $lt: 40}}, 
    {nombre: 1, edad: 1}
);
