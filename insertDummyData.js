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
        ('월세 100/70', '12.25㎡ 2층', '서울', '김민수', '010-1234-5678'),
        ('전세 2억 5,000', '21㎡ 5층', '부산', '이영희', '010-2345-6789'),
        ('월세 200/60', '24.13㎡ 4층', '대구', '박지훈', '010-3456-7890'),
        ('전세 3억', '30㎡ 7층', '인천', '최수진', '010-4567-8901'),
        ('월세 150/50', '15.5㎡ 3층', '광주', '정현우', '010-5678-9012'),
        ('전세 1억 8,000', '10㎡ 1층', '대전', '윤서연', '010-6789-0123'),
        ('월세 120/80', '18.3㎡ 6층', '울산', '한지민', '010-7890-1234'),
        ('전세 2억', '22㎡ 8층', '세종', '오민석', '010-8901-2345'),
        ('월세 180/70', '20㎡ 5층', '수원', '문지수', '010-9012-3456'),
        ('전세 2억 2,000', '25㎡ 9층', '춘천', '서예린', '010-0123-4567');
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