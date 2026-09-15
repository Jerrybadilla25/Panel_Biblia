const Strong = require('../model/model.strong');

// GET /strongs/lote/:numero  -> trae 100 entradas (paginadas), sin traducir primero
module.exports.getLote = async (req, res) => {
    try {
        const numero = parseInt(req.params.numero) || 1;
        const TAMANO = 100;
        const skip = (numero - 1) * TAMANO;

        const entradas = await Strong.find({})
            .sort({ strong: 1 })
            .skip(skip)
            .limit(TAMANO);

        const total = await Strong.countDocuments({});
        const totalTraducidas = await Strong.countDocuments({ translated: true });

        res.json({
            lote: numero,
            total,
            totalTraducidas,
            totalLotes: Math.ceil(total / TAMANO),
            entradas
        });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el lote", error: error.message });
    }
};

// POST /strongs/guardar-traducciones
// body: [{ strong: "H7225", strongs_def_es: "el primero, en lugar..." }, ...]
module.exports.guardarTraducciones = async (req, res) => {
    try {
        const traducciones = req.body;

        if (!Array.isArray(traducciones) || traducciones.length === 0) {
            return res.status(400).json({ message: "Se esperaba un arreglo de traducciones" });
        }

        const operaciones = traducciones.map((item) => ({
            updateOne: {
                filter: { strong: item.strong },
                update: {
                    $set: {
                        strongs_def_es: item.strongs_def_es,
                        translated: true
                    }
                }
            }
        }));

        const resultado = await Strong.bulkWrite(operaciones);

        res.json({
            message: "Traducciones guardadas",
            modificados: resultado.modifiedCount
        });
    } catch (error) {
        res.status(500).json({ message: "Error al guardar traducciones", error: error.message });
    }
};

// GET /strongs/estadisticas
module.exports.getEstadisticas = async (req, res) => {
    try {
        const total = await Strong.countDocuments({});
        const traducidas = await Strong.countDocuments({ translated: true });
        res.json({ total, traducidas, pendientes: total - traducidas });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener estadísticas", error: error.message });
    }
};