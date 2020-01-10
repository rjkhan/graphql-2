const con = require("../database/db");
var rp = require('request-promise');

const Fa = require("../model/faculty");
const RG = require("../model/researchGroup");
const University = require("../model/university");
const Lecturer = require("../model/lecturer");
const GraduateCourse = require("../model/graduatecourse");
const GraduateStudent = require("../model/graduatestudent");
const UndergraduateCourses = require('../model/undergraduatecourse.js');

const resolvers = {
		
	Faculty:{
		__resolveType:(parent, context, info) => {
			
			if(parent.position)
			{
				return "Lecturer"
			}

			if(parent.researchInterest)
			{
				return "Professor"
			}

			return null;
		}
			
		},
		Professor:{
			__resolveType(obj,context,info)
			{
				console.log("obj:",obj);
				return null;
			}
		},
		Author:{
			__resolveType(obj,context,info)
			{
				
				return null
			}
		},
		Query: {
			
			faculty:( _ , {nr} ) =>{
				
				let query = con.select().from("faculty").where('nr',parseInt(nr));
				return  query.then(rows => new Fa(rows[0]))
			},
			researchGroup:(_,{nr} ) => {
				
				let query = con.select().from('researchgroup').where('nr',nr);
				return query.then(rows => new RG(rows[0]))
			}
			
		},
		Lecturer:{
			teacherOfGraduateCourses(parent, args, context, info)
			{
				let query = con.select().from('graduatecourse').where('teacher',parent.id);
				let result = query.then(rows => rows.map(row => new GraduateCourse(row)));
				return result;
			},
			teacherOfUndergraduateCourses(parent, args, context, info){
				debugger;
				let query = con.select().from('undergraduatecourse').where('teacher',parent.id);
				let result = query.then(rows => rows.map(row => new UndergraduateCourses(row)));
				return result;
			}
			
			
		},
		GraduateCourse:{
			teachedby(parent, args, context, info){
				debugger;
				let query = con.select().from("faculty").where('nr',parent.teacher);
				return  query.then(rows => new Fa(rows[0]))
			},
			graduateStudents(parent, args, context, info){
				debugger;
				let query = con.select().from('faculty').innerJoin('graduatestudent', 'graduatestudent.undergraduatedegreefrom', '=', 'faculty.undergraduatedegreefrom').where('faculty.nr',parent.teacher);
				let result = query.then(rows => rows.map(row => new GraduateStudent(row)));
				return result;
			}
		},
		UndergraduateCourse:{
			teachedby(parent, args, context, info){
				debugger;
				let query = con.select().from("faculty").where('nr',parent.teacher);
				return  query.then(rows => new Fa(rows[0]))
			},
			undergraduateStudents(parent, args, context, info){
				debugger;
				let query = con.select().from('undergraduatecourse').where('teacher',parent.id);
				let result = query.then(rows => rows.map(row => new UndergraduateCourses(row)));
				return result;
			}
			
		}
		
	};


module.exports = resolvers;