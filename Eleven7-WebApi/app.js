var express = require('express');
var app = express();
var db = require('./dbContext');

const bodyParser = require('body-parser')  


app.use(bodyParser.json())


// CORS middleware
const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
    next();
}


app.use(allowCrossDomain)





var AuthController = require('./Controllers/AuthController');
app.use('/auth', AuthController);
var EmployeeController = require('./Controllers/EmployeesController');
app.use('/api', EmployeeController);
var AddressController = require('./Controllers/AddressController');
app.use('/api', AddressController);
var StoreController = require('./Controllers/StoreController');
app.use('/api', StoreController);
var StockController = require('./Controllers/StockController');
app.use('/api', StockController);






// route for handling 404 requests(unavailable routes)
app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
});

module.exports = app;