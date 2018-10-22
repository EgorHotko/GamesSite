const request = require('request-promise');
const config = require('./config');
const buildUrl = require('build-url');


function IgdbWrapper(){
    this.options = {
        url : config.URL,
        headers: {
            'Accept': 'application/json',
            'user-key': config.USER_KEY
        }
    };
};

IgdbWrapper.prototype.getGamesData = async function(){
    const gamesEndpointOptions = this.makeEndpointOptions({
        path: 'games/',
        queryParams: {
            fields: ['name', 'popularity', 'cover.url', 'id'],
            order: 'popularity:desc'    
        }
      }
    );
    let response = await request.get(gamesEndpointOptions);
    let gamesData = JSON.parse(response);
    return gamesData;    
};
IgdbWrapper.prototype.getGameData = async function(gameId){
    const gameEndpointOptions = this.makeEndpointOptions({
        path: `${"games/" + gameId}`,
        queryParams: {
            fields: ['name', 'summary', 'first_release_date', 'platforms',
                'developers', 'websites', 'popularity', 'cover.cloudinary_id']
        }
    });
    let response = await request.get(gameEndpointOptions);
    let gameData = JSON.parse(response);
    return gameData;
};
IgdbWrapper.prototype.makeEndpointOptions = function(endpointParams){
    let endpointOptions = Object.assign({}, this.options);
    endpointOptions.url = buildUrl(this.options.url, endpointParams);
    return endpointOptions;
};

module.exports = IgdbWrapper;