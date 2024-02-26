import {Router} from 'express';
import mongoose from "mongoose";
import auth, { RequestWithUser } from '../middleware/auth';
import Post from "../models/Post";

const postRouter = Router();

postRouter.post('/', auth, async (req: RequestWithUser, res, next) => {

    try {
        const post = new Post({
            user: req.user?.user,
            title: req.body.title,
            description: req.body.description,
            datetime: new Date().toISOString(),
            image: req.file ? req.file.filename : null,
        });

        await post.save();
        return res.send(post);

    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(422).send(error);
        }
        next(error);
    }
});

export default postRouter;
