const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

const port = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
const ventasRoutes = require("./routes/ventas");
const proveedoresRoutes = require("./routes/proveedores");
const productosRoutes = require("./routes/productos");

app.use("/api/ventas", ventasRoutes);
app.use("/api/proveedores", proveedoresRoutes);
app.use("/api/productos", productosRoutes);

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
