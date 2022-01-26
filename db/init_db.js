// code to build and initialize DB goes here
const {
  client
  // createUser, createProducts, etc. 
} = require('./index');

async function buildTables() {
  try {
    client.connect();
      await client.query(`
        DROP TABLE IF EXISTS users, products, orders, order_products;
      `);
  
      await client.query(`
      CREATE TABLE users(
        id SERIAL PRIMARY KEY, 
        firstname VARCHAR(255) NOT NULL, 
        lastname VARCHAR(255) NOT NULL, 
        email VARCHAR(255) UNIQUE NOT NULL, 
        "imgURL" DEFAULT VALUE, 
        username VARCHAR(255) NOT NULL, 
        password VARCHAR(255) NOT NULL, 
        "isAdmin" BOOLEAN DEFAULT false,
        address NOT NULL
      );
    `);
    await client.query(`
    CREATE TABLE products(
      id SERIAL PRIMARY KEY, 
      name VARCHAR(255) UNIQUE NOT NULL, 
      description STRING, 
      price INTEGER NOT NULL, 
      "imgURL" DEFAULT VALUE,  
      "isStock" BOOLEAN DEFAULT true,
      category NOT NULL
    );
  `);

  await client.query(`
  CREATE TABLE orders(
    id SERIAL PRIMARY KEY, 
    status DEFAULT "created", 
    “userID” INTEGER REFERENCES users(id), 
    "datePlaced" date
  );
`);

await client.query(`
  CREATE TABLE order_products(
    id SERIAL PRIMARY KEY, 
    "productId" INTEGER REFERENCES products(id),
    “orderId” INTEGER REFERENCES orders(id), 
    price INTEGER NOT NULL,
    quantity INTEGER NOT NULL DEFAULT VALUE 0,
    “userID” INTEGER REFERENCES users(id)
  );
`);

  } catch (error) {
    throw error;
  }
}
/* 

Seed data 

*/


async function populateInitialData() {
  try {
    // create useful starting data
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());