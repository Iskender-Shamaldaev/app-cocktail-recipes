import express from 'express';
import cors from 'cors';
import * as mongoose from 'mongoose';
import userRouter from './routers/users';
import config from './config';

const app = express();
const port = 8000;
app.use(cors());

app.use(express.static('public'));
app.use(express.json());
app.use('/users', userRouter);

const run = async () => {
  await mongoose.connect(config.db);

  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

run().catch((e) => console.error(e));
