import { Request, Response } from 'express';
import { Job, Company } from '../models';
import { Op } from 'sequelize';

// Job 생성
export const createJob = async (req: Request, res: Response) => {
  try {
    const { companyId, position, reward, description, skills } = req.body;

    const job = await Job.create({
      companyId,
      position,
      reward,
      description,
      skills,
    });

    return res.status(201).json({ jobId: job.id });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
};

// Job 업데이트
export const updateJob = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { position, reward, description, skills } = req.body;

    const [updated] = await Job.update(
      { position, reward, description, skills },
      { where: { id: parseInt(id, 10) } }
    );

    if (updated) {
      const updatedJob = await Job.findByPk(id);
      return res.status(200).json(updatedJob);
    }

    return res.status(404).json({ error: 'Job Not Found' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
};

// Job 삭제
export const deleteJob = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deleted = await Job.destroy({ where: { id: parseInt(id, 10) } });

    if (deleted) {
      return res.status(204).send(); // No Content
    }

    return res.status(404).json({ error: 'Job Not Found' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
};

// 모든 Job 조회
export const getJobs = async (req: Request, res: Response) => {
  try {
    const jobs = await Job.findAll({
      include: [
        {
          model: Company,
          as: 'Company',
        },
      ],
    });

    return res.status(200).json(jobs);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
};

// ID로 Job 조회
export const getJobById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const job = await Job.findByPk(id, {
      include: [
        {
          model: Company,
          as: 'Company',
        },
      ],
    });

    if (job) {
      return res.status(200).json(job);
    }

    return res.status(404).json({ error: 'Job Not Found' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
};

// Job 상세 조회 (Company의 다른 Job 포함)
export const getJobDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const jobId = parseInt(id, 10);

    const job = await Job.findOne({
      where: { id: jobId },
      include: [
        {
          model: Company,
          as: 'Company', // Company 모델의 별칭
          include: [
            {
              model: Job,
              as: 'jobs', // Company 모델과의 관계에서 설정한 별칭
              where: { id: { [Op.ne]: jobId } },
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
      otherJobs: job.Company.jobs.map((otherJob: Job) => ({
        jobId: otherJob.id,
        position: otherJob.position,
        reward: otherJob.reward,
        skills: otherJob.skills,
      })),
    };

    return res.status(200).json(response);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
};