const Koa = require('koa');
const app = new Koa();

// x-response-time

app.use(async (ctx, next) => {
    console.log(201);
    const start = Date.now();
    await next();
    console.log(202);
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});

// logger

app.use(async (ctx, next) => {
    console.log(101);
    await next();
    console.log(102);
    const rt = ctx.response.get('X-Response-Time');
    console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// response

app.use(async ctx => {
    console.log(301);
    ctx.body = ctx;
});

app.listen(3000);
