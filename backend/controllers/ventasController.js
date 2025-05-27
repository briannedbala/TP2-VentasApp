import { PrismaClient } from '../generated/prisma/client.js';
const prisma = new PrismaClient();

export const registrarVenta = async (req, res) => {
  const { cliente_rut, fecha, descuento, productos } = req.body;

  try {
    // Calcular monto final
    let monto_final = productos.reduce(
      (total, p) => total + p.precio_unitario * p.cantidad,
      0
    );
    const descuento_decimal = parseFloat(descuento || 0);
    monto_final -= monto_final * (descuento_decimal / 100);

    // Crear la venta con los detalles (relación 1:N con detalle_venta)
    const venta = await prisma.ventas.create({
      data: {
        fecha: new Date(fecha),
        cliente_rut: cliente_rut || null,
        descuento: descuento_decimal,
        monto_final,
        detalle_venta: {
          create: productos.map((producto) => ({
            producto_id: producto.id,
            precio_unitario: producto.precio_unitario,
            cantidad: producto.cantidad,
            subtotal: producto.precio_unitario * producto.cantidad,
          })),
        },
      },
    });

    res.status(201).json({
      mensaje: "Venta registrada con éxito",
      ventaId: venta.id,
    });

  } catch (error) {
    console.error("Error al registrar venta:", error);
    res.status(500).json({ error: "Error al registrar la venta" });
  }
};


export const getVentas = async (req, res) => {
  try {
    const ventas = await prisma.ventas.findMany({
      include: {
        detalle_venta: true,
      },
    });
    res.json(ventas);
  } catch (error) {
    console.error("Error al obtener ventas:", error);
    res.status(500).json({ error: "Error al obtener las ventas" });
  }
};


export const eliminarVenta = async (req, res) => {
  const { id } = req.params;

  try {
    // Primero elimina los detalles
    await prisma.detalle_venta.deleteMany({
      where: { venta_id: parseInt(id) },
    });

    // Luego elimina la venta
    await prisma.ventas.delete({
      where: { id: parseInt(id) },
    });

    res.json({ mensaje: "Venta eliminada con éxito" });
  } catch (error) {
    console.error("Error al eliminar venta:", error);
    res.status(500).json({ error: "No se pudo eliminar la venta" });
  }
};



