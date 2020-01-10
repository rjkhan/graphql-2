class UndergraduateCourses {
	constructor(args) {
	  // Fields
		debugger;
		args = JSON.parse(JSON.stringify(args))
		this.id = args.nr;
		this.teacher = args.teacher;
		this.teachingassistant = args.teachingassistant;

	}


  }


  module.exports = UndergraduateCourses;