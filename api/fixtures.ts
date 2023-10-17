import mongoose from 'mongoose';
import crypto from 'crypto';
import config from './config';
import User from './models/User';

const run = async () => {
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
  } catch (e) {
    console.log('Collections were not present, skipping drop...');
  }

  await User.create(
    {
      username: 'user',
      password: '1qaz@WSX29',
      token: crypto.randomUUID(),
      role: 'user',
      displayName: 'superUser',
      avatar: 'fixtures/user.jpeg',
    },
    {
      username: 'admin',
      password: '1qaz@WSX29',
      token: crypto.randomUUID(),
      role: 'admin',
      displayName: 'SuperAdmin',
      avatar: 'fixtures/admin.jpeg',
    },
  );

  await db.close();
};

run().catch(console.error);
