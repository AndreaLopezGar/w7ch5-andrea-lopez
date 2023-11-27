import mongoose from 'mongoose';
import 'dotenv/config';
import createDebug from 'debug';

const debug = createDebug('RRSS:services:db.connect');

export const dbConnect = () => {
  const user = process.env.USER_DB;
  const passwd = process.env.PASSWD_DB;
  const cluster = 'cluster0.uyiwbmg.mongodb.net';
  const uri = `mongodb+srv://${user}:${passwd}@${cluster}/users?retryWrites=true&w=majority`;
  return mongoose.connect(uri);
};

debug('Hello from db connect');
