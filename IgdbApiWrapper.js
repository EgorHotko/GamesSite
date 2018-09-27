const request = require('request-promise');
const config = require('./config');


function IgdbWrapper(){
    this.options = {
        url : config.URL + '?fields=name,popularity&order=popularity:desc',
        headers: {
            'Accept': 'application/json',
            'user-key': config.USER_KEY
        }
    };
};

IgdbWrapper.prototype.getGamesData = async function(){
    let response = await request.get(this.options);
    let gamesData = JSON.parse(response);
    return gamesData;    
};

module.exports = IgdbWrapper;