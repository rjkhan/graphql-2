class Emp {
	constructor(args) {
	  // Fields
	  debugger;
	  args = JSON.parse(JSON.stringify(args))
	  this.emp_no = args.emp_no;
	  this.birth_date = args.birth_date;
	  this.first_name = args.first_name;
	  this.last_name = args.last_name;
	  this.gender = args.gender;
	  this.hire_date = args.hire_date;

	}


  }


  module.exports = Emp