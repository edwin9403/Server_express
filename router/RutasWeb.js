const express = require('express');
const router = express.Router();

//Rutas del app para organizar los archivos
router.get("/", (req, res)=> {
    res.render("index", {titulo:"Grupo 5, Ciclo 4."});
})

/* router.get("/productos", (req, res)=> {
    res.render("productos", {titulo:"Página principal de productos"});
}) */

/* router.get("/login", (req, res)=> {
    res.render("login", {titulo:"Login"});
})
 */

router.get("/usuarios", (req, res)=> {
    res.render("usuarios", {titulo:"Mi Pagina dinamica de Usuarios"});
})

router.get("/ventas", (req, res)=> {
    res.render("ventas", {titulo:"Aqui va el modulo de Ventas"});
})

module.exports = router;