import express from 'express';
import { promises as fs } from 'fs';
import winston from 'winston';
import productsRouter from './routes/products.js';

global.fileProducts = './products.json';
global.fileCategories = './categories.json';

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
  //verifiying existence of products.json
  try {
    await readFile('products.json');
    logger.info('API Started!');
  } catch (err) {
    const productsJson = {
      nextId: 1,
      products: [],
    };
    try {
      writeFile('products.json', JSON.stringify(productsJson));
      logger.info('API Started and Products File Created!');
    } catch (err) {
      logger.error(err);
    }
  }

  //verifiying existence of categories.json
  try {
    await readFile('categories.json');
  } catch (err) {
    const catgoriesJson = {
      nextId: 1,
      categories: [],
    };
    try {
      writeFile('categories.json', JSON.stringify(catgoriesJson));
      logger.info('API Started and Category File Created!');
    } catch (err) {
      logger.error(err);
    }
  }
});
