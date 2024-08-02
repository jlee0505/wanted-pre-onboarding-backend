const { Job, Company, sequelize } = require('../models');

exports.createJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    await Job.update(req.body, { where: id });
    const updateJob = await Job.findByPk(id);
    res.status(200).json(updateJob);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    await Job.destroy({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.findAll();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findByPk(id);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getJobDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findOne({
      where: { id },
      include: {
        model: Company,
        include: {
          model: Job,
          as: 'otherJobs',
          where: { id: { [sequelize.Op.ne]: id } },
          required: false,
        },
      },
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
      otherJobs: job.Company.otherJobs.map((otherJob) => ({
        jobId: otherJob.id,
        position: otherJob.position,
        reward: otherJob.reward,
        skills: otherJob.skills,
      })),
    };

    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
