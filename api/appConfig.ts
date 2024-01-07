import path from 'path';
import * as dotenv from 'dotenv';

const rootPath = __dirname;
dotenv.config();

const appConfig = {
  rootPath,
  publicPath: path.join(rootPath, 'public'),
  db: 'mongodb+srv://Iskender:VFce4reMBWgqc6wa@cluster0.a563fgc.mongodb.net/?retryWrites=true&w=majority',
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
  },
};

export default appConfig;
