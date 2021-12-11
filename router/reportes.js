const express = require('express');
const router = express.Router();

//Aqui vamos a construir un archivo de objetos cliente

router.get('/', (req,res)=>{
    res.render("reportes",{
        arrayClientes:[
            {id:'xyz1234', nombre:"Maria Jose", apellidos: "Lopez Sanchez", cel: 3113113112},
            {id:'xyz1235', nombre:"Juan Esteban", apellidos: "Guarnizo Mendez", cel: 320113789},
            {id:'xyz1236', nombre:"Maria del Pilar", apellidos: "Cuadrado Gomez", cel: 315113733},
            {id:'xyz1237', nombre:"Andres", apellidos: "Llanos Sepulveda", cel: 301113666},
        ]
    })
})


module.exports = router;