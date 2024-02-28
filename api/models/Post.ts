import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    user: {
        type: String,
    },
    description: {
        type: String,
    },
    image: String,

    datetime: {
        type: Date,
        default: () => new Date(),
    },
});

const Post = mongoose.model('Post', PostSchema);

export default Post;