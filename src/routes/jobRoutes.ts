import express from 'express';
import {
  createJob,
  updateJob,
  deleteJob,
  getJobs,
  getJobById,
  getJobDetails,
} from '../controllers/jobController';
import { applyToJob } from '../controllers/applicationController';

const router = express.Router();

router.post('/', createJob);
router.put('/:id', updateJob);
router.delete('/:id', deleteJob);
router.get('/', getJobs);
router.get('/:id', getJobById);
router.get('/details/:id', getJobDetails);
router.post('/apply', applyToJob);

export default router;
