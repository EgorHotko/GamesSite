'use strict';
const Koa = require('koa');
const router = require('./routes');
const serve = require('koa-static');

const app = new Koa();


app.use(router.routes())
    .use(router.allowedMethods())
    .use(serve('./templates'));

app.listen(3000);