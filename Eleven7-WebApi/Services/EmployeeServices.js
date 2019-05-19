var db = require('../dbContext');
var services_auth = require('./AuthServices')


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
*/
var insertEmployee = function(res, req){            
    var q = `INSERT INTO employees (first_name, last_name, birthdate, email_address, phone_number) values('${req.first_name}','${req.last_name}','${req.birthdate}','${req.email_address}','${req.phone_number}');INSERT INTO users values((SELECT employee_id FROM employees WHERE email_address = '${req.email_address}'), '${req.password}', ${req.is_admin} )`;
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