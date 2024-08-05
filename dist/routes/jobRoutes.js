"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jobController_1 = require("../controllers/jobController");
const router = express_1.default.Router();
router.post('/', jobController_1.createJob);
router.put('/:id', jobController_1.updateJob);
router.delete('/:id', jobController_1.deleteJob);
router.get('/', jobController_1.getJobs);
router.get('/:id', jobController_1.getJobById);
router.get('/details/:id', jobController_1.getJobDetails);
exports.default = router;
