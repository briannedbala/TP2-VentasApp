const express = require("express");
const cors = require("cors");
const ventasRoutes = require("./routes/ventas");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/ventas", ventasRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
