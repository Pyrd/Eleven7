var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var db = require('./../dbContext');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


//GET API
router.get("/stores", function(req , res){
    let q = "select * from stores"
    db.queryExec(res, q);
    
});

router.get("/stores/:id", function(req , res){
    let id = req.params.id;
    let q = `select * from employees WHERE store_id = ${id}`
    db.queryExec(res, q);
});

/*
*   Add new store (with inventory & address)
*   Edit, update store (given id)
*   Edit inventory()
*   

*/


module.exports = router;