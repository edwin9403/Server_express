const express = require('express');
const router = express.Router();

const Producto = require('../models/producto');
router.get('/', async (req, res) => {
    try {
        const arrayProductosDB = await Producto.find();
        console.log(arrayProductosDB)
        res.render("productos", {
            arrayProductos: arrayProductosDB
        })
    } catch (error) {
        console.log(error)
    }
})

// Ingreso a Productos
router.get('/crear_producto', (req, res) => {
    res.render('crear_producto')
})
//Transporte de los datos de la pagina dinamica a la base de datos
router.post('/', async(req, res)=>{
    const body = req.body

    try{
        //const productoDB = new Producto(body)
        //await productoDB.save()
        await Producto.create(body)
        
        console.log(body)
        res.redirect('productos')

       }catch(error){
            console.log('error', error)
    } 
})
//Edicion de Productos
router.get('/:id', async(req, res)=>{
    const id = req.params.id
    try {
        const productoDB = await Producto.findOne({_id:id})
        console.log(productoDB)
        res.render('detalle_prod', { 
            producto : productoDB,
            error : false
        })
    }catch (error){
        res.render('detalle_prod', { 
            error : true,
            mensaje : 'No se encuentra el id escogido' })  
    }
})
//Borrado de los productos con CRUD
router.delete('/:id', async(req, res)=>{
    const id = req.params.id
    try{
        const productoDB = await Producto.findByIdAndDelete({_id: id})
        if(productoDB) {
            res.json({
                estado : true,
                mensaje : 'Producto Elimininado !!!'
            })
        } else {
        res.json({
            estado : false,
            mensaje : 'El producto no pudo ser elimininado !!!'
        })
    }
    }catch(error){
        console.log(error)
    }
})
//Crear la ruta para editar los Productos
router.put('/:id', async(req, res)=>{
    const id = req.params.id
    const body = req.body
    try {
        const productoDB = await Producto.findByIdAndUpdate(
            id, body, {useFindAndModify: false})
            console.log(productoDB)
            res.json({
                estado : true,
                mensaje : 'Producto Editado'
            })
    } catch (error) {
        res.json({
            estado : false,
            mensaje : 'Fallo al Editar'
        })
        console.log(error)
    }
 })
module.exports = router;