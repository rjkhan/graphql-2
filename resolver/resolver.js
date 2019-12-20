const con = require("../database/db");
var rp = require('request-promise');


const Emp = require("../model/model");

const resolvers = {
	
		Query: {
				
			getEmployee:(_,{emp_no}) => {
				let query = con.select().from("employees").where("emp_no",emp_no);

				return  query.then(rows => new Emp(rows[0]));
			},
			getAllEmployee: () => {
				let query = con.select().from("employees").limit(10);

				return query.then(rows => rows.map(row => new Emp(row)));
			}
				
		},
	};


module.exports = resolvers;