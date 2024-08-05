import { Request, Response, NextFunction } from 'express';
import { Job } from '../models';
import * as jobService from '../services/jobService';

export const createJob = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const job = await jobService.createJobService(req.body);
    return res.status(201).json({ jobId: job.id });
  } catch (error) {
    next(error);
  }
};

export const updateJob = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const jobData = req.body;
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
    next(error);
  }
};

export const deleteJob = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const deleted = await jobService.deleteJobService(parseInt(id, 10));

    if (deleted) {
      return res.status(204).send();
    }

    return res.status(404).json({ error: 'Job Not Found' });
  } catch (error) {
    next(error);
  }
};

export const getJobs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const keyword = req.query.search as string;
    const jobs = await jobService.getJobsService(keyword);
    return res.status(200).json(jobs);
  } catch (error) {
    next(error);
  }
};

export const getJobById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const job = await jobService.getJobByIdService(parseInt(id, 10));

    if (job) {
      return res.status(200).json(job);
    }

    return res.status(404).json({ error: 'Job Not Found' });
  } catch (error) {
    next(error);
  }
};

export const getJobDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
    next(error);
  }
};
