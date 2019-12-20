const { gql } = require("apollo-server");


const typeDefs = gql`

	scalar Date
	type Employees
	{
		emp_no: ID!,
		birth_date: Date,
		first_name: String,
		last_name: String,
		gender: String,
		hire_date: Date
	}


	type Query {
		getEmployee(emp_no: ID!): Employees
		getAllEmployee: [Employees]
	}




`;



module.exports = typeDefs;