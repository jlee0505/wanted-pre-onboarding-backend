"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJobDetails = exports.getJobById = exports.getJobs = exports.deleteJob = exports.updateJob = exports.createJob = void 0;
const models_1 = require("../models");
const sequelize_1 = require("sequelize");
const createJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { companyId, position, reward, description, skills } = req.body;
        const job = yield models_1.Job.create({
            companyId,
            position,
            reward,
            description,
            skills,
        });
        return res.status(201).json({ jobId: job.id });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: 'An unexpected error occurred' });
        }
    }
});
exports.createJob = createJob;
const updateJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { position, reward, description, skills } = req.body;
        const [updated] = yield models_1.Job.update({ position, reward, description, skills }, { where: { id: parseInt(id, 10) } });
        if (updated) {
            const updatedJob = yield models_1.Job.findByPk(id);
            return res.status(200).json(updatedJob);
        }
        return res.status(404).json({ error: 'Job Not Found' });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: 'An unexpected error occurred' });
        }
    }
});
exports.updateJob = updateJob;
const deleteJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleted = yield models_1.Job.destroy({ where: { id: parseInt(id, 10) } });
        if (deleted) {
            return res.status(204).send(); // No Content
        }
        return res.status(404).json({ error: 'Job Not Found' });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: 'An unexpected error occurred' });
        }
    }
});
exports.deleteJob = deleteJob;
const getJobs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobs = yield models_1.Job.findAll({
            include: [models_1.Company],
        });
        return res.status(200).json(jobs);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: 'An unexpected error occurred' });
        }
    }
});
exports.getJobs = getJobs;
const getJobById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const job = yield models_1.Job.findByPk(id, {
            include: [models_1.Company],
        });
        if (job) {
            return res.status(200).json(job);
        }
        return res.status(404).json({ error: 'Job Not Found' });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: 'An unexpected error occurred' });
        }
    }
});
exports.getJobById = getJobById;
const getJobDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const jobId = parseInt(id, 10);
        const job = yield models_1.Job.findOne({
            where: { id: jobId },
            include: [
                {
                    model: models_1.Company,
                    as: 'Company', // Company 모델의 별칭
                    include: [
                        {
                            model: models_1.Job,
                            as: 'jobs', // Company 모델과의 관계에서 설정한 별칭
                            where: { id: { [sequelize_1.Op.ne]: jobId } },
                            required: false,
                        },
                    ],
                },
            ],
        });
        if (!job) {
            return res.status(404).json({ error: 'Job Not Found' });
        }
        const response = {
            jobId: job.id,
            companyName: job.Company.name,
            country: job.Company.country,
            location: job.Company.location,
            position: job.position,
            reward: job.reward,
            skills: job.skills,
            description: job.description,
            otherJobs: job.Company.jobs.map((otherJob) => ({
                jobId: otherJob.id,
                position: otherJob.position,
                reward: otherJob.reward,
                skills: otherJob.skills,
            })),
        };
        return res.status(200).json(response);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: 'An unexpected error occurred' });
        }
    }
});
exports.getJobDetails = getJobDetails;
