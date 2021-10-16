const app = require("express").Router();
const MoedasSchema = require("../../Models/moedas");
const config = require('../../config')
const user = require('./moedas/user.js')
const daily = require('./moedas/daily.js')
const board = require('./moedas/board')

const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

app.use('/', user)
app.use('/daily', daily)

app.use('/board', board)

module.exports = app;
