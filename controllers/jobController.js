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

exports.updateJob = async (req, res) => {
  try {
    const { jobId } = req.param;
    const { position, reward, description, skills } = req.body;
    const job = await Job.findByPk(jobId); // Sequelize.findByPk() [https://sequelize.org/docs/v6/core-concepts/model-querying-finders/#findbypk]

    if (job) {
      job.position = position;
      job.reward = reward;
      job.description = description;
      job.skills = skills;
      await job.save(); // Sequelize.save(); [https://sequelize.org/docs/v7/querying/update/#updating-a-row-using-modelsave]
      res.json(job);
    } else {
      res.status(404).json({ error: 'Job not found.' });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.deleteJob = async (req, res) => {};
exports.getJobs = async (req, res) => {};
