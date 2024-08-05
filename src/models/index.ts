import sequelize from '../config/db';
import { Application } from './application';
import { Company } from './company';
import { Job } from './job';
import User from './user';

Company.hasMany(Job, {
  foreignKey: 'companyId',
  as: 'jobs',
  onDelete: 'CASCADE',
});
Job.belongsTo(Company, { foreignKey: 'companyId', as: 'Company' });

Job.hasMany(Application, {
  foreignKey: 'jobId',
  as: 'application',
  onDelete: 'CASCADE',
});
Application.belongsTo(Job, { foreignKey: 'jobId', as: 'Job' });

User.hasMany(Application, {
  foreignKey: 'userId',
  as: 'application',
  onDelete: 'CASCADE',
});
Application.belongsTo(User, { foreignKey: 'userId', as: 'User' });

export { Company, Job, Application, User, sequelize };
