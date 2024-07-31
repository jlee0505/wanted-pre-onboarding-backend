//  Sequelize ORM을 사용하여 SQLite 데이터베이스에 연결하는 설정
// - DB연결
// - 타 모듈에서 DB연결할 수 잇게 Sequelize 인스턴스 생성

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', // db파일 경로 저장. db의 루트 디렉토리에 database/.sqlite 라는 이름으로 저장.
});

module.exports = sequelize;
