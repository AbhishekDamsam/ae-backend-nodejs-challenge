

// Below stores should either come from Db or any search provider with caching feature enabled
const carbonmonoxideStore = require('../../../data/emissions.statistics.carbonmonoxide.json');
const methaneStore = require('../../../data/emissions.statistics.methane.json');
const nitrogendioxideStore = require('../../../data/emissions.statistics.nitrogendioxide.json');
const ozoneStore = require('../../../data/emissions.statistics.ozone.json');

const { filterBetweenDates, filteredDataGreaterThan, aggregateAndAverage } = require('../utils')

const Stores = {
    carbonmonoxide: carbonmonoxideStore,
    methane: methaneStore,
    nitrogendioxide: nitrogendioxideStore,
    ozone: ozoneStore
}

const isGasNameExists = function(gasname){
    if(!Stores[gasname])
        throw new Error("Please enter appropriate Gas name");
    return Stores[gasname];
}

const filterEmission = async function(store, params){
    const { gasname, start, end, averageGreaterThan, averageLessThan } = params;
    let response = [];

    // assuming both will be sent
    if(start || end){
        response = filterBetweenDates(store, start, end)
    }

    if(averageGreaterThan){
        response = filteredDataGreaterThan(response.length != 0 ? response : store, averageGreaterThan);
    }

    if(averageLessThan){
        response = filteredDataGreaterThan(response.length != 0 ? response : store, averageLessThan);
    }

    return response;
}

const aggregateAverages = async function(store){
    return aggregateAndAverage(store);
}

module.exports = {
    Stores,
    filterEmission,
    isGasNameExists,
    aggregateAverages,
}