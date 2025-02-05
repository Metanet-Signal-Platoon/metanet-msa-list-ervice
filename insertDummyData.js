// insertDummyData.js
const mysql = require('mysql2/promise');

async function insertDummyData() {
  // 환경변수나 기본값을 사용하여 DB 접속 정보 설정
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
    user: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'my-secret-pw',
    database: process.env.DB_DATABASE || 'test_db',
  });

  try {
    // 테이블 생성 쿼리 (이미 존재하면 무시)
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS real_estate (
        id INT AUTO_INCREMENT PRIMARY KEY,
        price DECIMAL(10,2) NOT NULL,
        additionalInfo VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        brokerName VARCHAR(100) NOT NULL,
        phoneNumber VARCHAR(50) NOT NULL
      );
    `;
    await connection.execute(createTableQuery);
    console.log('테이블이 생성되었거나 이미 존재합니다.');

    // 더미 데이터 삽입 쿼리
    const insertQuery = `
      INSERT INTO real_estate (price, additionalInfo, location, brokerName, phoneNumber)
      VALUES 
        (1000000.00, 'Dummy info 1', 'Seoul', 'Broker A', '010-1234-5678'),
        (1500000.00, 'Dummy info 2', 'Busan', 'Broker B', '010-2345-6789'),
        (1200000.00, 'Dummy info 3', 'Daegu', 'Broker C', '010-3456-7890');
    `;
    const [result] = await connection.execute(insertQuery);
    console.log('더미 데이터가 삽입되었습니다. 삽입된 행 수:', result.affectedRows);
  } catch (error) {
    console.error('더미 데이터 삽입 중 오류 발생:', error);
  } finally {
    await connection.end();
  }
}

insertDummyData();