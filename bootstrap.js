'use strict'

const Koa = require('koa'),
  Pug = require('koa-pug'),
  serve = require('koa-static'),
  config = require('./config'),
  path = require('path'),
  bodyParser = require('koa-bodyparser'),
  _ = require('lodash'),
  convert = require('koa-convert')

const app = new Koa()

var { Validator, FileValidator } = require('koa-validate')
Validator.prototype.addError = function (tip) {
  this.goOn = false;
  if (this.value && this instanceof FileValidator) {
    this.value.goOn = false;
  }

  if (!this.context.errors) {
    this.context.errors = [];
  }

  this.context.errors.push(tip);
}

require('koa-validate')(app)

// listen on config port, default 3000
app.server = app.listen(config.port, function () {
  console.log('listening on', config.port)
})

/* configure application */
const pug = new Pug({
  viewPath: './views',
  debug: true,
  compileDebug: true,
  pretty: true,
  locals: {
    messages: {}
  },
  basedir: './views',
  helperPath: [],
  noCache: true
})
pug.options.noCache = true
pug.use(app)


//specify public static directory
app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.status = err.status || 500
    ctx.body = { msg: err.message }
    ctx.app.emit('error', err, this)
  }
})
app.use(convert(serve('public')))
app.use(bodyParser())

app.keys = [config.secret]

module.exports = app
