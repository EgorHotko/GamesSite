const request = require('request-promise');
const config = require('./config');
const buildUrl = require('build-url');
const Categories = require('./enumeratedFields')


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
    return Object.assign({}, {headers: this.options.headers,
        url: buildUrl(this.options.url, endpointParams)
    });
};
IgdbWrapper.prototype.getPlatforms = async function(platforms){
    const platformEndpointOptions = this.makeEndpointOptions({
        path: `${"platforms/" + platforms.join(",")}`,
        queryParams: {
            fields: ['name'],   
            }
        }
    );
    let response = await request.get(platformEndpointOptions);
    return JSON.parse(response);
};
IgdbWrapper.prototype.getWebsites = function(websites){
    let websitesData = websites.map(website => {
        return {...website, category: Categories[website.category]};
    });
    return websitesData;
};
IgdbWrapper.prototype.getDevelopers = async function(developers){
    const developersEndpointOptions = this.makeEndpointOptions({
        path: `${"companies/" + developers.join(",")}`,
        queryParams: {
            fields: ['name'],   
            }
        }
    );
    let response = await request.get(developersEndpointOptions);
    return JSON.parse(response);
};

module.exports = IgdbWrapper;
