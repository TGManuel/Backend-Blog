import { Router } from 'express';
import { getComments, getCommentById, getCommentsByPostId, createComment, updateComment, deleteComment } from './comment.controller.js';
import { validateComment } from '../middlewares/validate-comment.js';

const router = Router();


router.get(
    "/",
    getComments
);
router.get(
    "/search/:id", 
    getCommentById
);
router.get(
    "/:postId", 
    getCommentsByPostId
);
router.post(
    "/create", 
    validateComment, 
    createComment
); 

router.put(
    "/update/:id",  
    updateComment
);
router.delete(
    "/delete/:id", 
    deleteComment
);

export default router;