const { createPool } = require('mysql2/promise');

// กำหนดค่า Config แยกออกมาเพื่อให้โค้ดอ่านง่ายขึ้น
const connectionConfig = process.env.DATABASE_URL 
    ? { 
        uri: process.env.DATABASE_URL,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0 
      } 
    : { 
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
      };

let connected; // ประกาศตัวแปร pool ไว้ข้างนอก

try {
    // สร้าง Connection Pool
    connected = createPool(connectionConfig);

    // ตรวจสอบการเชื่อมต่อครั้งแรกเมื่อเซิร์ฟเวอร์เริ่มทำงาน
    connected.getConnection()
        .then(connection => {
            console.log('✅ MySQL Database connected successfully on startup.');
            connection.release();
        })
        .catch(err => {
            console.error('❌ Initial MySQL Database connection failed:', err);
        });

    // (สำคัญ) เพิ่ม Event Listener เพื่อดักจับ Error ที่อาจเกิดขึ้นกับ Pool ในภายหลัง
    // การมีส่วนนี้จะช่วยป้องกันไม่ให้เซิร์ฟเวอร์ล่มเมื่อการเชื่อมต่อขาดไป
    connected.on('error', (err) => {
        console.error('❌ Database pool error:', err);
    });

} catch (err) {
    console.error('❌ Failed to create database pool:', err);
    // ถ้าสร้าง pool ไม่ได้เลย ควรจะให้แอปพลิเคชันหยุดทำงานไปเลย
    process.exit(1); 
}

// (สำคัญ) เพิ่ม "ตาข่ายนิรภัย" เพื่อดักจับ Error ที่ไม่คาดคิดทั่วทั้งแอปพลิเคชัน
// ป้องกันไม่ให้เซิร์ฟเวอร์ล่มจาก Unhandled Promise Rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// ส่งออก pool ที่สร้างขึ้น เพื่อให้ส่วนอื่นของแอปนำไปใช้
module.exports = connected;