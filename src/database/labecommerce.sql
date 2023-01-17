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