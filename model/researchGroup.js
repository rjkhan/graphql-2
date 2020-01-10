class RG {
	constructor(args) {
		// Fields
		debugger
		args = JSON.parse(JSON.stringify(args))
		this.id = args.nr;
		this.subOrganizationOf = args.subOrganizationOf;
	}


  }


  module.exports = RG;