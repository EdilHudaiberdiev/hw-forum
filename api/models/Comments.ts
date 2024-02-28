import mongoose from 'mongoose';

const CommentsSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    post: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
});

const Comments = mongoose.model('Comments', CommentsSchema);

export default Comments;