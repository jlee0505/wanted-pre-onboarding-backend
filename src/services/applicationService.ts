import { Application } from '../models/application';
import {
  ApplicationCreationAttributes,
  JobApplicationStatus,
} from '../types/application';

export class ApplicationService {
  async applyToJob(userId: number, jobId: number): Promise<Application> {
    const existingApplication = await Application.findOne({
      where: { userId, jobId },
    });

    if (existingApplication) {
      throw new Error('이미 지원한 포지션입니다.');
    }

    const newApplication = await Application.create({
      userId,
      jobId,
      status: JobApplicationStatus.PENDING,
    } as ApplicationCreationAttributes);

    return newApplication;
  }
}
