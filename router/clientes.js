const express = require('express');
const router = express.Router();
//Construcción de un archivo de objetos cliente.

router.get('/', (req, res) =>{
    res.render("clientes",{
        arrayClientes: [
            {id:'xyz1234', nombre:"Maria Jose", apellidos:"Lopez Sanchez", cel: 311234567},
            {id:'abc321', nombre:"Juan Camilo ", apellidos:" Triana", cel: 3209876543},
            {id:'zzx232', nombre:"Perdo Juan", apellidos:"Ortiz Guzman", cel: 319654334},
            {id:'kjf432', nombre:"Carlos Alberto ", apellidos:" Zanabria", cel: 322765432},
        ]
    } )
})

module.exports = router;