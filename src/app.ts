import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import createDebug from 'debug';

const debug = createDebug('RRSS:app');

export const app = express();
debug('Starting');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public'));
