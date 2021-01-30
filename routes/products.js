import express from 'express';
import { promises as fs } from 'fs';

const { readFile, writeFile } = fs;
const router = express.Router();

router.post('/new-product', (req, res, next) => {});

router.post('/new-category', (req, res, next) => {});

//suggestion: use patch nd put
router.patch('/edit-category/:category', (req, res, next) => {});

router.get('/products', (req, res, next) => {});

router.get('/products/:name', (req, res, next) => {});

router.get('/products/:category', (req, res, next) => {});

//suggestion: use patch nd put
router.patch('/edit-product/:name', (req, res, next) => {});

router.delete('/delete/:product', (req, res, next) => {});

router.use((err, req, res) => {
  global.logger.error(`${req.method} ${req.baseUrl} ${err.message}`);
  res.status(400).send({ error: err.message });
});

export default router;
