var db = require('../dbContext');
var services_auth = require('./AuthServices')

const bcrypt = require('bcrypt');
/*TO ADD
Delete functions
Select working employees (no end date)
Select not working employees (with end date)

*/

var selectByID = function(val){            
    var q = 'SELECT * FROM employees WHERE employee_id = ' +val;
    var res = db.queryRet(q);
    return res;
  }

var selectByEmail = function(val){            
    var q = 'SELECT * FROM employees WHERE email_address = ' +val;
    var res = db.queryRet(q);
    return res;
}

var selectByFirstName = function(val){            
  var q = 'SELECT * FROM employees WHERE first_name = ' +val;
  var res = db.queryRet(q);
  return res;
}

var selectByLastName = function(val){            
  var q = 'SELECT * FROM employees WHERE last_name = ' +val;
  var res = db.queryRet(q);
  return res;
}

var selectAllEmployees = function(){            
  var q = 'SELECT * FROM employees';
  var res = db.queryRet(q);
  return res;
}
/*
TOFINISH
add salary and stuff like this
INSERT INTO employees (first_name, last_name, birthdate, email_address, phone_number) values('${req.first_name}','${req.last_name}','${req.birthdate}','${req.email_address}','${req.phone_number}');INSERT INTO users values((SELECT employee_id FROM employees WHERE email_address = '${req.email_address}'), '${req.password}')
*/
var insertEmployee = function(res, req){
    let encryptedPass = bcrypt.hashSync(req.password, 12);
    console.log(encryptedPass)      
    var q = `INSERT INTO addresses (street_num, address_1, address_2, zip_code, city_name, country) values('${req.street_num}','${req.address_1}','${req.address_2}','${req.zip_code}','${req.city_name}','${req.country}'); INSERT INTO employees (store_id, first_name, last_name, birthdate, email_address, phone_number, address_id, salary, job_level, job) values('${req.store_id}', '${req.first_name}','${req.last_name}','${req.birthdate}','${req.email_address}','${req.phone_number}', (SELECT address_id FROM addresses WHERE address_id = SCOPE_IDENTITY()), '${req.salary}',${req.job_level},'${req.job}');INSERT INTO users values((SELECT employee_id FROM employees WHERE employee_id = SCOPE_IDENTITY()), '${req.password}')`;
    console.log(q)
    db.queryExec(res, q);
    return res;
}

/*
cols should be array of cols to update
vals should be array of corresponding new vals

proto : 
{
  id : id,
  
}
*/
var updateEmployee = function(res, req){
    var cols = req.cols;
    var vals = req.vals;
    var id = req.id;
    var q = ""
}


module.exports = {
  selectByEmail : selectByEmail,
  selectAllEmployees: selectAllEmployees,
  selectByID : selectByID,
  selectByFirstName: selectByFirstName,
  selectByLastName : selectByLastName,
  insertEmployee: insertEmployee
}