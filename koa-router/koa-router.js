const Koa = require('koa')
const app = new Koa()

const router = require('koa-router')()

router
    .get('/', async (ctx) => {
        ctx.body = 'Hellow World'
    })
    .get('/koa', async (ctx) => {
        ctx.body = 'Hellow Koa'
    })

app
    .use(router.routes())
    .use(router.allowedMethods())

app.listen(3000, () => {
    console.log('starting at port 3000')
})