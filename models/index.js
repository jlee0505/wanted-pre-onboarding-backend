const Sequelize = require('sequelize'); // = 라이브러리에서 Sequelize 클래스
const sequelize = require('../config/db'); // = 데이터 베이스 연결 나타내는 인스턴스

// 모델(Sequelize 의 define으로 정의한 sequlize 인스턴스) 불러오기
const Company = require('./company')(sequelize, Sequelize.DataTypes); // 모델과 그 인자 2개
const Job = require('./job')(sequelize, Sequelize.DataTypes);

Company.hasMany(Job, { foreignKey: 'companyId', onDelete: 'CASCADE' }); // = "Company" 모델은 여러 개의 "Job" 모델 가질 수 있음.
Company.belongsTo(Company, { foreignKey: 'companyId' });

module.exports = { Company, Job, sequelize };
