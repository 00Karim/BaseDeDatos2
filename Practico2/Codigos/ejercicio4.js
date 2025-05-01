use empresa;

db.empleados.updateMany(
	{},
		{
			$set: {
				direccion: { calle: "None", ciudad: "None", codigo_postal: 0000}
			}
		}
);