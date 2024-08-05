import {
  createJobService,
  updateJobService,
  deleteJobService,
  getJobsService,
  getJobByIdService,
  getJobDetailService,
} from '../src/services/jobService';
import { Job, Company } from '../src/models';
import { Op } from 'sequelize';

jest.mock('../src/models', () => ({
  Job: {
    create: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn(),
    findOne: jest.fn(),
  },
  Company: jest.fn(),
}));

describe('Job Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a job', async () => {
    const jobData = {
      companyId: 1,
      position: 'Dev',
      reward: 1000,
      description: 'Backend Internship',
      skills: 'Node.js, Typescript',
    };

    const job = { id: 1, ...jobData };

    (Job.create as jest.Mock).mockResolvedValue(job);

    const result = await createJobService(jobData);

    expect(result).toEqual(job);
    expect(Job.create).toHaveBeenCalledWith(jobData);
  });

  it('should get a job by ID', async () => {
    const jobId = 1;
    const job = {
      id: jobId,
      companyId: 1,
      position: 'Designer',
      reward: 1000,
      description: 'UI/UX Designer',
      skills: 'Figma, Adobe',
    };

    (Job.findByPk as jest.Mock).mockResolvedValue(job);

    const result = await getJobByIdService(jobId);

    expect(result).toEqual(job);
    expect(Job.findByPk).toHaveBeenCalledWith(jobId, {
      include: [{ model: Company, as: 'Company' }],
    });
  });

  it('should update a job', async () => {
    const jobId = 1;
    const jobData = {
      position: 'Updated Position',
      description: 'Updated Description',
      reward: 2000,
      skills: 'Updated Skills',
    };

    const updateResult = [1];

    (Job.update as jest.Mock).mockResolvedValue(updateResult);

    const result = await updateJobService(jobId, jobData);

    expect(result).toEqual(updateResult);
    expect(Job.update).toHaveBeenCalledWith(jobData, { where: { id: jobId } });
  });

  it('should delete a job', async () => {
    const jobId = 1;
    const deleteResult = 1;

    (Job.destroy as jest.Mock).mockResolvedValue(deleteResult);

    const result = await deleteJobService(jobId);

    expect(result).toEqual(deleteResult);
    expect(Job.destroy).toHaveBeenCalledWith({ where: { id: jobId } });
  });

  it('should get all jobs', async () => {
    const jobs = [
      {
        id: 1,
        companyId: 1,
        position: 'Dev',
        reward: 1000,
        description: 'Backend Internship',
        skills: 'Node.js, Typescript',
        Company: { id: 1, name: 'Company A' },
      },
      {
        id: 2,
        companyId: 2,
        position: 'Designer',
        reward: 2000,
        description: 'UI/UX Designer',
        skills: 'Figma, Adobe',
        Company: { id: 2, name: 'Company B' },
      },
    ];

    (Job.findAll as jest.Mock).mockResolvedValue(jobs);

    const result = await getJobsService();

    expect(result).toEqual(jobs);
    expect(Job.findAll).toHaveBeenCalledWith({
      include: [{ model: Company, as: 'Company' }],
    });
  });

  it('should get job detail', async () => {
    const jobId = 1;
    const job = {
      id: jobId,
      companyId: 1,
      position: 'Dev',
      reward: 1000,
      description: 'Backend Internship',
      skills: 'Node.js, Typescript',
      Company: {
        id: 1,
        name: 'Company A',
        jobs: [
          {
            id: 2,
            companyId: 1,
            position: 'Frontend Dev',
            reward: 1500,
            description: 'Frontend Internship',
            skills: 'React, CSS',
          },
        ],
      },
    };

    (Job.findOne as jest.Mock).mockResolvedValue(job);

    const result = await getJobDetailService(jobId);

    expect(result).toEqual(job);
    expect(Job.findOne).toHaveBeenCalledWith({
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
  });
});
