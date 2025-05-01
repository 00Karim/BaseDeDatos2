use empresa;

db.clientes.insertMany([
	{nombre: "Mario", apellido: "Larson"},
	{nombre: "Anabella", apellido: "Sosa"},
	{nombre: "Maria", apellido: "Fernandez"}
]);

db.cliente.createIndex({apellido: 1, nombre: 1});
