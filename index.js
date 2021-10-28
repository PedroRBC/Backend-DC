require('./Routers/strategies/discord');
const fs = require("fs");
const https = require("https");
const express = require('express')
const app = express();
const cors = require('cors')
const morgan = require('morgan')
const passport = require('passport')
let mongoose = require('mongoose')
const cfg = require('./config')
var session = require('express-session')
mongoose.connect(cfg.database)
let aplicatie = require('./Routers/api')
const MongoDbStore = require('connect-mongo');

const options = {
    key: fs.readFileSync("certificado.key", 'utf-8'),
    cert: fs.readFileSync("certificado.crt", 'utf-8'),
    ca: fs.readFileSync("ca.crt", 'utf-8')
  };

app.use(session({
    secret: 'secret',
    cookie: {
        maxAge: 60000 * 60 * 24
    },
    resave: false,
    saveUninitialized: false,
    store: MongoDbStore.create({
        mongoUrl: cfg.database
    })
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
	origin: ["http://localhost:8000", "http://pedroapi.guiartes.com.br:8000", "http://192.168.15.27:8000", "https://pedroapi.guiartes.com.br:8090", "https://pedro.guiartes.com.br"],
	credentials: true
}))

app.use(express.json())
app.use(morgan("dev"));
app.use(express.urlencoded({extended: true}))
app.use('/api', aplicatie)


https.createServer(options, app).listen(cfg.port);