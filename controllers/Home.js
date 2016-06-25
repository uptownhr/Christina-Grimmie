const router = require('koa-router')({ prefix: '' })

const config = require('../config')


router.get('/', async ctx => {
  ctx.redirect('/christina-grimmie')
})

router.get('/christina-grimmie', async ctx => {
  ctx.render('newPage')
})

router.get('/christina-grimmie/timeline', async ctx => {
  ctx.render('timeline')
})

module.exports = router
