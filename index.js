///dotenv use to include .env file which is created on root file
require('dotenv').config();

const { ApolloServer } = require("apollo-server");


//const typeDefs = require('./scheme');
const resolvers = require("./resolver");
const typeDefs = require("./typeDefs");
//const con = require("./db_connect");
//const { GraphQLScalarType } = require('graphql');
//const { Kind } = require('graphql/language');

// const con = require("./database/db");


// var query = con.select().from('faculty');
// query.then(function(row) { 
// 	console.log(row); 
// });



const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`);
});



