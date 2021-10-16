const app = require('express').Router()
const MoedasSchema = require("../../Models/moedas");

app.get('/', (req, res)=>{
    res.send('good!')
})

app.post('/', (req,res) => {
    let timeout = 86400000;
    let agora = Date.now()
    if(req.user) {
        MoedasSchema.findOne({id: req.user.discordId}, async (err, money) => {
        if ((money.daily - agora) <= 0 ) {    
        let amount = Math.floor(Math.random() * 4000) + 1;
        money.moedas = money.moedas + amount;
        money.daily = (agora + timeout);
        money.save() 
        return res.json({msg: "authorized", good: "good"})
    } else {
        return res.json({msg: "authorized", good: "not"})
    }}, {new: true})
    } else {
        return res.json({msg: "unauthorized"})
    }
})

module.exports = app;