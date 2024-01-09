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
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://app-cocktail-recipes.netlify.app"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Private-Network", "true");

  res.setHeader("Access-Control-Max-Age", "7200");

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
