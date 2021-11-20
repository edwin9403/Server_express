const express = require('express');
const router = express.Router();
//Construcción de un archivo de objetos proveedores.

router.get('/', (req, res) =>{
    res.render("proveedores",{
        arrayProveedores: [
            {id:'aaaa', nombre:"Proveedor A", apellidos:"Lopez Sanchez", cel: 311234567},
            {id:'bbbb', nombre:"Proveedor B", apellidos:" Triana", cel: 3209876543},
            {id:'cccc', nombre:"Proveedor C", apellidos:"Ortiz Guzman", cel: 319654334},
            {id:'dddd', nombre:"Proveedor D", apellidos:" Zanabria", cel: 322765432},
        ]
    } )
})

module.exports = router;