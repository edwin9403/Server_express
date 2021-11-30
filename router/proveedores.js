const express = require('express');
const router = express.Router();

const Proveedor = require('../models/proveedor');
router.get('/', async (req, res) => {
    try {
        const arrayProveedoresDB = await Proveedor.find();
        console.log(arrayProveedoresDB)
        res.render("proveedores", {
            arrayProveedores: arrayProveedoresDB
        })
    } catch (error) {
        console.log(error)
    }
})

// Ingreso a Clientes
router.get('/crear', (req, res) => {
    res.render('crear')
})

//Transporte de los datos de la pagina dinamica a la base de datos
router.post('/', async(req, res)=>{
    const body = req.body

    try{
        //const clienteDB = new Cliente(body)
        //await clienteDB.save()
        await Proveedor.create(body)
        
        console.log(body)
        res.redirect('proveedores')

       }catch(error){
            console.log('error', error)
    } 
})

//Edicion de cliente
router.get('/:id', async(req, res)=>{
    const id = req.params.id
    try {
        const productoDB = await Producto.findOne({_id:id})
        console.log(productoDB)
        res.render('detalle_prov', { 
            proveedor : proveedorDB,
            error : false
        })
    }catch (error){
        res.render('detalle_prov', { 
            error : true,
            mensaje : 'No se encuentra el id escogido' })  
    }
})

//Borrado de los clientes con CRUD
router.delete('/:id', async(req, res)=>{
    const id = req.params.id
    try{
        const proveedorDB = await Proveedor.findByIdAndDelete({_id: id})
        if(proveedorDB) {
            res.json({
                estado : true,
                mensaje : 'Proveedor Elimininado !!!'
            })
        } else {
        res.json({
            estado : false,
            mensaje : 'El proveedor no pudo ser elimininado !!!'
        })
    }
    }catch(error){
        console.log(error)
    }
})

//Crear la ruta para editar los clientes
router.put('/:id', async(req, res)=>{
    const id = req.params.id
    const body = req.body
    try {
        const proveedorDB = await Proveedor.findByIdAndUpdate(
            id, body, {useFindAndModify: false})
            console.log(proveedorDB)
            res.json({
                estado : true,
                mensaje : 'Proveedor Editado'
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