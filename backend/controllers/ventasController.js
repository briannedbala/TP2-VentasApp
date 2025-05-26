const db = require("../models/db");

const registrarVenta = async (req, res) => {
  const { cliente_rut, fecha, descuento, productos } = req.body;

  try {
    // Calcular totales
    let monto_final = 0;
    const subtotales = productos.map((p) => p.precio_unitario * p.cantidad);
    monto_final = subtotales.reduce((acc, curr) => acc + curr, 0);
    monto_final -= monto_final * (descuento / 100);

    // Insertar venta
    const [ventaResult] = await db.query(
      "INSERT INTO ventas (fecha, cliente_rut, descuento, monto_final) VALUES (?, ?, ?, ?)",
      [fecha, cliente_rut, descuento, monto_final]
    );

    const venta_id = ventaResult.insertId;

    // Insertar detalle de productos
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

    res
      .status(201)
      .json({ mensaje: "Venta registrada con éxito", ventaId: venta_id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al registrar la venta" });
  }
};

module.exports = {
  registrarVenta,
};
