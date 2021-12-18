const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");


//handling uncaught exception
process.on("uncaughtException", (err) => {
    console.log(`error: ${err.message}`);
    console.log(`shutting down the server due to unhandled promise rejection`);
    process.exit(1);
})

//config
dotenv.config({ path: "backend/config/config.env" });

//connecting to database
connectDatabase();

app.listen(process.env.PORT, () => {
    console.log(`server is working on https://localhost:${process.env.PORT}`);
})


//unhandled Promise rejection
process.on("unhandledRejection", err => {
    console.log(`error: ${err.message}`);
    console.log(`shutting down the server`);

    server.close(() => {
        process.exit(1);
    })
})