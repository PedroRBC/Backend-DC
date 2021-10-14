const { Schema, model } = require('mongoose')

const Moedas = Schema({
    _id: Schema.Types.ObjectId,
    id: String,
    name: String,
    moedas: {
        default: 0,
        type: Number
    },
    daily: {
        default: 0,
        type: Number
    }
})

module.exports = model('Moedas', Moedas)