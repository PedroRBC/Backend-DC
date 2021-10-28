const app = require('express').Router()
const MoedasSchema = require("../../../Models/moedas");
const config = require('../../../config')
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

app.get('/', async (req,res) => {
    var users = await MoedasSchema.find().sort({moedas: 'desc'}).limit(10)

    const getUser = async (id) => {
      const res = await fetch(`http://discord.com/api/v9/users/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bot ${config.token}`,
        },
      })
      return res.json()
    }
    
    const makefor = async (users) => {
      async function* asyncGenerator() {
        var i = 0;
        while (i < users.length) {
          yield i++;
        }
      }
      var RESULT = [];
    for await (let Nn of asyncGenerator()) {
      await getUser(users[Nn].id).then((user)=>{
        if(user.avatar == null) {
          let jsonsend = {
            name: user.username,
            id: user.id,
            moedas: users[Nn].moedas,
            avatar: 'https://pedroapi.guiartes.com.br:8090/assets/default/default_user.jpg',
            key: `${Nn}000${user.id}`
          }
          
          RESULT[Nn] = jsonsend
        } else {
          const avatarUrl = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=512`
          let jsonsend = {
            name: user.username,
            id: user.id,
            moedas: users[Nn].moedas,
            avatar: avatarUrl,
            key: `${Nn}000${user.id}`
          }
          RESULT[Nn] = jsonsend
        }
        
      })
    }
    return RESULT
      }
    await makefor(users).then((RESULT)=>{ res.send(RESULT)})
})

module.exports = app;