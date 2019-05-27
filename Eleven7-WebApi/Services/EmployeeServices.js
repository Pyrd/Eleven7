var db = require('../dbContext');
var services_auth = require('./AuthServices')

const bcrypt = require('bcrypt');
/*TO ADD
Delete functions
Select working employees (no end date)
Select not working employees (with end date)

*/

var selectByID = function(res, val){            
    var q = 'SELECT * FROM employees WHERE employee_id = ' +val;
    var res = db.queryExec(res, q);
    return res;
  }

var selectByEmail = function(res, val){            
    var q = 'SELECT * FROM employees WHERE email_address = ' +val;
    var res = db.queryExec(res, q);
    return res;
}

var selectByFirstName = function(res, val){            
  var q = 'SELECT * FROM employees WHERE first_name = ' +val;
  var res = db.queryExec(res, q);
  return res;
}

var selectByLastName = function(res, val){            
  var q = 'SELECT * FROM employees WHERE last_name = ' +val;
  var res = db.queryExec(res, q);
  return res;
}

var selectAllEmployees = function(res){            
  var q = 'SELECT * FROM employees';
  var res = db.queryExec(res, q);
  return res;
}
/*
TOFINISH
add salary and stuff like this
INSERT INTO employees (first_name, last_name, birthdate, email_address, phone_number) values('${req.first_name}','${req.last_name}','${req.birthdate}','${req.email_address}','${req.phone_number}');INSERT INTO users values((SELECT employee_id FROM employees WHERE email_address = '${req.email_address}'), '${req.password}')
*/
var insertEmployee = function(res, req){
    let encryptedPass = bcrypt.hashSync(req.password, 12);
    //console.log(encryptedPass)      
    var q = `INSERT INTO addresses (street_num, address_1, address_2, zip_code, city_name, country) values('${req.street_num}','${req.address_1}','${req.address_2}','${req.zip_code}','${req.city_name}','${req.country}'); INSERT INTO employees (store_id, first_name, last_name, birthdate, email_address, phone_number, address_id, salary, job_level, job) values('${req.store_id}', '${req.first_name}','${req.last_name}','${req.birthdate}','${req.email_address}','${req.phone_number}', (SELECT address_id FROM addresses WHERE address_id = SCOPE_IDENTITY()), '${req.salary}',${req.job_level},'${req.job}');INSERT INTO users values((SELECT employee_id FROM employees WHERE employee_id = SCOPE_IDENTITY()), '${req.password}')`;
    db.queryExec(res, q);
    return res;
}

var searchEmployee = function(res, req){
  var q = `SELECT * FROM employees WHERE`
  var separator = (req.separator ? 'AND' : 'OR')
  var t = false;
  for(var i = 0; i < req.filters.length; i++){
    if(req.filters[i].mask != ''){
      
      let tmp = `(${req.filters[i].name} like '%${req.filters[i].mask}%')`
      if(t) q+= separator
      q += tmp
      if(!t) t = true;
    }
  }
  console.log(q)
  db.queryExec(res, q);
}

var updateEmployee = function(res, req){
    var q = `UPDATE employees SET first_name = '${req.first_name}', last_name= '${req.last_name}', birthdate= '${req.birthdate}', phone_number= '${req.phone_number}', email_address= '${req.email_address}' WHERE employee_id = ${req.employee_id};UPDATE addresses SET street_num='${req.street_num}', address_1='${req.address_1}', address_2='${req.address_2}', zip_code='${req.zip_code}', city_name='${req.city_name}', country='${req.country}' WHERE address_id = '${req.address_id}';`
    console.log(q)

    db.queryExec(res, q, (err, result)=> {if(err){res.status(401).send("Somethind bad happen")} else {res.status(200).send("User Successfully modified")}});
}


module.exports = {
  selectByEmail : selectByEmail,
  selectAllEmployees: selectAllEmployees,
  selectByID : selectByID,
  selectByFirstName: selectByFirstName,
  selectByLastName : selectByLastName,
  insertEmployee: insertEmployee,
  updateEmployee : updateEmployee,
  searchEmployee : searchEmployee
}