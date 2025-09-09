const { createPool } = require("mysql2/promise");

const connectionString = process.env.MYSQL_URL || `mysql://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}/${process.env.DATABASE}`;

const connected = createPool({
  uri: connectionString, 
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