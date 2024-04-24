require("dotenv").config({ path: './utils/.env' });
const express = require("express");
const cors = require("cors");
const app = express();
const authrouter = require('./router/auth-router');
const carrouter = require('./router/car-router');
const cityrouter = require('./router/city-router');
const errorMiddleware = require("./middlewares/error-middleware");
const connectDb = require("./utils/db");
app.use(cors());
app.use(express.json());
app.use("/api/auth",authrouter);
app.use("/api/car",carrouter);
app.use("/api/city",cityrouter);
app.use(errorMiddleware);
const PORT = 5000;
app.get('/', (req, res) => {
    // Get the hostname of the incoming request
    const hostname = req.hostname;
  
    res.send(`Hostname: ${hostname}`);
  });
connectDb().then(()=>{
    app.listen(PORT,()=>{
        console.log(`'server is running  at port : ' ${PORT}`);
    });
});
