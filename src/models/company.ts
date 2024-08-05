import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db';
import { Job } from './job';

interface CompanyAttributes {
  id: number;
  name: string;
  country: string;
  location: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface CompanyCreationAttributes extends Optional<CompanyAttributes, 'id'> {}

export class Company
  extends Model<CompanyAttributes, CompanyCreationAttributes>
  implements CompanyAttributes
{
  public id!: number;
  public name!: string;
  public country!: string;
  public location!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public jobs!: Job[];
}

Company.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
  }
);
