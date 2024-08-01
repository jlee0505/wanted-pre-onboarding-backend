const { Job, Company } = require('../models');

// req: 클라 by POST, res: 서버
exports.createJob = async (req, res) => {
  try {
    const { companyId, position, reward, description, skills } = req.body;
    const job = await Job.create({
      companyId,
      position,
      reward,
      description,
      skills,
    });
    res.status(201).json(job);
  } catch (e) {
    res.status(500).json({ e: e.message });
  }
};

exports.updateJob = async (req, res) => {};

exports.deleteJob = async (req, res) => {};
exports.getJobs = async (req, res) => {};
