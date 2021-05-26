import { Router } from 'express';
import { createPost, deletePost, getPostByTitle, getPostByUsername, updatePost, getPostByCreatedDate } from '../controllers/posts';

const router = Router();

router.get('/',              getPostByTitle);
router.get('/username/',     getPostByUsername);
router.get('/bydate/',       getPostByCreatedDate);
router.post('/createpost/',  createPost);
router.put('/update/:id',    updatePost);
router.delete('/delete/:id', deletePost);

export default router;