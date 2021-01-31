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

router.get('/:title', async (req, res, next) => {
  try {
    const products = JSON.parse(await readFile(global.fileProducts));

    const index = products.products.findIndex(
      (prd) => prd.title === req.params.title
    );
    if (index === -1) {
      throw new Error('Product not found.');
    }

    //Considering its not permitted to deliver the id to the user
    const product = {
      title: products.products[index].title,
      description: products.products[index].description,
      price: products.products[index].price,
      category: products.products[index].category,
    };

    global.logger.info(`GET - /products/:name - ${product.title}`);
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

    //Considering its not permitted to deliver the id to the user
    const mappedFilteredProds = filteredProds.map((prod) => {
      return {
        title: prod.title,
        description: prod.description,
        price: prod.price,
        category: prod.category,
      };
    });

    global.logger.info(`GET - /products/:category - ${req.params.category}`);
    res.send(mappedFilteredProds);
  } catch (err) {
    next(err);
  }
});

router.patch('/edit-product', async (req, res, next) => {
  try {
    let edditedProduct = req.body;

    if (
      !edditedProduct.title ||
      !edditedProduct.description ||
      !edditedProduct.price ||
      !edditedProduct.category
    ) {
      throw new Error('Missing required parameters.');
    }

    const products = JSON.parse(await readFile(global.fileProducts));
  } catch (err) {
    next(err);
  }
});

router.delete('/delete/:title', (req, res, next) => {
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
