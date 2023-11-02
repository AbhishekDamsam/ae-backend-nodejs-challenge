const server = require('./src/apiv1/app');

// We can make use of dotenv npm store all important keys in .env file
const PORT = 3000;

process.on('unhandledRejection', (err) => {
    process.exit(1);
});

process.on('uncaughtException', function(err) {
    console.error(err)
})

const start = async function () {
    const app = await server();
    app.listen(process.env.PORT || PORT, function () {
        //To display in terminal for developers
        console.log(`Express server listening on port http://localhost:${PORT}`);
    });
}

start();