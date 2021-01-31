# API para Catálogo de Produtos

##### Documentos Importantes

[README em Inglês](/README.md)
[Testes Unitários](/Unit-Tests.md)

##### Introdução

Esta é uma API para gerenciamento de catálogo de produtos. Inclui operações básicas, como a criação e edição de produtos, conforme histórias de usuário abaixo.  
A persistência de dados é feita com arquivos JSON.

### Conteúdo:

-[1. Histórias de Usuário](#item1)  
-[2. Endpoints e parâmetros](#item2)  
-[3. Ferramentas e Tecnologias](#item3)

### <a name="item1"></a> 1. Histórias de Usuário

> <a name="item11"></a>1.1 - Como usuário eu gostaria de registrar um produto para que possa acessar informações desse produto no futuro (Nome, descrição, preço, categoria);

> <a name="item12"></a>1.2 - eu como usuário gostaria de poder associar e editar uma categoria de produto;

> <a name="item13"></a>1.3 - eu como usuário gostaria de poder acessar uma lista de todos os produtos;

> <a name="item14"></a>1.4 - eu como usuário gostaria de filtrar produtos por nome ou categoria;

> <a name="item15"></a>1.5 - eu como usuário gostaria de poder atualizar os dados de um produto;

> <a name="item16"></a>1.6 - eu como usuário gostaria de poder deletar um produto do meu catálogo;

### <a name="item2"></a> 2. Rotas e Parâmetros

| Método | Endpoint                | Propósito                                | História de Usuário relacionada |
| ------ | ----------------------- | ---------------------------------------- | ------------------------------- |
| POST   | /products/new-product   | Criar um novo produto                    | [[1](#item11)]                  |
| POST   | /products/new-category  | Criar uma nova categoria                 | [[2](#item12)]                  |
| PUT    | /products/edit-category | Modificar uma categoria existente        | [[2](#item12)]                  |
| GET    | /products/all           | Consultar todos os produtos              | [[3](#item13)]                  |
| GET    | /products/:id           | Consultar um dado produto                | [[4](#item14)]                  |
| GET    | /products/:category     | Consultar produtos de uma dada categoria | [[4](#item14)]                  |
| PATCH  | /products/edit-product  | Modificar um produto existente           | [[5](#item15)]                  |
| DELETE | /products/delete/:id    | Deletar um dado produto                  | [[6](#item16)]                  |

#### Parâmetros Requeridos

##### /products/new-product:

-title _(body)_
-description _(body)_
-price _(body)_
-category _(body)_
_Nota:_ Endpoint só irá funcionar com categorias já existentes.

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
_Note:_ Endpoint só irá funcionar com categorias já existentes.

##### /products/delete/:id

-id _(url)_

### <a name="item3"></a> 3. Ferramentas e Tecnologias

| Nome       | Propósito/descrição    |
| ---------- | ---------------------- |
| JavaScript | Tecnologia principal   |
| NodeJS     | Servidor               |
| ExpressJS  | Biblioteca - endpoints |
| Winston    | Bilioteca - logger     |
| VS Code    | Editor de texto        |
| Insomnia   | Testes de Endpoint     |
