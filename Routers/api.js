const app = require('express').Router()
const authentification = require('./api/auth')
const discord = require('./api/discord')
const moedas = require('./api/moedas')
const cfg = require('../config')

app.use('/auth', authentification)
app.use('/discord', discord)
app.use('/moedas', moedas)

app.get('/logout', function(req, res){
    req.logout();
    res.redirect(`${cfg.FRONDEND_URL}`);
  });

module.exports = app;