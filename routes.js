const koaRouter = require('koa-router');
const pug = require('pug');
const IgdbApiWrapper = require('./IgdbApiWrapper');
const gameDataFetcher = require('./gameDataFetch');


const router = new koaRouter();
let IgdbWrapper = new IgdbApiWrapper();
let gameDataFetch = new gameDataFetcher();



router.get('/', async (ctx) => {
    let gamesData = await IgdbWrapper.getGamesData();
    ctx.body = pug.renderFile('templates/gamesListPage.pug', {data : gamesData});
})

    .get('/games/:id', async (ctx) => {
        let gameData = await IgdbWrapper.getGameData(ctx.params.id);
        let updatedGameData = await gameDataFetch.fillAllData(gameData[0]);
        ctx.body = pug.renderFile('templates/gameInfoPage.pug', {data : updatedGameData});
    });

module.exports = router;