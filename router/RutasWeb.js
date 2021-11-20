const express = require('express');
const router = express.Router();

//Rutas del app para organizar los archivos
router.get("/", (req, res)=> {
    res.render("index", {titulo:"Grupo 5, Ciclo 4."});
})

router.get("/productos", (req, res)=> {
    res.render("productos", {titulo:"Mi Pagina dinamica de produtos"});
})

router.get("/usuarios", (req, res)=> {
    res.render("usuarios", {titulo:"Mi Pagina dinamica de Usuarios"});
})



module.exports = router;