class GraduateStudent {
	constructor(args) {
	  // Fields
	  debugger;
	  args = JSON.parse(JSON.stringify(args))
        this.id = args.nr;
        this.age = args.age;
        this.doctoraldegreefrom = args.doctoraldegreefrom;
        this.emailAddress = args.emailaddress
        this.memberof = args.memberof;
        this.undergraduatedegreefrom = args.undergraduatedegreefrom;
        this.worksfor = args.worksfor;
	  
	}


  }


  module.exports = GraduateStudent