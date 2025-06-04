import {Router} from "express";
import {registrarVenta} from "../controllers/ventasController.js";
import {getVentas} from "../controllers/ventasController.js";
import {eliminarVenta} from "../controllers/ventasController.js";

const router = Router();

router.post("/", registrarVenta);
router.get("/", getVentas);
router.delete("/:id", eliminarVenta);

export default router;
