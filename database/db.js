// var mysql = require('mysql');

// var con = mysql.createConnection({
//   host: "Rabnawazs-MacBook-Pro.local",
//   user: "root",
//   password: "root",
//   database:  'pp'
// });

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });


// module.exports = con;

var connectioString = process.env.PG_CONNECTION_STRING;
var con = require('knex')({
  client: 'pg',
  connection: connectioString,
  searchPath: ['knex', 'public'],
});




if (con)
  console.log("Connected!");
else
  console.log("Database not connected! Connection Error");

module.exports = con