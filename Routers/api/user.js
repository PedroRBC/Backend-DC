const app = require('express').Router()
const MoedasSchema = require("../../Models/moedas");
const config = require('../../config')

app.get('/', (req,res) => {
    if(req.user) {
        MoedasSchema.findOne({id: req.user.discordId}, async (err, money) => {      
        res.json({msg: "authorized", money: money})
        })
    } else {
        res.json({msg: "unauthorized"})
    }
})

module.exports = app;