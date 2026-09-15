// importarStrongs.js
// Uso: node importarStrongs.js
//
// Lee strongs_export.json (el que ya sacaste de bible.sqlite) y lo carga
// a la colección 'strongs' en tu Mongo, usando el mismo modelo del backend.
//
// Poné este archivo en la raíz del proyecto (junto a resetPassword.js) y
// asegurate de tener strongs_export.json en la misma carpeta o ajustá la ruta.

require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const Strong = require('./Express/model/model.strong');

const RUTA_JSON = './strongs_export.json';

async function importar() {
    try {
        await mongoose.connect(process.env.URI);
        console.log('✅ Conectado a Mongo');

        const raw = fs.readFileSync(RUTA_JSON, 'utf-8');
        const entradas = JSON.parse(raw);
        console.log(`📖 Entradas leídas del JSON: ${entradas.length}`);

        const operaciones = entradas.map((item) => ({
            updateOne: {
                filter: { strong: item.strong },
                update: {
                    $setOnInsert: {
                        strong: item.strong,
                        lang: item.lang,
                        lemma: item.lemma,
                        translit: item.translit,
                        pron: item.pron,
                        derivation: item.derivation,
                        strongs_def: item.strongs_def,
                        kjv_def: item.kjv_def,
                        strongs_def_es: null,
                        translated: false
                    }
                },
                upsert: true
            }
        }));

        // bulkWrite en tandas para no saturar la conexión
        const TAMANO_TANDA = 1000;
        let totalProcesado = 0;

        for (let i = 0; i < operaciones.length; i += TAMANO_TANDA) {
            const tanda = operaciones.slice(i, i + TAMANO_TANDA);
            await Strong.bulkWrite(tanda);
            totalProcesado += tanda.length;
            console.log(`   ...importadas ${totalProcesado} / ${operaciones.length}`);
        }

        const totalEnMongo = await Strong.countDocuments({});
        console.log(`✅ Importación completa. Total en Mongo: ${totalEnMongo}`);
    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await mongoose.disconnect();
    }
}

importar();