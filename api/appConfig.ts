import path from 'path';
import * as dotenv from 'dotenv';

const rootPath = __dirname;
dotenv.config();

const appConfig = {
  rootPath,
  publicPath: path.join(rootPath, 'public'),
  db: 'mongodb://localhost/cocktail',
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
  },
};

export default appConfig;
