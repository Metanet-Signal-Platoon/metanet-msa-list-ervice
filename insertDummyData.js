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
    // 기존 테이블이 존재하면 삭제
    const dropTableQuery = `DROP TABLE IF EXISTS real_estate;`;
    await connection.execute(dropTableQuery);
    console.log('기존 real_estate 테이블이 삭제되었습니다.');

    // 테이블 생성 쿼리
    const createTableQuery = `
      CREATE TABLE real_estate (
        id INT AUTO_INCREMENT PRIMARY KEY,
        price VARCHAR(255) NOT NULL,
        additionalInfo VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        brokerName VARCHAR(100) NOT NULL,
        phoneNumber VARCHAR(50) NOT NULL
      );
    `;
    await connection.execute(createTableQuery);
    console.log('real_estate 테이블이 새로 생성되었습니다.');

    // 더미 데이터 삽입 쿼리
    const insertQuery = `
      INSERT INTO real_estate (price, additionalInfo, location, brokerName, phoneNumber)
      VALUES 
        ('월세 100/70', '12.25㎡ 2층', 'Seoul', 'Broker A', '010-1234-5678'),
        ('전세 2억 5,000', '21㎡ 5층', 'Busan', 'Broker B', '010-2345-6789'),
        ('월세 200/60', '24.13㎡ 4층', 'Daegu', 'Broker C', '010-3456-7890');
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