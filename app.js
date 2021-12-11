//Creacion de server con express
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const cookiePaser = require('cookie-parser');
const port = 14;
const async = require('async');
const multer = require('multer');
const path = require('path');
const csvModel = require('./models/csv');
const csv = require('csvtojson');

const storage = multer.diskStorage({
  destination:(req,file,cb)=>{
      cb(null,'./public/uploads');
  },
  filename:(req,file,cb)=>{
      cb(null,file.originalname);
  }
});

const uploads = multer({storage:storage});

//Conexion a base de datos

const mongoose =require('mongoose');
const usuario="";
const password="";
const dbName="tienda";

const uri=`mongodb://localhost:27017/tienda`;

mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology:true})
.then(()=> console.log('Conectado a la base de datos'))
.catch(e => console.log('Error de conexión',e));

//Motor de plantillas
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//Carpeta publica de archivos
//app.use(express.static(__dirname + "/public"));
app.use(express.static(path.resolve(__dirname,'public')));

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

//default pageload
app.get('/usuarios',(req,res)=>{
  csvModel.find((err,data)=>{
       if(err){
           console.log(err);
       }else{
            if(data!=''){
                res.render('demo',{data:data});
            }else{
                res.render('demo',{data:''});
            }
       }
  });
});

var temp ;

app.post('/',uploads.single('csv'),(req,res)=>{
   //convert csvfile to jsonArray   
csv()
.fromFile(req.file.path)
.then((jsonObj)=>{
    console.log(jsonObj);
    for(var x=0;x<jsonObj;x++){
         temp = parseFloat(jsonObj[x].nombre)
         jsonObj[x].nombre = temp;
         temp = parseFloat(jsonObj[x].email)
         jsonObj[x].email = temp;
         temp = parseFloat(jsonObj[x].password)
         jsonObj[x].password = temp;
      }
      csvModel.insertMany(jsonObj,(err,data)=>{
             if(err){
                 console.log(err);
             }else{
                 res.redirect('/');
             }
      });
    });
 });

//Rutas website
app.use('/', require('./router/RutasWeb'));

 //Rutas de archivo de datos
app.use('/clientes', require('./router/clientes'));
app.use('/proveedores', require('./router/proveedores'));
app.use('/productos', require('./router/productos'));
app.use('/reportes', require('./router/reportes'));
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

app.get("/",(req, res)=>{


})

app.get("/login",(req, res)=>{

  res.send("Hola Mundo")
});

app.post("/login",(req, res)=>{


});

/* app.post('/', function(req, res) {
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
  }); */
