var db = require('./../dbContext');
var config = require('./../config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');


var login = function(res, req){
  let email = req.email_address;
  let checkPass = req.password;
  let q = `SELECT U.employee_id, U.password, E.email_address FROM (users as U FULL OUTER JOIN employees AS E ON E.employee_id = U.employee_id) WHERE U.employee_id = (SELECT employee_id FROM employees WHERE email_address = '${email}');`
  db.queryExec(res, q, (err, output) =>{
    if(err)
        return res.status(500).send("Error on the server");
    if(!output || output == [] || output.length < 1 )
        return res.status(405).send("Email address is invalid");
    let passwordValid = checkPass == output[0].password;   //use bcrypt.compareSync
    console.log("Password valid :" + passwordValid);
    if(!passwordValid)
        return res.status(404).send("Password is invalid")      //.send({ auth: false, token: null });
    let body = {employee_id:output[0].employee_id, email_address : output[0].email_address}
    let token = jwt.sign({ id: output[0].employee_id }, config.secretKey, { expiresIn: 86400});
    res.status(200).send({auth: true, token: token, user: body})
  });
}

var checkTokenReq = function(res, req){
    let token = req.token;
    jwt.verify(token, config.secretKey, function(err, verifiedJwt){
        if(err){
            console.log("Token is not valid");
            return res.status(200).send({valid:false});
        }else{
            console.log("Token is valid");
            return res.status(200).send({valid:true})
        }
    })
}

var checkToken = function(token){
    jwt.verify(token, config.secretKey, function(err, verifiedJwt){
        if(err){
            console.log("Token is not valid");
            return false;
        }else{
            console.log("Token is valid");
            return true;
        }
    })
}



module.exports = {
    login: login,
    checkTokenReq: checkTokenReq,
    checkToken: checkToken
}