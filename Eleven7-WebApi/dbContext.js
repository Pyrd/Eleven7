var DbConnectionString = require('./config').DbConnectionString

var sql = require("mssql");

var executeQuery = function(res, query, callback){            
  sql.connect(DbConnectionString, function (err) {
      if (err) {   
        console.log("Error while connecting database :- " + err);
        if(callback){
          callback(err,null);
        }else{
          res.send(err);
        }
        sql.close()
        return;
      } else {
        var request = new sql.Request();
        request.query(query, function (err, result) {
          if (err) {
            console.log("Error while querying database :- " + err);
            if(callback){
              callback(err, null);
            }else{
              res.send(err);
            }
            sql.close()
          } else {
            console.log("Query : " +query)
            console.log(result.recordset);
            console.log("###########################################")
            if(callback){
              callback(null, result.recordset);
            } else {
              res.send(result.recordset);
            }
            sql.close()
          }
        });
      }
   });           
}

module.exports.queryExec = executeQuery;
