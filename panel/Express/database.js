const mongoose = require('mongoose');
require('dotenv').config();

const UR2 = process.env.URI;

mongoose.connect(UR2)
.then(() => console.log('Database connected successfully'))
.catch(err => console.error(err));

module.exports = mongoose;