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