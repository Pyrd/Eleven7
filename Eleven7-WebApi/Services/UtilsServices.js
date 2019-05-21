var db = require('../dbContext');
var queries = require('../dbResetQueries')


var resetDB = function(res){
    console.log("#########RESETING DATABASE##########")      
    var q = queries.CREATE_DB;
    console.log(q)
    db.queryExec(res, q);
    return res;
}

var insertDB = function(res){
    console.log("#########INSERTING FALSE VAL IN DATABASE##########")      
    var q = queries.INSERT_DB;
    console.log(q)
    db.queryExec(res, q);
    return res;
}


module.exports = {
  insertDB : insertDB,
  resetDB: resetDB,
}