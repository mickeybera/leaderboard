import express from 'express';
import { claimPoints } from '../controller/Claim.controller.js';
import { getHistory } from '../controller/Claim.controller.js';

const router = express.Router();

router.post('/', claimPoints);
router.get('/history', getHistory);

export default router;

