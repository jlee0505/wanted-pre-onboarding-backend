"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = exports.Job = exports.Company = void 0;
const db_1 = __importDefault(require("../config/db"));
exports.sequelize = db_1.default;
const company_1 = require("./company");
Object.defineProperty(exports, "Company", { enumerable: true, get: function () { return company_1.Company; } });
const job_1 = require("./job");
Object.defineProperty(exports, "Job", { enumerable: true, get: function () { return job_1.Job; } });
company_1.Company.hasMany(job_1.Job, {
    foreignKey: 'companyId',
    as: 'jobs',
    onDelete: 'CASCADE',
});
job_1.Job.belongsTo(company_1.Company, { foreignKey: 'companyId', as: 'Company' });
