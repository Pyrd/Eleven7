const express = require('express');
const router = express.Router();

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');
const bodyParser = require('body-parser');
var service_employee = require('./../services/EmployeeServices');
var service_auth = require('./../services/AuthServices');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


// router.post('/register-admin', function(req, res) {
//     var res = service_auth.insertAdmin(req.body.username, bcrypt.hashSync(req.body.password, 8));
//     if(res.err){
//         return res.status(500).send("There was a problem registering the user.")
//     } else {
//         var user = service_auth.selectByID(req.body.username)
//         let token = jwt.sign({ id: user.emloyee_id }, config.secretKey, { expiresIn: 86400 });
//         res.status(200).send({ auth: true, token: token, user: user });
//     }
// });

router.post('/register', function(req, res) {
    console.log("registering new employye :");
    console.log(req.body)
    console.log("#######################")
    let r = req.body;
    service_employee.insertEmployee(res, r);

});

router.post('/login', function(req, res) {
    console.log("Login ...");
    console.log(req.body)
    console.log("#######################")
    service_auth.login(res, req.body);
});

router.post('/check', function(req, res) {
    console.log("Check ...");
    console.log(req.body)
    console.log("#######################")
    service_auth.checkTokenReq(res, req.body);
});

module.exports = router;
