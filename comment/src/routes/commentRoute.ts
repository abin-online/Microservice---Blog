import { Router } from "express";
import commentController from "../controller/commentController";

const router : Router = Router()

router.get('/api/commentService/getComment' , commentController.getComments)
router.post('/api/commentService/comment' , commentController.addComment)

export default router