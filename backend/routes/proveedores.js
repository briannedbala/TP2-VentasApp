const express = require("express");
const router = express.Router();
const db = require("../models/db"); // Este debe ser un pool con mysql2/promise

// Obtener todos los proveedores
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM proveedores");
    res.json(rows);
  } catch (err) {
    console.error("Error al obtener proveedores:", err);
    res.status(500).json({ error: "Error al obtener proveedores" });
  }
});

// Registrar un nuevo proveedor
router.post("/", async (req, res) => {
  const { rut, nombre, direccion, telefono, pagina_web } = req.body;

  try {
    const sql = `INSERT INTO proveedores (rut, nombre, direccion, telefono, pagina_web)
                 VALUES (?, ?, ?, ?, ?)`;
    await db.query(sql, [rut, nombre, direccion, telefono, pagina_web]);
    res.status(201).json({ message: "Proveedor registrado correctamente" });
  } catch (err) {
    console.error("Error al insertar proveedor:", err);
    res.status(500).json({ error: "Error al insertar proveedor" });
  }
});

module.exports = router;
