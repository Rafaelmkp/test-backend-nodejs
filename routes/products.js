import express from 'express';
import { promises as fs, read, write } from 'fs';

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

router.put('/edit-category/', async (req, res, next) => {
  try {
    if (!req.body.id || req.body.newName) {
      throw new Error('Missing required parameters.');
    }

    let editCategory = req.body;
    const categories = JSON.parse(await readFile(global.fileCategories));

    const isIndex = categories.categories.findIndex(
      (cat) => cat.id === parseInt(editCategory.id)
    );
    if (isIndex === -1) {
      throw new Error('Category not found.');
    }

    categories.categories[isIndex].name = newName;

    //todo: change related category products too

    await writeFile(global.fileCategories, JSON.stringify(categories, null, 2));

    global.logger.info(`PUT /edit-category - ${editCategory}`);
    const resString = `Category successfully edited.`;
    res.send(resString);
  } catch (err) {
    next(err);
  }
});

router.get('/all', async (_req, res, next) => {
  try {
    const products = JSON.parse(await readFile(global.fileProducts));

    global.logger.info(`GET /products/all`);
    res.send(products.products);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const products = JSON.parse(await readFile(global.fileProducts));

    const index = products.products.findIndex(
      (prd) => prd.id === parseInt(req.params.title)
    );
    if (index === -1) {
      throw new Error('Product not found.');
    }

    const product = products.products[index];

    global.logger.info(`GET /products/:name - ${product.id}`);
    res.send(product);
  } catch (err) {
    next(err);
  }
});

router.get('/:category', async (req, res, next) => {
  try {
    const products = JSON.parse(await readFile(global.fileProducts));

    const filteredProds = products.products.filter(
      (prd) => prd.category === req.params.category
    );

    global.logger.info(`GET /products/:category - ${req.params.category}`);
    res.send(filteredProds);
  } catch (err) {
    next(err);
  }
});

router.patch('/edit-product', async (req, res, next) => {
  try {
    let edditedProduct = req.body;

    if (
      !edditedProduct.id ||
      !edditedProduct.title ||
      !edditedProduct.description ||
      !edditedProduct.price ||
      !edditedProduct.category
    ) {
      throw new Error('Missing required parameters.');
    }

    const products = JSON.parse(await readFile(global.fileProducts));

    const index = products.products.findIndex(
      (prd) => prd.id === parseInt(edditedProduct.id)
    );
    if (index === -1) {
      throw new Error('Product not found.');
    }

    products.products[index].title = edditedProduct.title;
    products.products[index].description = edditedProduct.description;
    products.products[index].price = edditedProduct.price;
    products.products[index].category = edditedProduct.category;
    await writeFile(global.fileProducts, JSON.stringify(products, null, 2));

    global.logger.info(`PATCH /edit-product ${edditedProduct.title}`);
    const resString = `Product successfully edited.`;
    res.send(resString);
  } catch (err) {
    next(err);
  }
});

router.delete('/delete/:id', async (req, res, next) => {
  try {
    if (!req.params.id) {
      throw new Error('Missing required parameters.');
    }

    const products = JSON.parse(await readFile(global.fileProducts));

    const isIndex = products.products.findIndex((prd) => {
      prd.id === req.params.id;
    });
    if (index === -1) {
      throw new Error('Product not found.');
    }
    const deletedProduct = products.products[isIndex];

    products.products = products.products.filter((prd) => prd.id !== isIndex);

    await writeFile(global.fileProducts, JSON.stringify(products, null, 2));
    global.logger.info(`DELETE /product/:title - ${req.params.title}`);
    res.send(`Successfully deleted product ${JSON.stringify(deletedProduct)}`);
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res) => {
  global.logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
  res.status(400).send({ error: err.message });
});

export default router;
