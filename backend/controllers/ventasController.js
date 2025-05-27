// controllers/ventasController.js
const db = require("../models/db");

const registrarVenta = async (req, res) => {
  const { cliente_rut, fecha, descuento, productos } = req.body;

  try {
    let monto_final = 0;
    const subtotales = productos.map((p) => p.precio_unitario * p.cantidad);
    monto_final = subtotales.reduce((acc, curr) => acc + curr, 0);
    monto_final -= monto_final * (descuento / 100);

    const [ventaResult] = await db.query(
      "INSERT INTO ventas (fecha, cliente_rut, descuento, monto_final) VALUES (?, ?, ?, ?)",
      [fecha, cliente_rut, descuento, monto_final]
    );

    const venta_id = ventaResult.insertId;

    for (let producto of productos) {
      const subtotal = producto.precio_unitario * producto.cantidad;
      await db.query(
        "INSERT INTO detalle_venta (venta_id, producto_id, precio_unitario, cantidad, subtotal) VALUES (?, ?, ?, ?, ?)",
        [
          venta_id,
          producto.id,
          producto.precio_unitario,
          producto.cantidad,
          subtotal,
        ]
      );
    }

    res.status(201).json({ mensaje: "Venta registrada con éxito", ventaId: venta_id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al registrar la venta" });
  }
};

const obtenerVentas = async (req, res) => {
  try {
    const [ventas] = await db.query(`
      SELECT v.id, v.fecha, v.cliente_rut, c.nombre AS cliente_nombre, v.descuento, v.monto_final
      FROM ventas v
      JOIN clientes c ON v.cliente_rut = c.rut
      ORDER BY v.fecha DESC
    `);

    const ventasConDetalles = await Promise.all(
      ventas.map(async (venta) => {
        const [detalles] = await db.query(`
          SELECT dv.producto_id, p.nombre AS producto_nombre, dv.precio_unitario, dv.cantidad, dv.subtotal
          FROM detalle_venta dv
          JOIN productos p ON dv.producto_id = p.id
          WHERE dv.venta_id = ?
        `, [venta.id]);

        return { ...venta, productos: detalles };
      })
    );

    res.json(ventasConDetalles);
  } catch (error) {
    console.error("Error al obtener ventas:", error);
    res.status(500).json({ error: "Error al obtener ventas" });
  }
};

module.exports = {
  registrarVenta,
  obtenerVentas
};
