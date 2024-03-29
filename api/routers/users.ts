import express from 'express';
import User from '../models/User';
import mongoose from 'mongoose';
import auth, { RequestWithUser } from '../middleware/auth';

const userRouter = express.Router();

userRouter.post('/', async (req, res, next) => {
    try {
        const user = new User({
            user: req.body.user,
            password: req.body.password,
        });

        user.generateToken();
        await user.save();
        return res.send(user);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(422).send(error);
        }

        next(error);
    }
});

userRouter.post('/sessions', async (req, res, next) => {
    try {
        const user = await User.findOne({ user: req.body.user });

        if (!user) {
            return res.status(422).send({ error: 'Username not found!' });
        }

        const isMatch = await user.checkPassword(req.body.password);

        if (!isMatch) {
            return res.status(422).send({ error: 'Password is wrong!' });
        }

        user.generateToken();
        await user.save();

        return res.send({ message: 'Username and password are correct!', user });
    } catch (e) {
        next(e);
    }
});

userRouter.delete('/sessions', auth ,async (req, res, next) => {

    try {
        const token = req.get('Authorization');
        const success = {message: 'Success'};

        if (!token) return res.send(success);

        const user = await User.findOne({token});

        if (!user) return res.send(success);

        user.generateToken();
        user.save();
        return res.send(success);
    } catch (e) {
        return next(e);
    }
});

userRouter.get('/secret', auth, async (req: RequestWithUser, res, next) => {
    try {
        return res.send({
            message: 'This is a secret message!',
            user: req.user?.user,
        });
    } catch (e) {
        next(e);
    }
});

export default userRouter;
