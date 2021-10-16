const { Schema, model } = require('mongoose')
let schema = Schema({
    _id: Schema.Types.ObjectId,
    id: String,
    name: String,
    prefix: {
        default: '!',
        type: String
    }
})

module.exports = model('Guilds', schema)