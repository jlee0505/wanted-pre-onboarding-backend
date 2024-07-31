module.exports = (sequelize, DataTypes) => {
  const Job = sequelize.define('Job', {
    position: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reward: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT, // TODO: STRING vs TEXT
      allowNull: false,
    },
    skills: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Job;
};
