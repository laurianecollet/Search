let express = require('express'); // require module express
let datas = require('./datas.json')
let app = express(); //initialise le serveur http
let cors = require('cors') // sécurité d'acces à l'API
//Sur une route "/" en GET

//permission du serveur localhost sur le port 8080
app.use(cors({ origin: 'http://localhost:8080' }));


app.get('/', function (req, res) {
	res.json(datas); // renvoyer la réponse
	//fonction json() qui me permet d'envoyer du json
});

app.get('/star', function (req, res) {
	let tab = datas.filter((elt) => elt.note > 7);
	res.json(tab);
});

// :mot est un argument d'url
app.get('/search/:word?', function (req, res) { // ? un mot ou pas
	let word = req.params.word; // req.params permet de récupérer les parmaetres en url
	if (word == "") {
		res.json(datas)
	} else {

		console.log(word);

		let tab = [];
		let reg = new RegExp(word, "i")
		tab = datas.filter((elt) => reg.test(elt.title));
		res.json(tab);
	}
});

app.get('/post/:indice', function (req, res) {
	let indice = parseInt(req.params.indice);
	console.log(indice)
	let tab = datas.filter((elt) => elt.id === indice);

	res.json(tab[0]);

});

app.get('/invisible', function (req, res) {
	let tab = datas.filter((elt) => elt.visible === false);
	res.json(tab)

});

//Ecoute mon serveur http sur le port 3000
app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});


//Install of nodemon for automatically restart your server