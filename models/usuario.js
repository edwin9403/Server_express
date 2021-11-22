//Modelo Usuario

const mongoose= require('mongoose');
const Schema=mongoose.Schema;

//Creacion de Schema 
const usuarioSchema = new Schema({
    nombre: String,
    apellido: String,
    cel: Number
});

// Creacion del modelo
const Cliente= mongoose.model('Cliente', clienteSchema);
module.exports = Cliente;

