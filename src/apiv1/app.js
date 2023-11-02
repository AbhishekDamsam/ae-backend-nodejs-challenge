const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const app = express();
//const initializeRoutes = require('./routes-init');
const responseLogger = require('./middlewares/responseLogger');
const errorLogger = require('./middlewares/errorLogger');
const setHeaders = require('./middlewares/setHeaders');
const logger = require('./logger').Logger;
const emissionRoutes = require('./routes/emission-route').emissionRoutes;


const createServer = async function () {
    //support of application/json type post data
    app.use(bodyParser.json());
    //support of application/x-www-form-urlencoded post data
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cors())
    app.use(helmet())
    app.use(setHeaders);
    app.use(responseLogger(logger));
    app.use("/health", (req, res) => {
        res.send("Hello World")
    })

    emissionRoutes(app);

    // Must register error logger after all routes init
    app.use(errorLogger(logger));
    return app;
}

module.exports = createServer;