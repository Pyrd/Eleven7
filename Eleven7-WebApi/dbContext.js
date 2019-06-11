var DbConnectionString = require('./config').DbConnectionString;

var sql = require('mssql');

var connection = sql.connect(DbConnectionString, function(err) {
	if (err) throw err;
});
var executeQuery = function(res, query, callback) {
	var request = new sql.Request();
	request.query(query, function(err, result) {
		if (err) {
			console.log('Error while querying database :- ' + err);
			if (callback) {
				callback(err, null);
			} else {
				res.send(err);
			}
		} else {
			//console.log("Query : " +query)
			console.log(result.recordset);

			if (callback) {
				callback(null, result.recordset);
			} else {
				res.send(result.recordset);
			}
		}
	});
	console.log('###########################################');
};

var executeQuery2 = function(res, query, callback) {
	sql.connect(DbConnectionString, function(err) {
		if (err) {
			console.log('Error while connecting database :- ' + err);
			if (callback) {
				callback(err, null);
				sql.close();
			} else {
				res.send(err);
			}
			sql.close();
			return;
		} else {
			var request = new sql.Request();
			request.query(query, function(err, result) {
				if (err) {
					console.log('Error while querying database :- ' + err);
					if (callback) {
						callback(err, null);
						sql.close();
					} else {
						res.send(err);
					}
					sql.close();
				} else {
					//console.log("Query : " +query)
					console.log(result.recordset);

					if (callback) {
						callback(null, result.recordset);
						sql.close();
					} else {
						res.send(result.recordset);
					}
					sql.close();
				}
			});
		}
	});
	console.log('###########################################');
};

module.exports.queryExec = executeQuery;
