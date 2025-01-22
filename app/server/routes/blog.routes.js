import { Router } from 'express';
import * as blogController from '../controllers/blog.controller.js';

const router = Router();

router.post('/add', blogController.addBlog);
router.delete('/remove/:id', blogController.removeBlog);
router.get('/all', blogController.getAllBlogs);

export default router; 