import { Router } from 'express';
import { getPostsByCourse, getPostById, getPosts, createPost, updatePost, deletePost } from './post.controller.js';

const router = Router();

router.get(
    '/curso/:courseId',
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