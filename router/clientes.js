const express = require('express');
const router = express.Router();

const Cliente = require('../models/cliente');
router.get('/', async (req, res) => {
    try {
        const arrayClientesDB = await Cliente.find();
        console.log(arrayClientesDB)
        res.render("clientes", {
            arrayClientes: arrayClientesDB
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
        await Cliente.create(body)
        
        console.log(body)
        res.redirect('clientes')

       }catch(error){
            console.log('error', error)
       
    } 

})

//Edicion de cliente
router.get('/:id', async(req, res)=>{
    const id = req.params.id
    try {
        const clienteDB = await Cliente.findOne({_id:id})
        console.log(clienteDB)
        res.render('detalle', { 
            cliente : clienteDB,
            error : false
        })
    }catch (error){
        res.render('detalle', { 
            error : true,
            mensaje : 'No se encuentra el id escogido' })  
    }
})

//Borrado de los clientes con CRUD
router.delete('/:id', async(req, res)=>{
    const id = req.params.id
    try{
        const clienteDB = await Cliente.findByIdAndDelete({_id: id})
        if(clienteDB) {
            res.json({
                estado : true,
                mensaje : 'Usuario Elimininado !!!'
            })
        } else {
        res.json({
            estado : false,
            mensaje : 'El usuario no pudo ser elimininado !!!'
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
        const clienteDB = await Cliente.findByIdAndUpdate(
            id, body, {useFindAndModify: false})
            console.log(clienteDB)
            res.json({
                estado : true,
                mensaje : 'Cliente Editado'
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