const { createPool } = require("mysql2/promise");

const connected = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

connected
  .getConnection()
  .then((connection) => {
    console.log("✅ MySQL Database connected successfully");
    connection.release();
  })
  .catch((error) => {
    console.error("❌ MySQL Database connection failed:", error.message);
  });

module.exports = connected;
