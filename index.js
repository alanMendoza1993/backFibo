
////
const express = require('express')
const app = express()
const routes = require('./routes/routes');
var bodyParser = require('body-parser');
const mongoConnect = require("./utils/mongoConnect");
mongoConnect();

// parse application/json
app.use(bodyParser.json())
app.use(routes);
app.listen(3000,()=>{
    console.log(`Run server on port: 3000`)
})