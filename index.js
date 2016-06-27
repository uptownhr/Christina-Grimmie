'use strict'
require('babel-register')

const app = require('./bootstrap'),
  controllers = require('./controllers')

app.use(controllers.Home.routes())

module.exports = app
