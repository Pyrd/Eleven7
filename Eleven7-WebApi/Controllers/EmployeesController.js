var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var db = require('./../dbContext');
var service_employee = require('./../services/EmployeeServices');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


//GET API
router.get("/employees", function(req , res){
    let q = "select * from employees"
    db.queryExec(res, q);
    
});

router.get("/employees/:id", function(req , res){
    let id = req.params.id;
    let q = `select employee_id, store_id, first_name, last_name, birthdate, email_address, phone_number, E.address_id , salary, photo_id, job, job_level, date_start, date_end, street_num, address_1, address_2, zip_code, city_name, country from (employees as E FULL JOIN addresses AS A ON E.address_id = A.address_id) WHERE employee_id = ${id}`
    db.queryExec(res, q);
});

router.get("/employees/store/:id", function(req , res){
    let id = req.params.id;
    let q = `select * from employees WHERE store_id = ${id}`
    db.queryExec(res, q);
});

router.post("/employees/edit", function(req , res){
    service_employee.updateEmployee(res, req.body);
});

router.post("/employees/search", function(req , res){
    service_employee.searchEmployee(res, req.body);
});




module.exports = router;