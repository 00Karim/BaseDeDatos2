use empresa;

// db.ventas.insertMany([
//  { producto: "Laptop", cantidad: 2, precio_unitario: 12000 },
//  { producto: "Mouse", cantidad: 5, precio_unitario: 250 },
//  { producto: "Teclado", cantidad: 3, precio_unitario: 450 },
//  { producto: "Monitor", cantidad: 1, precio_unitario: 3500 },
//  { producto: "Laptop", cantidad: 1, precio_unitario: 11500 },
//  { producto: "Mouse", cantidad: 10, precio_unitario: 220 },
//  { producto: "Audífonos", cantidad: 4, precio_unitario: 600 },
//  { producto: "Monitor", cantidad: 2, precio_unitario: 3200 },
//  { producto: "Teclado", cantidad: 2, precio_unitario: 500 },
//  { producto: "Audífonos", cantidad: 3, precio_unitario: 550 }
//]);

db.ventas.aggregate({
	$group: {
		_id: "$producto", ventasTotales: {
			$sum: {
				$multiply: ["$cantidad", "$precio_unitario"]
			}
		}
	}

});
