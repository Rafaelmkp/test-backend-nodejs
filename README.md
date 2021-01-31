# Product Catalog API

##### Important Documents

[Portuguese README](/LEIAME.md)  
[Unit Tests](/Unit-Tests.md)

##### Introduction

This is an API for a product catalog management. It includes basic operations, such as creating and editing products, according to the user stories below.
Data persistency is made with JSON files.

### Content:

-[1. User Stories](#item1)  
-[2. Endpoints and paremeters](#item2)  
-[3. Tools and Technologies](#item3)

### <a name="item1"></a> 1. User Stories

> <a name="item11"></a>1.1 - As a user I would like to register a product so that I can have access to the data of this product in the future (Title, description, price, category);

> <a name="item12"></a>1.2 - I as a user would like to be able to associate and edit a product category;

> <a name="item13"></a>1.3 - As a user I would like to be able to access the list of all products;

> <a name="item14"></a>1.4 - As a user I would like to be able to filter products by name or category;

> <a name="item15"></a>1.5 - I as a user would like to be able to update the product data;

> <a name="item16"></a>1.6 - I as a user would like to be able to delete a product from my catalog;

### <a name="item2"></a> 2. Endpoints and paremeters

| Method | Endpoint                | Purpose                               | Related User Story |
| ------ | ----------------------- | ------------------------------------- | ------------------ |
| POST   | /products/new-product   | To create a new product               | [[1](#item11)]     |
| POST   | /products/new-category  | To create a new category              | [[2](#item12)]     |
| PUT    | /products/edit-category | To modify an existent category        | [[2](#item12)]     |
| GET    | /products/all           | To query all existing products        | [[3](#item13)]     |
| GET    | /products/:id           | To query a given product              | [[4](#item14)]     |
| GET    | /products/:category     | To query products of a given category | [[4](#item14)]     |
| PATCH  | /products/edit-product  | To modify an existent product         | [[5](#item15)]     |
| DELETE | /products/delete/:id    | To delete a given product             | [[6](#item16)]     |

#### Required parameters

##### /products/new-product:

-title _(body)_
-description _(body)_
-price _(body)_
-category _(body)_
_Note:_ Endpoint will only work with existing categories.

##### /products/new-category:

-name _(body)_

##### /products/edit-category:

-id _(body)_
-name _(body)_

##### /products/all

_(none)_

##### /products/:id

-id _(url)_

##### /products/:category

-id _(url)_

##### /products/edit-product:

-id _(body)_
-title _(body)_
-description _(body)_
-price _(body)_
-category _(body)_  
_Note:_ Endpoint will only work with existing categories.

##### /products/delete/:id

-id _(url)_

### <a name="item3"></a> 3. Tools and Tecnologies

| Name       | Purpose/description |
| ---------- | ------------------- |
| JavaScript | Core technology     |
| NodeJS     | Server              |
| ExpressJS  | Library - endpoints |
| Winston    | Library - logger    |
| VS Code    | Text editor         |
| Insomnia   | Endpoint tests      |
