var db = require('../dbContext');


var selectByID = function(res, val){            
    var q = 'SELECT * FROM addresses WHERE address_id = ' +val;
    var res = db.queryExec(res, q);
    return res;
  }

var selectByZipcode = function(res, val){            
    var q = 'SELECT * FROM addresses WHERE email_zip_code = ' +val;
    var res = db.queryExec(res, q);
    return res;
}

var selectByCityname = function(res, val){            
  var q = 'SELECT * FROM addresses WHERE city_name = ' +val;
  var res = db.queryExec(res, q);
  return res;
}

var selectByCountry = function(res, val){            
  var q = 'SELECT * FROM addresses WHERE country = ' +val;
  var res = db.queryExec(res, q);
  return res;
}

var selectAllAddresses = function(res){            
  var q = 'SELECT * FROM addresses';
  var res = db.queryExec(res, q);
  return res;
}
/*
TOFINISH
add salary and stuff like this
*/
var insertAddress = function(res, req){            
    var q = `INSERT INTO addresses (street_num, address_1, address_2, zip_code, city_name, country) values('${req.street_num}','${req.address_1}','${req.address_2}','${req.zip_code}','${req.city_name}' '${country}'); SELECT address_id FROM addresses WHERE address_id = SCOPE_IDENTITY()`;
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
  selectByID : selectByID,
  selectByZipcode: selectByZipcode,
  selectByCityname : selectByCityname,
  selectByCountry: selectByCountry,
  selectAllAddresses : selectAllAddresses
}