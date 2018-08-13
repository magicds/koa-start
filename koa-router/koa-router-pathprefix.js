const Koa = require('koa')
const app = new Koa()

const router = require('koa-router')({
    prefix: '/api'
})

router
    .get('/', async (ctx) => {
        ctx.body = 'This is api request'
    })
    .get('/user', async (ctx) => {
        ctx.body = 'This is user api request'
    })
    .get('/admin', async (ctx) => {
        ctx.body = 'This is admin api request'
    })

app
    .use(router.routes())
    .use(router.allowedMethods())

app.listen(3000, () => {
    console.log('starting at port 3000')
})