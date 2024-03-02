import {Router} from 'express';
import auth, {RequestWithUser} from "../middleware/auth";
import mongoose, {Types} from "mongoose";
import Comments from "../models/Comments";
import Post from '../models/Post';

const commentsRouter = Router();

commentsRouter.post('/', auth,  async (req: RequestWithUser, res, next) => {

    if (!req.query.post_id) {
        res.status(404).send({"error": "Text and Post_id must be present in the request"});
    }

    const postID = await Post.findById(req.query.post_id);

    if (!postID) {
        return res.status(404).send({error: "Post not found"});
    }

    try {
        const commentsData = {
            user: req.user?._id,
            post: req.query.post_id,
            text: req.body.text,
        };

        const comment = new Comments(commentsData);

        await comment.save();
        res.send(comment);

    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(422).send(e);
        }
        next(e);
    }
});

commentsRouter.get('/', async (req, res, next) => {
    try {
        if (!req.query.post_id) {
            res.status(404).send({"error": "Post_id must be present by query"});
        }

        const post = await Post.findById(req.query.post_id);

        if (!post) {
            return res.status(404).send({error: "Post not found"});
        }

        const comments = await Comments.find({ post: req.query.post_id }).populate('user', 'user');
        res.send(comments.reverse());
    } catch (e) {
        next(e);
    }
});



export default commentsRouter