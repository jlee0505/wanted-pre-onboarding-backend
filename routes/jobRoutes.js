const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

router.post('/jobs', jobController.createJob);
router.put('/jobs/:jobId', jobController.updateJob);
router.delete('/jobs/:jobId', jobController.deleteJob);
router.get('/jobs', jobController.getJobs);
router.get('/jobs/:jobId', jobController.getJobById);
router.get('/jobs/:id', jobController.getJobDetails);

module.exports = router;
