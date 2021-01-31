# Unit Tests

---

### Route: POST /products/new-product

#### Test 1

| Parameter-name | Parameter-value       | Parameter-type |
| -------------- | --------------------- | -------------- |
| title          | Smartphone brand xy   | body           |
| description    | Processor 660 6gb RAM | body           |
| price          | 1500.00               | body           |
| category       | smartphone            | body           |

**Expected result:** New Product - {"id":2,"title":"Smartphone brand xy","description":"Processor 660 6gb RAM","price":1500,"category":"smartphone"}.

#### Test 2

| Parameter-name | Parameter-value   | Paremeter-type |
| -------------- | ----------------- | -------------- |
| title          | Smartphone abc123 | body           |
| description    |                   | body           |
| price          | 2300.00           | body           |
| category       | smartphone        | body           |

**Expected result:** "error": "Missing required parameters."

#### Test 3

| Parameter-name | Parameter-value  | Parameter-type |
| -------------- | ---------------- | -------------- |
| title          | SmartTV brand123 | body           |
| description    | LED 42           | body           |
| category       | tv               | body           |

**Expected result:** "error": "Missing required parameters."

#### Test 4

| Parameter-name | Parameter-value    | Parameter-type |
| -------------- | ------------------ | -------------- |
| title          | SmartTV some brand | body           |
| description    | LED 32             | body           |
| price          | 2300.00            | body           |
| category       | not-a-brand        | body           |

**Expected result:** "error": "Category doesnt exist."

---

### Route: POST /products/new-category

#### Test 1

| Parameter-name | Parameter-value | Parameter-type |
| -------------- | --------------- | -------------- |
| title          | smartphone      | body           |

**Expected result:** New category added - Name: smartphone

---

### Route: PUT /products/edit-categor/:category

_(In development...)_

---

### Route: GET /products/all

_(In development...)_

---

### Route: GET /products/:title

_(In development...)_

---

### Route: GET /products/:category

_(In development...)_

---

### Route: PATCH /products/edit-product

_(In development...)_

---

### Route: DELETE /products/delete/:title

_(In development...)_
