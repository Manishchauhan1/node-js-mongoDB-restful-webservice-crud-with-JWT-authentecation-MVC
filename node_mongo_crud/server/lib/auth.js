var Employee = require('../models/employee.js');
var User=require('../models/user.js');


var funcs = {};

funcs.verifyToken = function(decoded, request, callback) {

	if (decoded._id) {
				//console.log(decoded._id);
				var id = decoded._id;
					User.findOne({
						'_id': id
						}, function(err, user) {
							if (err || !user) {
								
								Employee.findById(id, function(err, employee) {
									//console.log(employee);
						 		if (err || !employee) {
						 				callback(null, false);
						 			} else {
						 				request.employee = employee;
						 				callback(null, true);
						 			}
						 		});
							
							} else {
								request.user = user;
								callback(null, true);
							}
						});
		}};

module.exports = funcs;
