const { Schema, model } = require('mongoose')
const cfg = require('../config')
let schema = Schema({
    id: {
        type: String
    },
    prefix: {
        type: String,
        default: cfg.prefix
    },
    name: {
        type: String
    }
})

module.exports = model('Guilds', schema)