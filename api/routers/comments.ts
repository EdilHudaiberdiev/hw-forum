import {Router} from 'express';
import auth, {RequestWithUser} from "../middleware/auth";
import Post from "../models/Post";
import mongoose, {Types} from "mongoose";
import Comments from "../models/Comments";

const commentsRouter = Router();

commentsRouter.post('/', auth,  async (req: RequestWithUser, res, next) => {

    if (!req.query.post_id) {
        res.status(404).send({"error": "Text and Post_id must be present in the request"});
    }

    const postID = await Post.findById(req.query.post_id);

    if (postID === null) {
        return res.status(404).send({error: "Post not found"});
    }

    try {
        const commentsData = new Comments({
            user: req.user?.user,
            post: postID._id,
            text: req.body.text,
        });

        const comments = new Comments(commentsData);
        await comments.save();

        res.send(comments);

    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(422).send(e);
        }
        next(e);
    }
});

commentsRouter.get('/:id', async (req, res, next) => {
    try {
        let _id;

        try {
            _id = new Types.ObjectId(req.params.id);
        } catch {
            return res.status(404).send({error: 'Wrong ObjectId!'});
        }

        const comments = await Comments.find({ post: _id }).populate('post');
        console.log(comments)

        res.send(comments);
    } catch (e) {
        next(e);
    }
});



export default commentsRouter