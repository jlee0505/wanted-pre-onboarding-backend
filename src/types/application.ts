import { Optional } from 'sequelize';

export enum JobApplicationStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
}

export interface ApplicationAttributes {
  id: number;
  userId: number;
  jobId: number;
  status: JobApplicationStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ApplicationCreationAttributes
  extends Optional<ApplicationAttributes, 'id'> {}
