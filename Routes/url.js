import express from 'express';
import { CreateNewUrl, redirectToOriginal, totalClicks } from '../controllers/url.js';

const router=express.Router();

router.post('/',CreateNewUrl);
router.get('/:id',redirectToOriginal)
router.post('/analytics/id',totalClicks);


export default router;