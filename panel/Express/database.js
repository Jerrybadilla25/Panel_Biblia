/*const mongoose = require('mongoose');
require('dotenv').config();

const URI = process.env.URII;

mongoose.connect(URI, {
    useNewUrlParser: false, 
    useUnifiedTopology: false,
    autoIndex: false
})
.then(db => console.log('database is running, mongo Atlas'))
.catch(err => console.error(err));

module.exports = mongoose;
*/


const mongoose = require('mongoose');
require('dotenv').config();

const UR2 = process.env.URI;

mongoose.connect(UR2, {
    useNewUrlParser: true, useUnifiedTopology: true,
    autoIndex: false
})
.then(db => console.log('data base corriendo bien'))
.catch(err => console.error(err));

module.exports = mongoose;