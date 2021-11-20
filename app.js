//Creacion de server con express
const express = require('express');
const app = express();
const port = 3444;
//Motor de plantillas
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
//Carpeta publica de archivos
app.use(express.static(__dirname + "/public"));

//Llamado de pagina index dinamica

//Aqui crearemos el servidorExpress
/*app.get("/",(req,res)=>{
    res.send("<h1>Hola bienvenidos desde un servidor Express_V_1</h1>");
});*/
/*
app.get("/productos", (req, res) =>{
    res.send("<h1 align=center>Hola estas en la pagina de productos </h1>");
})*/

//Aqui hago un middleware para llamar un archivo en particular

//Rutas website
app.use('/', require('./router/RutasWeb'));

//Rutas de archivo de datos
app.use('/clientes', require('./router/clientes'));
app.use('/proveedores', require('./router/proveedores'));

app.use((req, res, next) => {
    res.status(404).render("404",{
        titulo:"Error 404",
        descripcion:"Clic sobre la imagen para ir a la página de inicio"});
});

//Se escucha al server Express
app.listen(port, ()=>{
    console.log(`escucha del sitio http://localhost:${port}`);

});