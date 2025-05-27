const express = require('express');
const router = express.Router();
const db = require('../database');

// GET /api/productos - obtener todos los productos
router.get('/', (req, res) => {
  const sql = `
    SELECT p.id, p.nombre, p.precio_actual, p.stock, c.nombre AS categoria, pr.nombre AS proveedor
    FROM productos p
    JOIN categorias c ON p.categoria_id = c.id
    JOIN proveedores pr ON p.proveedor_rut = pr.rut
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

module.exports = router;
