//Modelo Productos

const mongoose= require('mongoose');
const Schema=mongoose.Schema;

//Creacion de Schema 
const productoSchema = new Schema({
    codigo_producto: Number,
    nombre_producto: String,
    nitproveedor: Number,
    precio_compra: Number,
    ivacompra: Number,
    precio_venta: Number
});

// Creacion del modelo
const Producto= mongoose.model('Producto', productoSchema);
module.exports = Producto;

