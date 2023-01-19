-- Active: 1673889567391@@127.0.0.1@1433

CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    );

CREATE TABLE
    products (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        category TEXT NOT NULL
    );

select * from users;

select * from PRODUCTS;

INSERT INTO
    users (id, email, password)
VALUES (
        "1",
        "gustavo@gustavo.com",
        "123456"
    ), (
        "2",
        "ryzia@ryzia.com",
        "78910"
    ), (
        "3",
        "qualquer@qualquer.com",
        "54321"
    );

INSERT INTO
    products (id, name, price, category)
VALUES (
        "1",
        "blusa",
        25,
        "Roupas e calçados"
    ), ("2", "óculos", 30, "Acessórios"), (
        "3",
        "sapato",
        20,
        "Roupas e calçados"
    ), (
        "4",
        "celular",
        300,
        "Eletrônicos"
    ), (
        "5",
        "Playstation 5",
        2500,
        "Eletrônicos"
    );

--Get All User

SELECT * FROM users ORDER BY email ASC;

--Get All Products 1

SELECT * FROM products ORDER BY price ASC LIMIT 20;

--Get All Products 2

SELECT *
FROM products
WHERE PRICE >= 25 AND PRICE <= 300
ORDER BY price ASC;

--Search Product by name

SELECT * FROM products WHERE name="blusa";

--Create User

INSERT INTO
    users (id, email, password)
VALUES (
        "1",
        "gustavo@gustavo.com",
        "123456"
    );

--Create Product

INSERT INTO
    products (id, name, price, category)
VALUES (
        "1",
        "blusa",
        25,
        "Roupas e calçados"
    );

--Get Products by id

SELECT *
FROM products
WHERE id = 2 --Delete User by id
DELETE FROM users
WHERE id = 1;

--Delete Product by id

DELETE FROM products WHERE id=2;

--Edit User by id

UPDATE users
SET
    id = 2,
    email = 'email@email.com',
    password = 123456
WHERE id = 2;

--Edit Product by id

UPDATE products
SET
    id = 2,
    name = 'produto',
    price = 30,
    category = "acessórios"
WHERE id = 2;

CREATE TABLE
    purchases(
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        total_price REAL UNIQUE NOT NULL,
        paid INTEGER NOT NULL,
        delivered_at TEXT,
        buyer_id TEXT NOT NULL,
        FOREIGN KEY (buyer_id) REFERENCES users (id)
    );

INSERT INTO
    purchases (
        id,
        total_price,
        paid,
        delivered_at,
        buyer_id
    )
VALUES ("2", 150, 0, null, 2), ("3", 200, 0, null, 2), ("4", 250, 1, null, 3), ("1", 50, 1, null, 1);

--Edit delivered_at FROM purchases para data e hora atual

UPDATE purchases
SET
    delivered_at = DATETIME("now", "localtime")
WHERE id = 4;

SELECT * FROM purchases;

--SELECT purchases de um usuário específico juntando a tabela users e purchases

SELECT *
FROM purchases
    INNER JOIN users ON purchases.buyer_id = users.id
WHERE users.id = 1;

CREATE TABLE
    purchases_products(
        purchase_id TEXT NOT NULL,
        product_id TEXT NOT NULL,
        quantity INTEGER NOT NULL
    );

SELECT * FROM purchases_products;

INSERT INTO
    purchases_products (
        purchase_id,
        product_id,
        quantity
    )
VALUES ("1", "1", 2), ("2", "2", 5), ("3", "3", 10);

SELECT *
FROM purchases
    LEFT JOIN purchases_products ON purchases.id = purchases_products.purchase_id
    INNER JOIN products ON products.id = purchases_products.product_id;