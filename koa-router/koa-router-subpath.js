const Koa = require('koa')
const app = new Koa()

const Router = require('koa-router')

const user = new Router()
user
    .get('/1', async (ctx) => {
        ctx.body = 'This is user 1'
    })
    .get('/2', async (ctx) => {
        ctx.body = 'This is user 2'
    })

const movie = new Router()
movie
    .get('/', async (ctx) => {
        ctx.body = 'This is movie request'
    })
    .get('/:id', async (ctx) => {
        const str = /[12]/.test(ctx.params.id) ? ctx.params.id : 'not found'
        ctx.body = `This is movie ${str}`
    })

const router = new Router({
    prefix: '/api'
})
router.use('/user', user.routes(), user.allowedMethods())
router.use('/movie', movie.routes(), movie.allowedMethods())

app
    .use(router.routes())
    .use(router.allowedMethods())

app.listen(3000, () => {
    console.log('starting at port 3000')
})