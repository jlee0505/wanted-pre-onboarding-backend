import { DataTypes, Model, Sequelize } from 'sequelize';
import sequelize from '../config/db';
import {
  ApplicationAttributes,
  ApplicationCreationAttributes,
  JobApplicationStatus,
} from '../types/application';

export class Application
  extends Model<ApplicationAttributes, ApplicationCreationAttributes>
  implements ApplicationAttributes
{
  public id!: number;
  public userId!: number;
  public jobId!: number;
  public status!: JobApplicationStatus;
  public createdAt?: Date;
  public updatedAt?: Date;
}

Application.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    jobId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(
        JobApplicationStatus.PENDING,
        JobApplicationStatus.ACCEPTED,
        JobApplicationStatus.REJECTED
      ),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'applications',
  }
);
