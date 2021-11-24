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

module.exports = router;