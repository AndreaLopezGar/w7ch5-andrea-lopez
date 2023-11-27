import 'dotenv/config';
import { createServer } from 'http';
import { app } from './app.js';
import { dbConnect } from './services/db.connect.js';
import createDebug from 'debug';

const debug = createDebug('RRSS:index');
const PORT = process.env.PORT || 3000;
const server = createServer(app);
debug('Comenzando el Servidor');

dbConnect()
  .then((mongoose) => {
    server.listen(PORT);
    debug('Connected to Data Base: ', mongoose.connection.db.databaseName);
  })
  .catch((error) => {
    server.emit('error', error);
  });

server.on('listening', () => {
  debug(`Escuchando en el puerto ${PORT}`);
});

server.on('error', (error) => {
  debug(`Error ${error.message}`);
});
