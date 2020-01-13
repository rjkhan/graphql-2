const con = require("../database/db");
var rp = require('request-promise');

const Fa = require("../model/faculty");
const RG = require("../model/researchGroup");
const University = require("../model/university");
const Lecturer = require("../model/lecturer");
const GraduateCourse = require("../model/graduatecourse");
const GraduateStudent = require("../model/graduatestudent");
const UndergraduateCourses = require('../model/undergraduatecourse');
const UndergraduateStudent = require('../model/undergraduatestudent');
const Publication = require('../model/publication');
const Author = require('../model/author');
const Department = require('../model/department');

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
			__resolveType(parent, context, info)
			{
				debugger;
				if(parent.position)
				{
					return "Lecturer";
				}

				if(parent.researchInterest)
				{
					return "Professor";
				}

				if(parent.assistCourses)
				{
					return "GraduateStudent";
				}
				
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
			},
			university(_,{nr}){
				let query = con.select().from('university').where('nr',parseInt(nr));
				let result = query.then(rows => new University(rows[0]));
				return result;
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
				let query = con.select().from('undergraduatecourse').where('teacher',parent.id);
				let result = query.then(rows => rows.map(row => new UndergraduateCourses(row)));
				return result;
			},
			publications(parent, args, context, info){
				debugger;
				let query = con.select().from('publication').where('mainauthor',parent.id);
				let result = query.then(rows => rows.map(row => new Publication(row)));
				return result;
			},
			undergraduteDegreeFrom(parent, args, context, info){
				
				let query = con.select().from('university').where('nr',parent.undergraduteDegreeFrom);
				let result = query.then(rows => new University(rows[0]));
				return result;
			},
			masterDegreeFrom(parent, args, context, info){
				
				let query = con.select().from('university').where('nr',parent.masterDegreeFrom);
				let result = query.then(rows => new University(rows[0]));
				return result;
			},
			doctoralDegreeFrom(parent, args, context, info){
				debugger;
				let query = con.select().from('university').where('nr',parent.doctoralDegreeFrom);
				let result = query.then(rows => new University(rows[0]));
				return result;
			},
			worksFor(parent, args, context, info){
				debugger;
				let query = con.select().from('department').where('nr',parent.worksFor);
				let result = query.then(rows => new Department(rows[0]));
				return result;
			}
			
			
			

			
			
		},
		GraduateCourse:{
			teachedby(parent, args, context, info){
				let query = con.select().from("faculty").where('nr',parent.teacher);
				return  query.then(rows => new Fa(rows[0]))
			},
			graduateStudents(parent, args, context, info){
				let query = con.select().from('faculty').innerJoin('graduatestudent', 'graduatestudent.undergraduatedegreefrom', '=', 'faculty.undergraduatedegreefrom').where('faculty.nr',parent.teacher);
				let result = query.then(rows => rows.map(row => new GraduateStudent(row)));
				return result;
			}
		},
		UndergraduateCourse:{
			teachedby(parent, args, context, info){
				let query = con.select().from("faculty").where('nr',parent.teacher);
				return  query.then(rows => new Fa(rows[0]))
			},
			undergraduateStudents(parent, args, context, info){
				let query = con.select().from('faculty').where('nr',parent.teacher);
				return  query.then(rows => rows.map(row => new Fa(row)));
			
			},
			teachingAssistants(parent, args, context, info){
				let query = con.select().from('undergraduatestudent').where('nr',parent.teachingassistant);
				let result =  query.then(rows => new UndergraduateStudent(rows[0]))
				return result;
			}

			
		},
		Publication:{
			authors(parent, args, context, info){
				
				//let query = con.select().from('faculty').innerJoin('professor', 'professor.nr', '=', 'faculty.nr').innerJoin('lecturer','lecturer.nr','=','faculty.nr').innerJoin('graduatestudent','graduatestudent.advisor','=','professor.nr').where('faculty.nr',parent.mainauthor);
				let query = con.select().from('faculty').innerJoin('professor', 'professor.nr', '=', 'faculty.nr').where('faculty.nr',parent.mainauthor);
				let result = query.then(rows => rows.map(row => new Author(row)));
				return result;
			}
		},
		University:{
			undergraduateDegreeObtainedByFaculty(parent, args, context, info){
				
				let query = con.select().from('faculty').where('undergraduatedegreefrom',parent.id);
				let result = query.then(rows => rows.map(row => new Fa(row)));
				return result;
			},
			mastergraduateDegreeObtainers(parent, args, context, info){
				let query = con.select().from('faculty').where('masterdegreefrom',parent.id);
				let result = query.then(rows => rows.map(row => new Fa(row)));
				return result;
			},
			doctoralDegreeObtainers(parent,{where}){
				let query = con.select().from('faculty').where('doctoraldegreefrom',parent.id).andWhere('worksfor',parseInt(where.worksFor.nr));
				let result = query.then(rows => rows.map(row => new Fa(row)));
				return result;
			},
			undergraduateDegreeObtainedBystudent(parent,{ where , limit , offset }){
				debugger;
				
				
				let query = con.select().from('graduatestudent').where('undergraduatedegreefrom',parent.id);
				let result = query.then(rows => rows.map(row => new GraduateStudent(row)));
				return result;
			}

		},
		Department:{

		}
		

		
	};


module.exports = resolvers;