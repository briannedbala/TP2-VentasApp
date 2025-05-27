const db = require("../models/db");

// Obtener todos los clientes
const obtenerClientes = async (req, res) => {
  try {
    const [clientes] = await db.query("SELECT * FROM clientes");
    res.json(clientes);
  } catch (error) {
    console.error("Error al obtener clientes:", error);
    res.status(500).json({ error: "Error al obtener clientes" });
  }
};

// Registrar cliente con dirección dividida y teléfonos aparte
const registrarCliente = async (req, res) => {
  const { rut, nombre, calle, numero, comuna, ciudad, telefonos } = req.body;

  try {
    // Insertar cliente
    await db.query(
      "INSERT INTO clientes (rut, nombre, calle, numero, comuna, ciudad) VALUES (?, ?, ?, ?, ?, ?)",
      [rut, nombre, calle, numero, comuna, ciudad]
    );

    // Insertar teléfonos
    for (const telefono of telefonos) {
      await db.query(
        "INSERT INTO telefonos_cliente (cliente_rut, telefono) VALUES (?, ?)",
        [rut, telefono]
      );
    }

    res.status(201).json({ mensaje: "Cliente registrado correctamente" });
  } catch (error) {
    console.error("Error al registrar cliente:", error);
    res.status(500).json({ error: "Error al registrar cliente" });
  }
};

module.exports = {
  obtenerClientes,
  registrarCliente
};
