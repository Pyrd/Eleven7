var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var db = require('../dbContext');
var service_address = require('./../services/AddressServices');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


router.get("/address/:id", function(req , res){
    //console.log(req.params.id)
    let id = req.params.id;
    service_address.selectByID(res, id)
});

router.get("/address/zip/:zip", function(req , res){
    //console.log(req.params.zip)
    let zip= req.params.zip;
    service_address.selectByID(res, zip)
});

router.get("/address/city/:city", function(req , res){
    //console.log(req.params.city);
    let city = req.params.city;
    service_address.selectByZipcode(res, city)
});

router.get("/address", function(req , res){
    //console.log(req.params.id)
    let id = req.params.id;
    service_address.selectAllAddresses(res, id)
});






module.exports = router;