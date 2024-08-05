import sequelize from '../config/db';
import { Company } from './company';
import { Job } from './job';

Company.hasMany(Job, {
  foreignKey: 'companyId',
  as: 'jobs',
  onDelete: 'CASCADE',
});
Job.belongsTo(Company, { foreignKey: 'companyId', as: 'Company' });

export { Company, Job, sequelize };
