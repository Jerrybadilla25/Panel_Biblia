const mongoose = require('mongoose');
const Shema = mongoose.Schema;

const newStrong = new Shema({
    strong: { type: String, unique: true },   // ej "H7225" o "G3056"
    lang: { type: String },                    // "heb" o "gr"
    lemma: { type: String },
    translit: { type: String },
    pron: { type: String, default: null },
    derivation: { type: String },
    strongs_def: { type: String },             // definición original en inglés
    kjv_def: { type: String },
    strongs_def_es: { type: String, default: null }, // traducción al español
    translated: { type: Boolean, default: false },
    batch: { type: Number, default: null },
});

module.exports = mongoose.model('strong', newStrong);