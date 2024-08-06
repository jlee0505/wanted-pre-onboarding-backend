export interface CreateJobData {
  companyId: number;
  position: string;
  reward: number;
  description: string;
  skills: string;
}

export interface UpdateJobData {
  position?: string;
  reward?: number;
  description?: string;
  skills?: string;
}

export enum JobApplicationStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
}
