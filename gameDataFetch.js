const request = require('request-promise');
const IgdbApiWrapper = require('./IgdbApiWrapper');

let IgdbWrapper = new IgdbApiWrapper();

function dataFetch(){

};

dataFetch.prototype.fillAllData = async function(data){
    this.data = Object.assign({}, data);
    await this.fillPlatformsData();
    await this.fillWebsitesCategoryData();
    return this.data;
};

dataFetch.prototype.fillPlatformsData = async function(){
    const platformEndpointOptions = IgdbWrapper.makeEndpointOptions({
        path: `${"platforms/" + this.data.platforms.join(",")}`,
        queryParams: {
            fields: ['name'],   
            }
        }
    );
    let response = await request.get(platformEndpointOptions);
    let platformData = JSON.parse(response);
    this.data.platforms = platformData; 
};

dataFetch.prototype.fillWebsitesCategoryData = function(){
    const categories = {
        "1": "official",
        "2": "wikia",
        "3":	"wikipedia",
        "4":	"facebook",
        "5":	"twitter",
        "6":	"twitch",
        "8":	"instagram",
        "9":	"youtube",
        "10":	"iphone",
        "11":	"ipad",
        "12":	"android",
        "13":	"steam",
        "14":	"Reddit"
    };
    this.data.websites = this.data.websites.map((website)=>{
        return {...website, category: categories[website.category]};
    });
};

module.exports = dataFetch;