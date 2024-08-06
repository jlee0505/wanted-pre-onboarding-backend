import { NextFunction, Request, Response } from 'express';
import { ApplicationService } from '../services/applicationService';
import { ApplicationAttributes } from '../types/application';

const applicationService = new ApplicationService();

export const applyToJob = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, jobId } = req.body;

    if (userId == null || jobId == null) {
      return res
        .status(400)
        .json({ error: 'user id and job id are required.' });
    }

    const application: ApplicationAttributes =
      await applicationService.applyToJob(userId, jobId);
    res.status(201).json(application);
  } catch (error) {
    next(error);
  }
};
