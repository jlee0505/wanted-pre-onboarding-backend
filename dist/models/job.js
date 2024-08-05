"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Job = void 0;
// models/job.ts
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
const company_1 = require("./company");
class Job extends sequelize_1.Model {
}
exports.Job = Job;
Job.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    companyId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: company_1.Company,
            key: 'id',
        },
    },
    position: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    reward: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    skills: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: db_1.default,
    timestamps: true,
});
