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


var con = require('knex')({
  client: 'mysql',
  version: '5.7',
  connection: {
    host : 'Rabnawazs-MacBook-Pro.local',
    user : 'root',
    password : 'root',
    database : 'pp'
  }
});
if (con)
  console.log("Connected!");

module.exports = con