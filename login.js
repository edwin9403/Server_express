const conect_mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const port = 11220;

const connection = conect_mysql.createConnection({
	host: 'localhost',
	user: 'andres',
	password: 'Manzan49011',
	database: 'c4_tienda'
});

const app = express();
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname + '/login.html'));
	//res.render("create.ejs", {titulo:"Mi titulo dinamico"});
	
});

app.post('/autenticacion', function (req, res) {
	const username = req.body.username;
	const password = req.body.password;
	if (username && password) {
		connection.query('SELECT * FROM login_user WHERE username = ? AND password = ?', [username, password], function (error, results, fields) {
			if (results.length > 0) {
				req.session.loggedin = true;
				req.session.username = username;
				res.redirect('/app');
			} else {
				res.send('Usuario o contraseña incorrectos');
			}
			res.end();
		});
	}
});

app.get('/app', function (req, res) {
	if (req.session.loggedin) {
		res.send('Bienvenido, ' + req.session.username + '!');

	} else {
		res.send('Se debe autenticar para ver el contenido de esta pagina.');
	}
	res.end();
});
//Motor de plantillas
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
//Carpeta publica de archivos
app.use(express.static(__dirname + "/public"));

//Middleware para un archivo particular
app.use((req, res, next) => {
	res.status(404).sendFile(__dirname + "/public/404.html");
});

app.listen(port, () => {
	console.log(`escucha del sitio http://localhost:${port}`);

});
