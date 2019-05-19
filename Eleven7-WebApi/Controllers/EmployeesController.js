var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var db = require('./../dbContext');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


//GET API
router.get("/employees", function(req , res){
    let q = "select * from employees"
    db.queryExec(res, q);
    
});

router.get("/employees/:id", function(req , res){
    console.log(req.params.id)
    let id = req.params.id;
    let q = `select * from employees WHERE employee_id = ${id}`
    db.queryExec(res, q);
});



module.exports = router;