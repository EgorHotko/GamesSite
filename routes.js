const koaRouter = require('koa-router');
const pug = require('pug');
const IgdbApiWrapper = require('./IgdbApiWrapper');

const router = new koaRouter();
let IgdbWrapper = new IgdbApiWrapper();



router.get('/', async (ctx) => {
    let gamesData = await IgdbWrapper.getGamesData();
    ctx.body = pug.renderFile('templates/allGamesPage.pug', {data : gamesData});
})

    .get('/games/:id', async (ctx) => {
        let gameData = await IgdbWrapper.getGameData(ctx.params.id);
        ctx.body = pug.renderFile('templates/oneGamePage.pug', {data : gameData});
    });

module.exports = router;