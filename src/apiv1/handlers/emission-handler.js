const ApiError = require('../apiError')

const { Stores, filterEmission, isGasNameExists, aggregateAverages } = require('../services/emision-service')


const emissionFilterHandler = async function(req, res, next) {
    try {
        const gasname = req.params.gasname;
        if(!Stores[gasname])
            throw new Error("Please enter appropriate Gas name");

        //const { start, end, averageGreaterThan, averageLessThan } = req.query;

        const result = await filterEmission(Stores[gasname], {...req.query})

        return res.status(200).json(result);
    }
    catch(err){
        next(ApiError.internal(err.message));
    }
}

const emissionAggregateHandler = async function(req, res, next) {
    try {
        const gasname = req.params.gasname;
        const store = isGasNameExists(gasname);

        const result = await aggregateAverages(store);

        return res.status(200).json({ aggregateValue: result});
    }
    catch(err){
        next(ApiError.internal(err.message));
    }
}

module.exports = {
    emissionFilterHandler,
    emissionAggregateHandler,
}