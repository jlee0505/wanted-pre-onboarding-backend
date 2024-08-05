import { Job, Company } from '../models';
import { Op } from 'sequelize';

// TODO: jobData type 정의
export const createJobService = async (jobData: any) => {
  return await Job.create(jobData);
};

export const updateJobService = async (id: number, jobData: any) => {
  return await Job.update(jobData, { where: { id } });
};

export const deleteJobService = async (id: number) => {
  return await Job.destroy({ where: { id } });
};

export const getJobsService = async () => {
  return await Job.findAll({
    include: [{ model: Company, as: 'Company' }],
  });
};

export const getJobByIdService = async (id: number) => {
  return await Job.findByPk(id, {
    include: [{ model: Company, as: 'Company' }],
  });
};

export const getJobDetailService = async (jobId: number) => {
  return await Job.findOne({
    where: { id: jobId },
    include: [
      {
        model: Company,
        as: 'Company',
        include: [
          {
            model: Job,
            as: 'jobs',
            where: { id: { [Op.ne]: jobId } },
            required: false,
          },
        ],
      },
    ],
  });
};
