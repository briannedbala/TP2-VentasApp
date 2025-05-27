const express = require("express");
const router = express.Router();
const {
  obtenerClientes,
  registrarCliente
} = require("../controllers/clientesController");

router.get("/", obtenerClientes);
router.post("/", registrarCliente);

module.exports = router;
