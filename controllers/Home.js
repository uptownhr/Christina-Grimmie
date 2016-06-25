const router = require('koa-router')({ prefix: '' })

const config = require('../config')

router.get('/', async ctx => {
  ctx.render('newPage')
})

router.get('/timeline', async ctx => {
  ctx.render('timeline')
})

module.exports = router
