const { Pool } = require("pg");

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

db.connect()
  .then(() => console.log("PostgreSQL (Neon) Connected"))
  .catch((err) => console.error("Database error:", err));

module.exports = db;
