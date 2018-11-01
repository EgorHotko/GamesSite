const IgdbApiWrapper = require('./IgdbApiWrapper');

const IgdbWrapper = new IgdbApiWrapper();

function dataFetch(){

};

dataFetch.prototype.fillAllData = async function(data){
    this.data = Object.assign({}, data);
    await this.fillPlatformsData();
    if(this.data.websites)
        this.fillWebsitesCategoryData();
    if(this.data.developers)
        await this.fillDevelopersData();
    this.fillReleaseDate();
    return this.data;
};

dataFetch.prototype.fillPlatformsData = async function(){
    this.data.platforms = await IgdbWrapper.getPlatforms(this.data.platforms); 
};

dataFetch.prototype.fillWebsitesCategoryData = function(){
    this.data.websites = IgdbWrapper.getWebsites(this.data.websites);
};
dataFetch.prototype.fillDevelopersData = async function(){
    this.data.developers = await IgdbWrapper.getDevelopers(this.data.developers);
};
dataFetch.prototype.fillReleaseDate = function(){
    this.data.first_release_date = new Date(this.data.first_release_date).toDateString();
}

module.exports = dataFetch;
