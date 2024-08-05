import { Request, Response, NextFunction } from 'express';
import { Job } from '../src/models';
import * as jobService from '../src/services/jobService';
import * as jobController from '../src/controllers/jobController';

jest.mock('../src/services/jobService');

describe('JobController', () => {
  const mockRequest = (body: any = {}, params: any = {}) =>
    ({
      body,
      params,
    } as unknown as Request);

  const mockResponse = () => {
    const res: Partial<Response> = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res as Response;
  };

  const mockNext = jest.fn() as NextFunction;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('createJob should return jobId with status 201', async () => {
    const testJob = { id: 1 };
    const req = mockRequest({ position: 'Developer' });
    const res = mockResponse();

    (jobService.createJobService as jest.Mock).mockResolvedValue(testJob);

    await jobController.createJob(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ jobId: testJob.id });
    expect(jobService.createJobService).toHaveBeenCalledWith(req.body);
  });

  test('updateJob should return updated job with status 200 if job is found', async () => {
    const testJobId = '1';
    const updatedJob = { id: 1, position: 'Updated Developer' };
    const req = mockRequest(
      { position: 'Updated Developer' },
      { id: testJobId }
    );
    const res = mockResponse();

    (jobService.updateJobService as jest.Mock).mockResolvedValue([1]);
    (jobService.getJobByIdService as jest.Mock).mockResolvedValue(updatedJob);

    await jobController.updateJob(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(updatedJob);
    expect(jobService.updateJobService).toHaveBeenCalledWith(
      parseInt(testJobId, 10),
      req.body
    );
    expect(jobService.getJobByIdService).toHaveBeenCalledWith(
      parseInt(testJobId, 10)
    );
  });

  test('updateJob should return error 404 if job is not found', async () => {
    const testJobId = '1';
    const req = mockRequest(
      { position: 'Updated Developer' },
      { id: testJobId }
    );
    const res = mockResponse();

    (jobService.updateJobService as jest.Mock).mockResolvedValue([0]);

    await jobController.updateJob(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Job Not Found' });
  });

  test('deleteJob should return status 204 if job is deleted', async () => {
    const testJobId = '1';
    const req = mockRequest({}, { id: testJobId });
    const res = mockResponse();

    (jobService.deleteJobService as jest.Mock).mockResolvedValue(true);

    await jobController.deleteJob(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
    expect(jobService.deleteJobService).toHaveBeenCalledWith(
      parseInt(testJobId, 10)
    );
  });

  test('deleteJob should return error 404 if job is not found', async () => {
    const testJobId = '1';
    const req = mockRequest({}, { id: testJobId });
    const res = mockResponse();

    (jobService.deleteJobService as jest.Mock).mockResolvedValue(false);

    await jobController.deleteJob(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Job Not Found' });
  });

  test('getJobs should return list of jobs with status 200', async () => {
    const jobs = [
      { id: 1, position: 'Developer' },
      { id: 2, position: 'Designer' },
    ];
    const req = mockRequest();
    const res = mockResponse();

    (jobService.getJobsService as jest.Mock).mockResolvedValue(jobs);

    await jobController.getJobs(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(jobs);
  });

  test('getJobById should return job with status 200 if job is found', async () => {
    const testJobId = '1';
    const job = { id: 1, position: 'Developer' };
    const req = mockRequest({}, { id: testJobId });
    const res = mockResponse();

    (jobService.getJobByIdService as jest.Mock).mockResolvedValue(job);

    await jobController.getJobById(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(job);
  });

  test('getJobById should return error 404 if job is not found', async () => {
    const testJobId = '1';
    const req = mockRequest({}, { id: testJobId });
    const res = mockResponse();

    (jobService.getJobByIdService as jest.Mock).mockResolvedValue(null);

    await jobController.getJobById(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Job Not Found' });
  });

  test('getJobDetails should return job details with status 200 if job is found', async () => {
    const testJobId = '1';
    const job = {
      id: 1,
      position: 'Developer',
      reward: 1000,
      skills: 'Node.js',
      description: 'Great job!',
      Company: {
        name: 'Tech Co',
        country: 'Country',
        location: 'Location',
        jobs: [
          { id: 2, position: 'Designer', reward: 1200, skills: 'Photoshop' },
        ] as Job[],
      },
    };
    const req = mockRequest({}, { id: testJobId });
    const res = mockResponse();

    (jobService.getJobDetailService as jest.Mock).mockResolvedValue(job);

    await jobController.getJobDetails(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
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
    });
  });

  test('getJobDetails should return error 404 if job is not found', async () => {
    const testJobId = '1';
    const req = mockRequest({}, { id: testJobId });
    const res = mockResponse();

    (jobService.getJobDetailService as jest.Mock).mockResolvedValue(null);

    await jobController.getJobDetails(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Job Not Found' });
  });
});
