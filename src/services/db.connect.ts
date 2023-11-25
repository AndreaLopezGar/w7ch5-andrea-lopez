import mongoose from 'mongoose';
import 'dotenv/config';
import createDebug from 'debug';

export const dbConnect = () => {
  const user = process.env.USER_DB;
  const passwd = process.env.PASSWD_DB;
  const uri = `mongodb+srv://${user}:${passwd}@cluster0.uyiwbmg.mongodb.net/isdi?retryWrites=true&w=majority`;
  return mongoose.connect(uri);
};

const debug = createDebug('RRSS:db.connect');
debug('Hola desde db connect');
