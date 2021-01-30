import express from 'express';
import { promises as fs } from 'fs';
import winston from 'winston';

global.logger = winston.createLogger({
  level: 'silly',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'my-grades-api.log' }),
  ],
  format: combine(label({ label: 'my-grades-api' }), timestamp(), myFormat),
});

const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log('API Started.');
});
