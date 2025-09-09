const { createPool } = require('mysql2/promise');
const connectionConfig = process.env.DATABASE_URL 
    ? { uri: process.env.DATABASE_URL } 
    : {
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    };

const connected = createPool(connectionConfig);

connected.getConnection()
    .then(connection => {
        console.log('✅ MySQL Database connected successfully');
        connection.release();
    })
    .catch(error => {
        console.error('❌ MySQL Database connection failed:', error.message);
    });

module.exports = connected;