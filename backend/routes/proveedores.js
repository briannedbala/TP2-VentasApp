// Obtener todos los proveedores
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM proveedores';

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});
