const express = require("express");
const router = express.Router();

const Controller = require('../Controller/Strongs');
const verfyToken = require('../Auth/Token');

// Rutas

router.get('/lote/:numero', verfyToken, Controller.getLote);
router.post('/guardar-traducciones', verfyToken, Controller.guardarTraducciones);
router.get('/estadisticas', verfyToken, Controller.getEstadisticas);

module.exports = router;