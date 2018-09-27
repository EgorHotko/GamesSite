const koaRouter = require('koa-router');
const pug = require('pug');
const IgdbApiWrapper = require('./IgdbApiWrapper');

const router = new koaRouter();
let IgdbWrapper = new IgdbApiWrapper();



router.get('/', async (ctx) => {
    let gameData = await IgdbWrapper.getGamesData();
    ctx.body = pug.renderFile('templates/secondTemplate.pug', {data : gameData[0].name});
})

    .get('/first', async (ctx) => {
    ctx.body = pug.renderFile('templates/firstTemplate.pug');
    });

module.exports = router;