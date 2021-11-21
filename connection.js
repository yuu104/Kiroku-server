const mysql = require("mysql");
require("dotenv").config();

// const db = mysql.createPool({
//   host: process.env.LOCAL_DB_HOST,
//   user: process.env.LOCAL_DB_USER,
//   password: process.env.LOCAL_DB_PASSWORD,
//   database: process.env.LOCAL_DB
// });

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB
});

// db.connect(function(err) {
//   if (err) {
//     console.error('error connecting: ' + err.stack);
//     return;
//   }

//   console.log('connected as id ' + db.threadId);
// });


module.exports = db;