import express from 'express';
import { promises as fs } from 'fs';
import winston from 'winston';
import productsRouter from './routes/products.js';

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

global.logger = winston.createLogger({
  level: 'silly',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'products-api.log' }),
  ],
  format: combine(label({ label: 'products-api' }), timestamp(), myFormat),
});

const { readFile, writeFile } = fs;

const app = express();
app.use(express.json());
app.use('/products', productsRouter);

app.listen(3000, async () => {
  try {
    await readFile('products.json');
    logger.info('API Started!');
  } catch (err) {
    const initialJson = {
      nextId: 1,
      products: [],
    };
    try {
      writeFile('products.json', JSON.stringify(initialJson));
      logger.info('API Started and File Created!');
    } catch (err) {
      logger.error(err);
    }
  }
});
