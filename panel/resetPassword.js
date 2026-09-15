// resetPassword.js
// Uso: node resetPassword.js
//
// Actualiza la contraseña de un usuario existente directamente en Mongo,
// generando el hash con bcrypt (mismo algoritmo que usa el backend).
//
// Ajustá MONGO_URI si no la tenés en un .env, y USER_ID / NUEVA_PASSWORD según necesites.

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// -----------------------------
// CONFIGURACIÓN
// -----------------------------
const MONGO_URI = process.env.URI || 'PON_AQUI_TU_CONNECTION_STRING';
const USER_ID = '626df83ed57414a2e062a9b2'; // el _id de tu usuario JerryBD
const NUEVA_PASSWORD = 'monitor25';
const NOMBRE_COLECCION = 'usuarios'; // ajustá si tu colección se llama distinto (ej "user")

async function resetPassword() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Conectado a Mongo');

    const hash = await bcrypt.hash(NUEVA_PASSWORD, 10);
    console.log('🔐 Hash generado:', hash);

    const db = mongoose.connection.db;
    const resultado = await db.collection(NOMBRE_COLECCION).updateOne(
      { _id: new mongoose.Types.ObjectId(USER_ID) },
      { $set: { password: hash } }
    );

    if (resultado.matchedCount === 0) {
      console.log('❌ No se encontró ningún usuario con ese _id. Revisá NOMBRE_COLECCION o USER_ID.');
    } else {
      console.log(`✅ Contraseña actualizada correctamente. Documentos modificados: ${resultado.modifiedCount}`);
    }
  } catch (err) {
    console.error('❌ Error:', err);
  } finally {
    await mongoose.disconnect();
  }
}

resetPassword();