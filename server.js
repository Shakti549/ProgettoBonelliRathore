"use strict"
const fs = require('fs');
// const url = require('url');
// const path = require('path');
// const HEADERS = require('headers');
const ERRORS = require('errors');

// code 600 - database connection error
ERRORS.create({
    code: 600,
    name: 'DB_CONNECTION',
    defaultMessage: 'An error occured when connecting to database'
});

// code 601 - query execution error
ERRORS.create({
    code: 601,
    name: 'QUERY_EXECUTE',
    defaultMessage: 'An error occured during the query execution'
});

const HTTPS = require('https');

// mongo
const MONGO_CLIENT = require("mongodb").MongoClient;
const STRING_CONNECT = 'mongodb://127.0.0.1:27017';
const PARAMETERS = {
    useNewUrlParser: true,
    /* useUnifiedTopology: true */
};

// express
const express = require('express');
var app = express();
var upload = require('express-fileupload');
const bodyParser = require('body-parser');
const jwt = require("jsonwebtoken");
//const bcrypt = require("bcrypt");

// Online RSA Key Generator
const privateKey = fs.readFileSync("keys/private.key", "utf8");
const certificate = fs.readFileSync("keys/certificate.crt", "utf8");
const credentials = {"key":privateKey, "cert":certificate};

/* ************************************************************ */

// avvio server
const TIMEOUT = 300; // 60 SEC
let pageNotFound;

var httpsServer = HTTPS.createServer(credentials, app);
httpsServer.listen(8888,'127.0.0.1', function() {
    fs.readFile("./static/error.html", function(err, content) {
        if (err)
            content = "<h1>Risorsa non trovata</h1>"
        pageNotFound = content.toString();
    });
    console.log("Server in ascolto https://127.0.0.1: " + this.address().port);

    console.log("COSA TROVO IN ERRORS: \n----\n\n");
    console.log(ERRORS);
    
    //reference https://www.npmjs.com/package/errors
    // solo per debug e comprensione del modulo "errors"
    // console.log(JSON.stringify(new ERRORS.Http401Error({
    //     message: "Messaggio di Errore personalizzato, se non specificato usa quello di default!",
    //     explanation: "Spiegazione, il codice errore è già definito di default! In questo caso 401 Unauthorized"
    // })));
});

/* ************************************************************ */

// middleware
app.use(upload()); // configure middleware
app.use("/", bodyParser.json());
app.use("/", bodyParser.urlencoded({ extended: true }));


app.use("/", function(req, res, next) {
    console.log(">_ " + req.method + ": " + req.originalUrl);
    if (Object.keys(req.query).length != 0)
        console.log("Parametri GET: " + JSON.stringify(req.query));
    if (Object.keys(req.body).length != 0)
        console.log("Parametri BODY: " + JSON.stringify(req.body));
    // Il log di req.params può essere fatto solo DOPO aver assegnato un nome	
    next();
});

/* --------------------------------------------------------------- */
// controllo token per dare l'accesso oppure no

/* --------------------------------------------------------------- */

app.use("/", express.static('./static'));

// controllo del token
/*app.use('/api', function(req, res, next) {
    controllaToken(req, res, next);
});*/





/******************FUNZIONI NON DI DEFAULT*/

app.post("/caricaFoto", function(req, res, next) {
  console.log(req.files);
  if(req.files.upfile){
    var file = req.files.upfile,
      name = file.name,
      type = file.mimetype;
    var uploadpath = __dirname + '/static/immagini/' + name;
    file.mv(uploadpath,function(err){
      if(err){
        console.log("File Upload Failed",name,err);
      }
      else {
        console.log("File Uploaded",name);
      }
    });
  }
  else {
    console.log("Errore");
  };
  
});


app.post('/api/annullaTopOld', function(req, res, next) {
	MONGO_CLIENT.connect(STRING_CONNECT, PARAMETERS, function(err, client) {
		if (err) {
            error(req, res, err, JSON.stringify(new ERRORS.DB_CONNECTION({})))
        } 
        else {
            const DB = client.db('progetto');
            let parametri=req.body;
            const collection = DB.collection("post");
            var idPost = parametri["id"];
            collection.updateOne({_id:parametri},{ $set: { topA:"N"} },function(err, data) {
                if (err)
                    error(req, res, err, JSON.stringify(new ERRORS.QUERY_EXECUTE({})));
                else {
                    res.send(JSON.stringify(data));
                }
            });
            client.close();
		}
    });

});


app.post('/api/inserisciTop', function(req, res, next) {
	MONGO_CLIENT.connect(STRING_CONNECT, PARAMETERS, function(err, client) {
		if (err) {
            error(req, res, err, JSON.stringify(new ERRORS.DB_CONNECTION({})))
        } 
        else {
            const DB = client.db('progetto');
            let parametri=req.body;
            const collection = DB.collection("post");
            var idPost = parametri["id"];
            collection.updateOne({_id:parametri},{ $set: { topA:"Y"} },function(err, data) {
                if (err)
                    error(req, res, err, JSON.stringify(new ERRORS.QUERY_EXECUTE({})));
                else {
                    res.send(JSON.stringify(data));
                }
            });
            client.close();
		}
    });

});

app.post('/api/aggiungiPost', function(req, res, next) {
	MONGO_CLIENT.connect(STRING_CONNECT, PARAMETERS, function(err, client) {
		if (err) {
            error(req, res, err, JSON.stringify(new ERRORS.DB_CONNECTION({})))
        } 
        else {
            const DB = client.db('progetto');
            let parametri=req.body;
            const collection = DB.collection("post");
            var post = {idG:parseInt(parametri["idG"]),like:parseInt(parametri["like"]),percorso: parametri["percorso"],data:parametri["data"]};
            collection.insertOne(post,function(err, data) {
                if (err)
                    error(req, res, err, JSON.stringify(new ERRORS.QUERY_EXECUTE({})));
                else {
                    res.send(JSON.stringify(data));
                }
            });
            client.close();
		}
    });

});

app.post('/api/aggiungiPost', function(req, res, next) {
	MONGO_CLIENT.connect(STRING_CONNECT, PARAMETERS, function(err, client) {
		if (err) {
            error(req, res, err, JSON.stringify(new ERRORS.DB_CONNECTION({})))
        } 
        else {
            const DB = client.db('progetto');
            let parametri=req.body;
            const collection = DB.collection("post");
            var post = {idG:parseInt(parametri["idG"]),like:parseInt(parametri["like"]),percorso: parametri["percorso"],data:parametri["data"]};
            collection.insertOne(post,function(err, data) {
                if (err)
                    error(req, res, err, JSON.stringify(new ERRORS.QUERY_EXECUTE({})));
                else {
                    res.send(JSON.stringify(data));
                }
            });
            client.close();
		}
    });

});


app.post('/api/prendiPost', function(req, res, next) {
	MONGO_CLIENT.connect(STRING_CONNECT, PARAMETERS, function(err, client) {
		if (err) {
            error(req, res, err, JSON.stringify(new ERRORS.DB_CONNECTION({})))
        } 
        else {
            const DB = client.db('progetto');
            let parametri=req.body;
            const collection = DB.collection("post");
            var tabelle = collection.find({idG:parseInt(parametri["id"])}).sort({_id:-1}).toArray(function(err, data) {
                if (err)
                    error(req, res, err, JSON.stringify(new ERRORS.QUERY_EXECUTE({})));
                else {
                    res.send(JSON.stringify(data));
                }
            });
            client.close();
		}
    });

});



/******************** */

// gestione degli errori
function error(req, res, err, httpError) {
    console.log("httpError: " + httpError);
    if (err)
        console.log(err.message);

    res.status(JSON.parse(httpError).code);
    console.log("URI: " + req.originalUrl);
    if (req.originalUrl.startsWith("/api"))
        res.send(httpError);
    else
    // L'unico errore su una richiesta di pagina può essere il token non valido 
    //  (oppure il successivo 404 not found)
        res.sendFile('index.html', { root: './static' })
}

// default route finale
app.use('/', function(req, res, next) {
    res.status(404)
    if (req.originalUrl.startsWith("/api")) {
        res.send('Risorsa non trovata');
    } else {
        res.send(pageNotFound);
    }
});