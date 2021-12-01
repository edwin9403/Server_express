//Modelo Proveedor

const mongoose= require('mongoose');
const Schema=mongoose.Schema;

//Creacion de Schema 
const proveedorSchema = new Schema({
    nitproveedor: Number,
    ciudad_proveedor: String,
    direccion_proveedor: String,
    nombre_proveedor: String,
    telefono_proveedor: String,
    
});

// Creacion del modelo
const Proveedor= mongoose.model('Proveedor', proveedorSchema);
module.exports = Proveedor;

