import express from "express";
import cors from "cors";
import ventasRoutes from "./routes/ventas.js";
const PORT = process.env.PORT || 3000;



const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/ventas", ventasRoutes);
app.get("/", (req, res) => res.send("API de Ventas en funcionamiento"));


app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto http://localhost:${PORT}`);
});
