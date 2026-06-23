const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "",
  database: "laposte_db",
});

db.connect((err) => {
  if (err) {
    console.log("Database error:", err);
  } else {
    console.log("MySQL Connected");
  }
});

module.exports = db;