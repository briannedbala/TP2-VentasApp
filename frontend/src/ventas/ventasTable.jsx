import React, { useEffect, useState } from "react";
import axios from "axios";

const DetalleVentaForm = ({ onBack, onSubmit }) => {
  const [venta, setVenta] = useState({
    cliente_rut: "",
    fecha: "",
    descuento: 0,
    productos: [{ id: "", precio_unitario: 0, cantidad: 1 }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVenta({ ...venta, [name]: value });
  };

  const handleProductoChange = (index, field, value) => {
    const nuevosProductos = [...venta.productos];
    nuevosProductos[index][field] = value;
    setVenta({ ...venta, productos: nuevosProductos });
  };

  const agregarProducto = () => {
    setVenta({
      ...venta,
      productos: [...venta.productos, { id: "", precio_unitario: 0, cantidad: 1 }],
    });
  };

  const submitVenta = async (e) => {
    e.preventDefault();
    await onSubmit(venta);
  };

  return (
    <form onSubmit={submitVenta} className="p-4 border rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Registrar Venta</h2>
      <label htmlFor="cliente_rut">RUT </label>
      <input
        name="cliente_rut"
        placeholder="RUT Cliente"
        value={venta.cliente_rut}
        onChange={handleChange}
        className="border p-2 mb-2 w-full"
        required
      />
      <label htmlFor="fecha">Fecha</label>
      <input
        name="fecha"
        type="date"
        value={venta.fecha}
        onChange={handleChange}
        className="border p-2 mb-2 w-full"
        required
      />
      <label htmlFor="descuento">Descuento (%)</label>
      <input
        name="descuento"
        type="number"
        placeholder="Descuento (%)"
        value={venta.descuento}
        onChange={handleChange}
        className="border p-2 mb-2 w-full"
      />
      <h3 className="font-semibold mt-4 mb-2">Productos</h3>
      {venta.productos.map((p, index) => (
        <div key={index} className="flex gap-2 mb-2">
          <label htmlFor="id_producto">ID producto</label>
          <input
            name="id_producto"
            type="number"
            placeholder="ID Producto"
            value={p.id}
            onChange={(e) => handleProductoChange(index, "id", e.target.value)}
            className="border p-2 w-1/4"
            required
          />
          <label htmlFor="precio_unitario">Precio unitario</label>
          <input
            name="precio_unitario"
            type="number"
            placeholder="Precio Unitario"
            value={p.precio_unitario === '' || isNaN(p.precio_unitario) ? '' : p.precio_unitario}
            onChange={(e) => handleProductoChange(index, "precio_unitario", parseFloat(e.target.value))}
            className="border p-2 w-1/4"
            required
          />
          <label htmlFor="cantidad">Cantidad</label>
          <input
            name="cantidad"
            type="number"
            placeholder="Cantidad"
            value={p.cantidad}
            onChange={(e) => handleProductoChange(index, "cantidad", parseInt(e.target.value))}
            className="border p-2 w-1/4"
            required
          />
        </div>
      ))}
      <button type="button" onClick={agregarProducto} className="text-blue-600">+ Agregar producto</button>
      <div className="mt-4">
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Registrar</button>
        <button type="button" onClick={onBack} className="ml-2 text-gray-600">Cancelar</button>
      </div>
    </form>
  );
};

const TablaVentas = () => {
  const [ventas, setVentas] = useState([]);
  const [mostrarForm, setMostrarForm] = useState(false);

  const fetchVentas = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/ventas");
      setVentas(res.data);
    } catch (err) {
      console.error("Error al obtener ventas", err);
    }
  };

  useEffect(() => {
    fetchVentas();
  }, []);

  const agregarVenta = async (venta) => {
    try {
      await axios.post("http://localhost:3000/api/ventas", venta, {
        headers: {
          "Content-Type": "application/json",
        }
      },);
      console.log("Venta registrada exitosamente", Response.data);
      setMostrarForm(false);
      fetchVentas();
    } catch (err) {
      console.error("Error al registrar venta", err.response?.data || err.message);
    }
  };

  if (mostrarForm) {
    return <DetalleVentaForm onBack={() => setMostrarForm(false)} onSubmit={agregarVenta} />;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Ventas</h1>
      <button
        onClick={() => setMostrarForm(true)}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Agregar Venta
      </button>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Fecha</th>
            <th className="border p-2">Cliente</th>
            <th className="border p-2">Descuento</th>
            <th className="border p-2">Monto Final</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map((venta) => (
            <tr key={venta.id} className="hover:bg-gray-50">
              <td className="border p-2">{venta.id}</td>
              <td className="border p-2">{new Date(venta.fecha).toLocaleDateString()}</td>
              <td className="border p-2">{venta.cliente_rut}</td>
              <td className="border p-2">{venta.descuento}%</td>
              <td className="border p-2">${venta.monto_final}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaVentas;
