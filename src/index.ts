import { users } from "./database";
import { products } from "./database";
import { purchases } from "./database";
import express, { Request, Response } from "express";
import cors from "cors";
import { TProduct, TPurchase, TUser, CATEGORIES } from "./types";
import { db } from "./database/Knex";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

app.get("/ping", (req: Request, res: Response) => {
  res.send("Pong!");
});

//GetAllUsers
app.get("/users", async (req: Request, res: Response) => {
  try {
    const result = await db.raw(`
            SELECT * FROM users;       
       `);

    res.status(200).send({ Users: result });
  } catch (error: any) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    res.send(error.message);
  }
});

//GetAllProducts
app.get("/products", async (req: Request, res: Response) => {
  try {
    const result = await db.raw(`
            SELECT * FROM products;       
       `);

    res.status(200).send(result);
  } catch (error: any) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    res.send(error.message);
  }
});

//SearchProductsName
app.get("/products/search", async (req: Request, res: Response) => {
  try {
    const q = req.query.q as string;

    if (q !== undefined) {
      if (q.length < 1) {
        res.status(400);
        throw new Error("'q' deve possuir ao menos um caracter");
      }
    } else {
      res.status(400);
      throw new Error("'q' precisa ser definido");
    }

    const result = await db.raw(`
          SELECT *
          FROM products
          WHERE LOWER(name) LIKE("%${q}%");
       `);

    res.status(200).send(result);
  } catch (error: any) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    res.send(error.message);
  }
});

//CreateUser
app.post("/users", async (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    const email = req.body.email;
    const password = req.body.password;

    if (id !== undefined) {
      if (typeof id !== "string") {
        res.status(400);
        throw new Error("Id do user deve ser uma string");
      }

      // Nao pode haver repeticao de id
      for (let i = 0; i < users.length; i++) {
        if (users[i].id === id) {
          res.status(400);
          throw new Error("Já existe um user com esse id");
        }
      }
    } else {
      res.status(400);
      throw new Error("User precisa ter um id");
    }

    if (email !== undefined) {
      if (typeof email !== "string") {
        res.status(400);
        throw new Error("Email do user deve ser uma string");
      }

      // Nao pode haver repeticao de email
      for (let i = 0; i < users.length; i++) {
        if (users[i].email === email) {
          res.status(400);
          throw new Error("Já existe um user com esse email");
        }
      }
    } else {
      res.status(400);
      throw new Error("User precisa ter um email");
    }

    if (password !== undefined) {
      if (typeof password !== "string") {
        res.status(400);
        throw new Error("Password do user deve ser uma string");
      }
    } else {
      res.status(400);
      throw new Error("User precisa ter um password");
    }

    const result = await db.raw(`
    INSERT INTO
    users (id, email, password)
      VALUES (
        "${id}",
        "${email}",
        "${password}"
      );
       `);

    res.status(201).send("Usuário criado com sucesso");
  } catch (error: any) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    res.send(error.message);
  }
});

//CreateProduct
app.post("/products", async (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    const name = req.body.name;
    const price = req.body.price;
    const category = req.body.category;

    if (id !== undefined) {
      if (typeof id !== "string") {
        res.status(400);
        throw new Error("Id deve ser uma string");
      }

      // Id do produto nao pode se repetir
      for (let i = 0; i < products.length; i++) {
        if (products[i].id === id) {
          res.status(400);
          throw new Error("Já existe um produto com esse id");
        }
      }
    } else {
      res.status(400);
      throw new Error("Produto deve ter um id");
    }

    if (name !== undefined) {
      if (typeof name !== "string") {
        res.status(400);
        throw new Error("Nome do produto deve ser uma string");
      }
    } else {
      res.status(400);
      throw new Error("Produto deve ter um nome");
    }

    if (price !== undefined) {
      if (typeof price !== "number") {
        res.status(400);
        throw new Error("Preço do produto deve ser um número");
      }
    } else {
      res.status(400);
      throw new Error("Produto deve ter um preço");
    }

    if (category != undefined) {
      if (
        category !== "Acessórios" &&
        category !== "Roupas" &&
        category !== "Eletrônicos"
      ) {
        res.status(400);
        throw new Error("Produto deve ter uma categoria existente");
      }
    } else {
      res.status(400);
      throw new Error("Produto deve ter uma categoria");
    }

    const result = await db.raw(`
    INSERT INTO
    products (id, name, price, category)
      VALUES (
        "${id}",
        "${name}",
        "${price}",
        "${category}"
      );     
       `);

    res.status(201).send("Produto criado com sucesso");
  } catch (error: any) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    res.send(error.message);
  }
});
//CreatePurchase
app.post("/purchases", async (req: Request, res: Response) => {
  try {
    const { id, buyer, totalPrice, paid } = req.body;

    if (id !== undefined) {
      if (typeof id !== "string") {
        res.status(400);
        throw new Error("id deve ser uma string");
      }

      // Id do usuario deve existir
      // const userExists = users.find((user) => user.id === id);
      const userExists = await db.raw(`
      SELECT * FROM users WHERE id=${buyer};    
         `);
      if (userExists.length < 1) {
        res.status(404);
        throw new Error("Não há um usuário com esse id");
      }
    } else {
      res.status(400);
      throw new Error("Compra deve ter um id de usuário");
    }

    if (id !== undefined) {
      if (typeof id !== "string") {
        res.status(400);
        throw new Error("productId deve ser uma string");
      }
    }

    // Id do produto deve existir
    // const productExists = products.find((product) => product.id === id);
    //   const productExists = await db.raw(`
    //   SELECT * FROM product WHERE id=${id};
    //      `);
    //   if (!productExists) {
    //     res.status(404);
    //     throw new Error("Não há um produto com esse id");
    //   }
    // } else {
    //   res.status(400);
    //   throw new Error("Compra deve ter um id de produto");
    // }

    // if (quantity !== undefined) {
    //   if (typeof quantity !== "number") {
    //     res.status(400);
    //     throw new Error("Quantidade de produtos comprados deve ser um número");
    //   }
    // } else {
    //   res.status(400);
    //   throw new Error("Compra deve ter uma quantidade de produtos comprados");
    // }

    if (totalPrice !== undefined) {
      if (typeof totalPrice !== "number") {
        res.status(400);
        throw new Error("Preço total da compra deve ser um número");
      }
    }

    //TOTAL PRICE DEVE SER CONDIZENTE COM A QUANTIDADE E PREÇO DO PRODUTO

    //   const product = products.find((product) => product.id === productId);
    //   const { price }: any = product;
    //   if (price * quantity !== totalPrice) {
    //     res.status(400);
    //     throw new Error(
    //       "Preço total da compra não condizente com quantidade e preço do produto"
    //     );
    //   }
    // } else {
    //   res.status(400);
    //   throw new Error("Compra deve ter um preço total");
    // }

    const result = await db.raw(`
    INSERT INTO
    purchases (
        id,
        buyer,
        total_price,
        create_at,
        paid
    )
VALUES ("${id}", "${buyer}", "${totalPrice}", DATE('now'), "${paid}");    
       `);

    res.status(201).send("Compra criada com sucesso");
  } catch (error: any) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    res.send(error.message);
  }
});

//GetProductId
app.get("/products/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const productFound = await db.raw(`
      SELECT * FROM products WHERE id=${id};    
         `);

    if (productFound.length < 1) {
      res.status(400);
      throw new Error("Produto não existe");
    }

    res.status(200).send(productFound);
  } catch (error: any) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    res.send(error.message);
  }
});

//GetPourchaseId
app.get("/users/:id/purchases", async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    const result = await db.raw(`
      SELECT * FROM purchases WHERE buyer=${userId};    
         `);

    if (result.length < 1) {
      res.status(404);
      throw new Error("Compra não encontrada");
    }

    res.status(200).send(result);
  } catch (error: any) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});

//DeleteUser
app.delete("/accounts/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const indexToRemove = users.findIndex((user) => user.id === id);
    if (indexToRemove >= 0) {
      users.splice(indexToRemove, 1);
    } else {
      res.status(400);
      throw new Error("Usuário não existe");
    }
    res.status(200).send("Usuário deletado com sucesso");
  } catch (error: any) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    res.send(error.message);
  }
});

//DeleteProduct
app.delete("/product/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const indexToRemove = products.findIndex((product) => product.id === id);
    if (indexToRemove >= 0) {
      products.splice(indexToRemove, 1);
    } else {
      res.status(400);
      throw new Error("Produto não existe");
    }
    res.status(200).send("Produto deletado com sucesso");
  } catch (error: any) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    res.send(error.message);
  }
});

//EditUserId

app.put("/user/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const email = req.body.email;
    const password = req.body.password;

    const user = users.find((user) => user.id === id);

    if (!user) {
      res.status(404);
      throw new Error("Usuário não encontrado");
    }

    if (email !== undefined) {
      if (typeof email !== "string") {
        res.status(400);
        throw new Error("Email deve ser uma string");
      }
    }

    if (password !== undefined) {
      if (typeof password !== "string") {
        res.status(400);
        throw new Error("Senha deve ser uma string");
      }
    }

    // Atualização dos dados
    user.email = email || user.email;
    user.password = password || user.password;

    res.status(200).send("Cadastro atualizado com sucesso");
  } catch (error: any) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});

//EditProductId

app.put("/product/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const name = req.body.name;
    const price = req.body.price;
    const category = req.body.category;

    const product = products.find((product) => product.id === id);

    if (!product) {
      res.status(404);
      throw new Error("Produto não encontrado");
    }

    if (name !== undefined) {
      if (typeof name !== "string") {
        res.status(400);
        throw new Error("Nome do produto deve ser uma string");
      }
    }

    if (price !== undefined) {
      if (typeof price !== "number") {
        res.status(400);
        throw new Error("Preço do produto deve ser um número");
      }
    }

    if (category !== undefined) {
      if (
        category !== "Acessórios" &&
        category !== "Roupas" &&
        category !== "Eletrônicos"
      ) {
        res.status(400);
        throw new Error("Categoria deve ser uma das existentes");
      }
    }

    // Atualizando os dados
    product.name = name || product.name;
    product.price = price || product.price;
    product.category = category || product.category;

    res.status(200).send("Produto atualizado com sucesso!");
  } catch (error: any) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});
