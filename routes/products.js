import express from 'express';
import { promises as fs, write } from 'fs';

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

    global.logger.info(
      `POST /products/new-product - ${JSON.stringify(newProduct)}`
    );
    const resString = `New Product - Title: ${newProduct.title}, 
      Description: ${newProduct.description}, Price: ${newProduct.price}, 
      Category: ${newProduct.category}.`;
    req.send(resString);
  } catch (err) {
    next(err);
  }
});

router.post('/new-category', async (req, res, next) => {
  try {
    let newCategory = req.body;

    if (!newCategory.name) {
      throw new Error('Missing required parameters.');
    }

    const categories = JSON.parse(await readFile(global.fileCategories));

    newCategory = {
      id: categories.nextId,
      name: newCategory.name,
    };

    categories.categories.push(newCategory);
    categories.nextId++;
    await writeFile(global.fileCategories, JSON.stringify(categories, null, 2));

    global.logger.info(
      `POST /products/new-category ${JSON.stringify(newCategory)}`
    );
    const resString = `New category added - Name: ${newCategory.name}`;
    res.send(resString);
  } catch (err) {
    next(err);
  }
});

router.put('/edit-category/:category', async (req, res, next) => {
  try {
    if (!req.params.category || req.body.newName) {
      throw new Error('Missing required parameters.');
    }

    let editCategory = req.params.category;
    let newName = req.body;
    const categories = JSON.parse(await readFile(global.fileCategories));

    const index = categories.categories.findIndex(
      (cat) => cat.name === editCategory
    );
    if (index === -1) {
      throw new Error('Category not found.');
    }

    categories.categories[index].name = newName;

    //todo: change related category products too

    await writeFile(global.fileCategories, categories, null, 2);

    global.logger.info(`PUT /edit-category - ${editCategory}`);
    const resString = `Category successfully edited.`;
    res.send(resString);
  } catch (err) {
    next(err);
  }
});

router.get('/products', (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
});

router.get('/products/:name', (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
});

router.get('/products/:category', (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
});

//suggestion: use patch nd put
router.patch('/edit-product/:name', (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
});

router.delete('/delete/:product', (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res) => {
  global.logger.error(`${req.method} ${req.baseUrl} ${err.message}`);
  res.status(400).send({ error: err.message });
});

export default router;
