const express = require("express");
const cors = require("cors");
const ventasRoutes = require("./routes/ventas");
require("dotenv").config();
const port = 3001;

app.use(cors());
app.use(express.json());

const proveedoresRoutes = require("./routes/proveedores");
app.use("/api/proveedores", proveedoresRoutes);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

const productosRoutes = require("./routes/productos");
app.use("/api/productos", productosRoutes);

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/ventas", ventasRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
