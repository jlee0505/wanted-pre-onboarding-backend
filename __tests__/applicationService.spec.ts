import { Application } from '../src/models/application'; // Adjust path if needed
import { ApplicationService } from '../src/services/applicationService';
import { JobApplicationStatus } from '../src/types/application';

jest.mock('../src/models/application', () => {
  return {
    Application: {
      findOne: jest.fn(),
      create: jest.fn(),
    },
  };
});

describe('ApplicationService', () => {
  let applicationService: ApplicationService;

  beforeEach(() => {
    applicationService = new ApplicationService();
    (Application.findOne as jest.Mock).mockReset();
    (Application.create as jest.Mock).mockReset();
  });

  it('should create a new application if one does not already exist', async () => {
    (Application.findOne as jest.Mock).mockResolvedValue(null);

    const mockApplication = {
      id: 1,
      userId: 1,
      jobId: 1,
      status: JobApplicationStatus.PENDING,
    };
    (Application.create as jest.Mock).mockResolvedValue(mockApplication);

    const application = await applicationService.applyToJob(1, 1);

    expect(application).toEqual(mockApplication);
    expect(Application.findOne).toHaveBeenCalledWith({
      where: { userId: 1, jobId: 1 },
    });
    expect(Application.create).toHaveBeenCalledWith({
      userId: 1,
      jobId: 1,
      status: JobApplicationStatus.PENDING,
    });
  });

  it('should throw an error if an application already exists', async () => {
    const existingApplication = {
      id: 1,
      userId: 1,
      jobId: 1,
      status: JobApplicationStatus.PENDING,
    };

    (Application.findOne as jest.Mock).mockResolvedValue(existingApplication);
    (Application.create as jest.Mock).mockResolvedValue(null);

    await expect(applicationService.applyToJob(1, 1)).rejects.toThrow(
      '이미 지원한 포지션입니다.'
    );

    expect(Application.findOne).toHaveBeenCalledWith({
      where: { userId: 1, jobId: 1 },
    });
    expect(Application.create).not.toHaveBeenCalled();
  });
});
