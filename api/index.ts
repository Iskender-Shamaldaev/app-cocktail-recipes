import express from 'express';
import cors from 'cors';
import * as mongoose from 'mongoose';
import userRouter from './routers/users';
import config from './config';
import cocktailRouter from './routers/cocktails';

const app = express();
const port = 8000;

app.use(cors({
  origin: ['https://app-cocktail-recipes.netlify.app'],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://app-cocktail-recipes.netlify.app');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Allow-Credentials');
  next();
});


app.use(express.static('public'));
app.use(express.json());
app.use('/users', userRouter);
app.use('/cocktails', cocktailRouter);

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
