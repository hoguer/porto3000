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
    console.log("populating our wine and cheese tables")
    const 


    const wineAndCheeseData = [
      {
        productId: 1,
        name: "Port Wine",
        description: "2016, Red Wine",
        imgURL: "https://www.customscene.co/wp-content/uploads/2020/01/wine-bottle-mockup-thumbnail.jpg",
        inStock: true,
        price: "$88",
        category: "wine"
      },
      {
        productId: 2,
        name: "Cabernet Sauvignon",
        description: "2018, Red Wine",
        imgURL: "https://www.customscene.co/wp-content/uploads/2020/01/wine-bottle-mockup-thumbnail.jpg",
        inStock: true,
        price: "$35",
        category: "wine"
      },
      {
        productId: 3,
        name: "Pinot Noir",
        description: "2019, Red Wine",
        imgURL: "https://www.customscene.co/wp-content/uploads/2020/01/wine-bottle-mockup-thumbnail.jpg",
        inStock: true,
        price: "$28",
        category: "wine"
      },
      {
        productId: 4,
        name: "Merlot",
        description: "2017, Red Wine",
        imgURL: "https://www.customscene.co/wp-content/uploads/2020/01/wine-bottle-mockup-thumbnail.jpg",
        inStock: true,
        price: "$80",
        category: "wine"
      },
      {
        productId: 5,
        name: "Zinfandel",
        description: "2019, Red Wine",
        imgURL: "https://www.customscene.co/wp-content/uploads/2020/01/wine-bottle-mockup-thumbnail.jpg",
        inStock: true,
        price: "$50",
        category: "wine"
      },
      {
        productId: 6,
        name: "Petite Sirah",
        description: "2017, Red Wine",
        imgURL: "https://www.customscene.co/wp-content/uploads/2020/01/wine-bottle-mockup-thumbnail.jpg",
        inStock: true,
        price: "$60",
        category: "wine"
      },
      {
        productId: 7,
        name: "Sauvignon Blanc",
        description: "2020, White Wine",
        imgURL: "https://www.customscene.co/wp-content/uploads/2020/01/wine-bottle-mockup-thumbnail.jpg",
        inStock: true,
        price: "$28",
        category: "wine"
      },
      {
        productId: 8,
        name: "Chardonnay",
        description: "2018, White Wine",
        imgURL: "https://www.customscene.co/wp-content/uploads/2020/01/wine-bottle-mockup-thumbnail.jpg",
        inStock: true,
        price: "$35",
        category: "wine"
      },
      {
        productId: 9,
        name: "Pinot Gris",
        description: "2020, White Wine",
        imgURL: "https://www.customscene.co/wp-content/uploads/2020/01/wine-bottle-mockup-thumbnail.jpg",
        inStock: true,
        price: "$28",
        category: "wine"
      },
      {
        productId: 10,
        name: "Rose",
        description: "2018, Rose Wine",
        imgURL: "https://www.customscene.co/wp-content/uploads/2020/01/wine-bottle-mockup-thumbnail.jpg",
        inStock: true,
        price: "$28",
        category: "wine"
      },
      {
        productId: 11,
        name: "Cabernet Franc",
        description: "2015, Red Wine",
        imgURL: "https://www.customscene.co/wp-content/uploads/2020/01/wine-bottle-mockup-thumbnail.jpg",
        inStock: true,
        price: "$35",
        category: "wine"
      },
      {
        productId: 12,
        name: "Carmenere",
        description: "2017, Red Wine",
        imgURL: "https://www.customscene.co/wp-content/uploads/2020/01/wine-bottle-mockup-thumbnail.jpg",
        inStock: true,
        price: "$15",
        category: "wine"
      },
      {
        productId: 13,
        name: "Gewurztraminer",
        description: "2014, White Wine",
        imgURL: "https://www.customscene.co/wp-content/uploads/2020/01/wine-bottle-mockup-thumbnail.jpg",
        inStock: true,
        price: "$25",
        category: "wine"
      },
      {
        productId: 14,
        name: "Grenache",
        description: "2019, Red Wine",
        imgURL: "https://www.customscene.co/wp-content/uploads/2020/01/wine-bottle-mockup-thumbnail.jpg",
        inStock: true,
        price: "$375",
        category: "wine"
      },
      {
        productId: 15,
        name: "Nebbiolo",
        description: "2008, Red Wine",
        imgURL: "https://www.customscene.co/wp-content/uploads/2020/01/wine-bottle-mockup-thumbnail.jpg",
        inStock: true,
        price: "$115",
        category: "wine"
      },
      {
        productId: 16,
        name: "Malbec",
        description: "2013, Red Wine",
        imgURL: "https://www.customscene.co/wp-content/uploads/2020/01/wine-bottle-mockup-thumbnail.jpg",
        inStock: true,
        price: "$20",
        category: "wine"
      },
      {
        productId: 17,
        name: "Muscat Ottonel",
        description: "2015, White Wine",
        imgURL: "https://www.customscene.co/wp-content/uploads/2020/01/wine-bottle-mockup-thumbnail.jpg",
        inStock: true,
        price: "$15",
        category: "wine"
      },
      {
        productId: 18,
        name: "Riesling",
        description: "2015, White Wine",
        imgURL: "https://www.customscene.co/wp-content/uploads/2020/01/wine-bottle-mockup-thumbnail.jpg",
        inStock: true,
        price: "$68",
        category: "wine"
      },
      {
        productId: 19,
        name: "Semillon",
        description: "2021, White Wine",
        imgURL: "https://www.customscene.co/wp-content/uploads/2020/01/wine-bottle-mockup-thumbnail.jpg",
        inStock: true,
        price: "$20",
        category: "wine"
      },
      {
        productId: 20,
        name: "Tempranillo",
        description: "2019, Red Wine",
        imgURL: "https://www.customscene.co/wp-content/uploads/2020/01/wine-bottle-mockup-thumbnail.jpg",
        inStock: true,
        price: "$35",
        category: "wine"
      },
      {
        productId: 21,
        name: "Brie",
        description: "A soft pale colored cheese made from the milk of a cow.",
        imgURL: "https://www.customscene.co/wp-content/uploads/2020/01/wine-bottle-mockup-thumbnail.jpg",
        inStock: true,
        price: "$9",
        category: "cheese"
      },
    ]

  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());