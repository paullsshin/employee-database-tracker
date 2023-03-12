const mysql = require("mysql2");

const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "password",
    // MySQL database
    database: "employee_db",
  },
  console.log(`Connected to the database.`)
);

module.exports = db;