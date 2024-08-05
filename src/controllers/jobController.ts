import { Request, Response } from 'express';
import { Job } from '../models';
import * as jobService from '../services/jobService';

// TODO: error 핸들링 중복 코드 처리 및 더 잘 핸들링할 수 있는 방법 없을까?
export const createJob = async (req: Request, res: Response) => {
  try {
    const job = await jobService.createJobService(req.body);
    return res.status(201).json({ jobId: job.id });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
};

export const updateJob = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const jobData = req.body;
    const job = await jobService.updateJobService(parseInt(id), jobData);

    const [updated] = await jobService.updateJobService(
      parseInt(id, 10),
      jobData
    );

    if (updated) {
      const updatedJob = await jobService.getJobByIdService(parseInt(id, 10));
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

export const deleteJob = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deleted = await jobService.deleteJobService(parseInt(id, 10));

    if (deleted) {
      return res.status(204).send();
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

export const getJobs = async (req: Request, res: Response) => {
  try {
    const jobs = await jobService.getJobsService();
    return res.status(200).json(jobs);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
};

export const getJobById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const job = await jobService.getJobByIdService(parseInt(id, 10));

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

export const getJobDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const jobId = parseInt(id, 10);

    const job = await jobService.getJobDetailService(jobId);

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
