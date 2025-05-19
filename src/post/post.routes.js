import { Router } from 'express';
import { getPostsByCourse, getPostById, getPosts, createPost, updatePost, deletePost } from './post.controller.js';
import { validatePost } from '../middlewares/validate-post.js';
const router = Router();

router.get(
    '/:courseId',
    getPostsByCourse
);

router.get(
    '/',
    getPosts
);

router.get(
    '/search/:id',
    getPostById
);

router.post(
    '/create',
    validatePost,
    createPost
);

router.put(
    '/update/:id',
    updatePost
);
router.delete(
    '/delete/:id',
    deletePost
);

export default router;