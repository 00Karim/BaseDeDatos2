producto = {
    _id: 1,
    nombre: "Laptop Pro X",
    categoria: "Electrónica",
    precio: 1200.00,
    stock: 15,
    características: ["8GB RAM", "256GB SSD", "Intel i5"],
    valoraciones: [
      { usuario: "user123", puntuacion: 4, comentario: "Muy buen producto" },
      { usuario: "user456", puntuacion: 5, comentario: "Excelente calidad" },
      { usuario: "user789", puntuacion: 3, comentario: "Precio elevado para lo que ofrece" }
    ],
    proveedor: { nombre: "TechSupplies", pais: "Estados Unidos" },
    fecha_ingreso: new Date("2023-01-15")
  };

venta = {
    _id: 101,
    producto_id: 1,
    cliente: { nombre: "Ana Martínez", email: "ana@example.com", pais: "España" },
    cantidad: 1,
    precio_unitario: 1200.00,
    total: 1200.00,
    fecha: new Date("2023-03-15"),
    estado: "Entregado",
    metodo_pago: "Tarjeta de crédito"
  };