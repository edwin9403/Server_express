//Creacion de server con express
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 14;
const async = require('async');

//Motor de plantillas
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//Carpeta publica de archivos
app.use(express.static(__dirname + "/public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

//Conexion a base de datos

const mongoose =require('mongoose');
const usuario="";
const password="";
const dbName="tienda";

const uri=`mongodb://localhost:27017/tienda`;

mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology:true})
.then(()=> console.log('Conectado a la base de datos'))
.catch(e => console.log('Error de conexión',e));

//Rutas website
app.use('/', require('./router/RutasWeb'));

//Rutas de archivo de datos
app.use('/clientes', require('./router/clientes'));
app.use('/proveedores', require('./router/proveedores'));
app.use('/productos', require('./router/productos'));
//app.use('/usuarios', require('./router/usuarios'));

//Se escucha al server Express
app.listen(port, ()=>{
    console.log(`escucha del sitio http://localhost:${port}`);

});

app.use((req, res, next) => {
    res.status(404).render("404",{
        titulo:"Error 404",
        descripcion:"Clic sobre la imagen para ir a la página de inicio"});
});
app.post('/', function(req, res) {
    async.waterfall([
      function (callback) {
        usuarios.findOne({
          "email": email
        }, function (err, result) {
          if (err) {
            console.log(err);
            res.send({error: "An error has occurred"});
          } else {
            if (result == null) {
              res.send({"error": "This email address is not recognised, please check you have entered your email correctly"});
            } else {
              console.log("Email recognised");
              callback(null, result);
            }
          }
        });
      },
      function (result, callback){
        const password = result.password;
        if (password !== password){
          res.send({"error":"Sorry your password is incorrect"});
        } else {
          res.send({success:"Logged in successfully"});
        }
      }
    ])
  });
