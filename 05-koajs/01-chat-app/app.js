const path = require('path');
const Koa = require('koa');
const app = new Koa();

app.use(require('koa-static')(path.join(__dirname, 'public')));
app.use(require('koa-bodyparser')());

const Router = require('koa-router');
const router = new Router();

const subscribers = {}
router.get('/subscribe', async (ctx, next) => {
    const subscriberId = ctx.request.query.r || Math.random()
    ctx.req.on('close', () => {
        delete subscribers[subscriberId]
    })
    const promise = new Promise((resolve) => {
        subscribers[subscriberId] = resolve

    })
    const message = await promise;
    ctx.body = message;
});

router.post('/publish', async (ctx, next) => {
    if (ctx.request.body.message) {
        for (const subscriberId in subscribers) {
            subscribers[subscriberId](ctx.request.body.message)
        }
    }
    ctx.body = "Success"
});

app.use(router.routes());

module.exports = app;
