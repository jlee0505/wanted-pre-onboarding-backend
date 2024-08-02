// models/index.js
const sequelize = require('../config/db');
const Company = require('./company');
const Job = require('./job');

Company.hasMany(Job, { foreignKey: 'companyId', onDelete: 'CASCADE' });
Job.belongsTo(Company, { foreignKey: 'companyId' });

module.exports = { Company, Job, sequelize };
