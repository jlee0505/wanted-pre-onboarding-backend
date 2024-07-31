// Sequelize 사용하여 "Company" 모델 정의.
// -> 데베의 companies 테이블과 매핑되며, 회사에 대한 정보 저장 역할

// 특정 모델 반환하는 함수를 export
module.exports = (sequelize, DataTypes) => {
  // Sequelize 의 define 메소드를 사용하여 Company 모델 정의.
  const Company = sequelize.define('Company', {
    // arg1: 모델 이름, arg2: 모델의 필드(테이블의 '열' 부분)
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    region: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Company;
};
