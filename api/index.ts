import express from 'express';
const cors = require('cors');
import mongoose from 'mongoose';

import config from './config';
import userRouter from "./routers/users";
import postRouter from "./routers/posts";

const app = express();
const port = 8000;

app.use(express.json());
app.use(express.static('public'));
app.use(cors());

app.use('/users', userRouter);
app.use('/posts', postRouter);

const run = async () => {
    await mongoose.connect(config.mongoose.db);

    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });

    process.on('exit', () => {
        mongoose.disconnect();
    });
};

void run();

