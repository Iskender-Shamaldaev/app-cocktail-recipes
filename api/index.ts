import express from 'express';
import cors from 'cors';
import * as mongoose from 'mongoose';
import userRouter from './routers/users';
import appConfig from './appConfig';
import cocktailRouter from './routers/cocktails';

const app = express();
const port = process.env.PORT || 8000;
app.use(cors(
  {
    origin: ['http://localhost:3000'],
    methods:['GET,HEAD,PUT,PATCH,POST,DELETE'],
    credentials: true
  }
));

app.use(express.static('public'));
app.use(express.json());
app.use('/users', userRouter);
app.use('/cocktails', cocktailRouter);

const run = async () => {
  await mongoose.connect(appConfig.db);

  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

run().catch((e) => console.error(e));
