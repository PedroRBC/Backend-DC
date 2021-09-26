const app = require('express').Router()
const passport = require('passport')

app.get('/discord', passport.authenticate('discord'));
app.get('/discord/redirect', passport.authenticate('discord', {
    failureRedirect: 'http://localhost:3000/'
}), (req,res) => {
    res.redirect('http://localhost:3000/account')
})
app.get('/', (req,res) => {
    if(req.user) {
        res.json({msg: "authorized", user: req.user})
    } else {
        res.json({msg: "unauthorized"})
    }
})
module.exports = app;