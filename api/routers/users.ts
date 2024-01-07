import express from 'express';
import User from '../models/User';
import mongoose from 'mongoose';
import { OAuth2Client } from 'google-auth-library';
import config from '../config';
import * as crypto from 'crypto';
import auth, { RequestWithUser } from '../midldleware/auth';
import { imagesUpload } from '../multer';

const userRouter = express.Router();
const client = new OAuth2Client(config.google.clientId);

userRouter.post('/', imagesUpload.single('avatar'), async (req, res, next) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
      displayName: req.body.displayName,
      email: req.body.email,
      avatar: req.file ? req.file.filename : null,
    });

    user.generateToken();

    await user.save();
    req.body.user = user;
    return res.send({
      message: 'Username and password correct!',
      user,
    });
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }

    return next(e);
  }
});

userRouter.post('/sessions', async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return res.status(400).send({ error: 'Wrong password or username!' });
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
      return res.status(400).send({ error: 'Wrong password or username!' });
    }

    user.generateToken();
    await user.save();

    res.send({
      message: 'Username and password correct!',
      user,
    });
  } catch (e) {
    next(e);
  }
});

userRouter.post('/google', async (req, res, next) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: req.body.credential,
      audience: config.google.clientId,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(400).send({ error: 'Google login error!' });
    }

    const email = payload['email'];
    const id = payload['sub'];
    const displayName = payload['name'];
    const avatar = payload['picture'];

    if (!email) {
      return res.status(400).send({ error: 'Not enough user data to continue' });
    }

    let user = await User.findOne({ googleId: id });

    if (!user) {
      user = new User({
        username: email,
        password: crypto.randomUUID(),
        googleId: id,
        displayName,
        avatar,
        email: email,
      });
    }

    user.generateToken();

    await user.save();
    return res.send({ message: 'Login with Google successful!', user });
  } catch (e) {
    return next(e);
  }
});

userRouter.get('/secret', auth, async (req, res) => {
  const user = (req as RequestWithUser).user;

  res.send({
    message: 'Secret message',
    username: user.username,
  });
});

userRouter.delete('/sessions', async (req, res, next) => {
  try {
    const token = req.get('Authorization');

    if (!token) {
      return res.send({ message: 'Success' });
    }

    const user = await User.findOne({ token });

    if (!user) {
      return res.send({ message: 'Success' });
    }

    user.generateToken();
    user.save();

    return res.send({ message: 'Success' });
  } catch (e) {
    next(e);
  }
});

export default userRouter;
