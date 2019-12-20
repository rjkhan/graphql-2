


const { ApolloServer } = require("apollo-server");


//const typeDefs = require('./scheme');
const resolvers = require("./resolver");
const typeDefs = require("./typeDefs");
//const con = require("./db_connect");
//const { GraphQLScalarType } = require('graphql');
//const { Kind } = require('graphql/language');




const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`);
});



