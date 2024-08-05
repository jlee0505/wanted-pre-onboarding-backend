import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db';

export enum JobApplicationStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
}

interface ApplicationAttributes {
  id: number;
  userId: number;
  jobId: number;
  status: JobApplicationStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ApplicationCreationAttributes
  extends Optional<ApplicationAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

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
      type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
      allowNull: false,
    },
  },
  { sequelize, tableName: 'application' }
);
