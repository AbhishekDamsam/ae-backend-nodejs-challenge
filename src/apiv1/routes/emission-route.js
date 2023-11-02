
const { emissionFilterHandler, emissionAggregateHandler } = require("../handlers/emission-handler")

//apiv1 can be moved to a common place while registering all routes
const emissionRoutes = function(app){
    app.get("/apiv1/filter/:gasname", emissionFilterHandler);
    app.get("/apiv1/aggregate/:gasname", emissionAggregateHandler);
}

// We can have a index.js inside routes folder which contains different routes/ resources.
// From index.js file we can export all routes from multiple js files.
module.exports = {
    emissionRoutes
}