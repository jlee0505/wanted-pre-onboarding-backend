// models/job.ts
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db';
import { Company } from './company';

interface JobAttributes {
  id: number;
  companyId: number;
  position: string;
  reward: number;
  description: string;
  skills: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface JobCreationAttributes extends Optional<JobAttributes, 'id'> {}

export class Job
  extends Model<JobAttributes, JobCreationAttributes>
  implements JobAttributes
{
  public id!: number;
  public companyId!: number;
  public position!: string;
  public reward!: number;
  public description!: string;
  public skills!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Define associations
  public Company!: Company;
}

Job.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Company,
        key: 'id',
      },
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reward: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    skills: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
  }
);
