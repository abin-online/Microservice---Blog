import express, { Router } from "express"
import postController from "../controller/postController"

const router : Router = express.Router()

router.get('/api/postservice/getpost' , postController.getPost)
router.post('/api/postservice/addpost',postController.addPost)
router.delete('/api/postservice/deletepost', postController.deletePost)

export default router