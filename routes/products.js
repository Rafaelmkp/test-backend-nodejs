import express from 'express';
import { promises as fs } from 'fs';

const { readFile, writeFile } = fs;
const router = express.Router();

router.post('/new-product', async (req, res, next) => {
  try {
    let newProduct = req.body;
    if (
      !newProduct.title ||
      !newProduct.description ||
      !newProduct.price ||
      !newProduct.category
    ) {
      throw new Error('Missing required parameters.');
    }

    //tests if category of new product is a valid category
    const categories = JSON.parse(await readFile(global.fileCategories));
    if (
      !categories.categories.some((category) => {
        return category.name === newProduct.category;
      })
    ) {
      throw new Error('Category doesnt exist.');
    }

    const products = JSON.parse(await readFile(global.fileProducts));

    //not using spread to prevent undesired data
    newProduct = {
      id: products.nextId,
      title: newProduct.title,
      description: newProduct.description,
      price: newProduct.price,
      category: newProduct.category,
    };

    products.products.push(newProduct);
    products.nextId++;
    await writeFile(global.fileProducts, JSON.stringify(products, null, 2));

    const resString = `New Product - Title: ${newProduct.title}, 
      Description: ${newProduct.description}, Price: ${newProduct.price}, 
      Category: ${newProduct.category}.`;
    req.send(resString);
  } catch (err) {
    next(err);
  }
});

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
