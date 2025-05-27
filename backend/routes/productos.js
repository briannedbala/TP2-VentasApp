const express = require('express');
const router = express.Router();
const db = require('../models/db'); // conexión con mysql2/promise

// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM productos');
    res.json(rows);
  } catch (err) {
    console.error('Error al obtener productos:', err);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// Registrar un nuevo producto
router.post('/', async (req, res) => {
  const { nombre, precio_actual, stock, proveedor_rut, categoria_id } = req.body;

  try {
    const sql = `
      INSERT INTO productos (nombre, precio_actual, stock, proveedor_rut, categoria_id)
      VALUES (?, ?, ?, ?, ?)
    `;
    await db.query(sql, [nombre, precio_actual, stock, proveedor_rut, categoria_id]);
    res.status(201).json({ message: 'Producto registrado correctamente' });
  } catch (err) {
    console.error('Error al registrar producto:', err);
    res.status(500).json({ error: 'Error al registrar producto' });
  }
});

module.exports = router;
