import mongoose from 'mongoose';
import config from './config';
import Post from "./models/Post";
import Comments from "./models/Comments";
import User from "./models/User";


const dropCollection = async (
    db: mongoose.Connection,
    collectionName: string,
) => {
    try {
        await db.dropCollection(collectionName);
    } catch (e) {
        console.log(`Collection ${collectionName} was missing, skipping drop...`);
    }
};

const run = async () => {
    await mongoose.connect(config.mongoose.db);
    const db = mongoose.connection;

    const collections = ['posts', 'comments', 'users'];

    for (const collectionName of collections) {
        await dropCollection(db, collectionName);
    }

    await User.create({
        user: 'user1',
        password: '123',
        token: '1'
    });

    const [post1, post2] = await Post.create(
        {
            title: "Post1",
            image: 'fixtures/test-image.jpg',
            user: "user1",
            description: "description",
            datetime: new Date().toISOString(),
        },
        {
            title: "Post2",
            image: 'fixtures/test-image.jpg',
            user: "user1",
            description: "description",
            datetime: new Date().toISOString(),
        },
    );

    await Comments.create(
        {
            user: "user1",
            post: post1._id,
            text: "text1",
        }, {
            user: "user1",
            post: post1._id,
            text: "text2",
        },
        {
            user: "user1",
            post: post2._id,
            text: "text1",
        }, {
            user: "user1",
            post: post2._id,
            text: "text2",
        },
    );

    await db.close();
};

void run();



