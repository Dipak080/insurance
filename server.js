require("dotenv").config({ path: './utils/.env' });
const express = require("express");
const app = express();
const authrouter = require('./router/auth-router');
const carrouter = require('./router/car-router');
const errorMiddleware = require("./middlewares/error-middleware");
const connectDb = require("./utils/db");
app.use(express.json());
app.use("/api/auth",authrouter);
app.use("/api/car",carrouter);
app.use(errorMiddleware);
const PORT = 5000;
connectDb().then(()=>{
    app.listen(PORT,()=>{
        console.log(`'server is running  at port : ' ${PORT}`);
    });
});
