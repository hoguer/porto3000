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
        name: "Smoked Gouda",
        description: "A Dutch cheese with an edible dark rind and a creamy interior. The cheese is  buttery and mild with a slightly sweet caramel undertone. ",
        imgURL: "https://images.pexels.com/photos/773253/pexels-photo-773253.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        inStock: true,
        price: "$20",
        category: "cheese"
      },
      {
        productId: 22,
        name: "Brie",
        description: "A soft pale colored cheese made from cow’s milk. The cheese has a mild, buttery, and creamy taste that makes it a versatile cheese. A great choice for those new to wine and cheese pairings.",
        imgURL: "https://images.pexels.com/photos/773253/pexels-photo-773253.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        inStock: true,
        price: "$9",
        category: "cheese"
      },
      {
        productId: 23,
        name: "Gruyere",
        description: "A firm, yellow Swiss cheese that is sweet and slightly salty. The flavor of the cheese will vary by age. Like a typical facebook relationship status, it’s flavor is 'complicated.'",
        imgURL: "https://images.pexels.com/photos/773253/pexels-photo-773253.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        inStock: true,
        price: "$12",
        category: "cheese"
      },
      {
        productId: 24,
        name: "Gorgonzola",
        description: "A veined blue cheese created from unskimmed cow’s milk. A full flavored cheese that is salty and earthy. Eating this cheese will bring memories of a quiet barn settled in a beautiful field of flowers.",
        imgURL: "https://images.pexels.com/photos/773253/pexels-photo-773253.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        inStock: true,
        price: "$8",
        category: "cheese"
      },
      {
        productId: 25,
        name: "Goat Cheese",
        description: "A soft, fresh cheese made from goat’s milk with a tart but earthy profile. Wonderfully pairs with your choice of red wine or crumbled over a fresh salad.",
        imgURL: "https://images.pexels.com/photos/773253/pexels-photo-773253.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        inStock: true,
        price: "$5",
        category: "cheese"
      },
      {
        productId: 26,
        name: "Aged Cheddar",
        description: "A dense, solid cow’s milk cheese with a flaky texture. This cheese has a slightly tangier finish with hard salt-like crystals that will add a crunch to your bite and a smile on your face.",
        imgURL: "https://images.pexels.com/photos/773253/pexels-photo-773253.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        inStock: true,
        price: "$37",
        category: "cheese"
      },
      {
        productId: 27,
        name: "Havarti",
        description: "A smooth washed-curd cheese that can be with a subtle flavor. Pairs well with a Pinot Noir or Merlot of your choice. Tastes heavenly in a grilled cheese sandwich as well.",
        imgURL: "https://images.pexels.com/photos/773253/pexels-photo-773253.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        inStock: true,
        price: "$10",
        category: "cheese"
      },
      {
        productId: 28,
        name: "Manchego",
        description: "A cheese from the La Manch region of Spain. This cheese is carefully crafted with the milk of a Manchega sheep and will vary in age from 60 days to 2 years. The flavor profile of this cheese is INTENSE! Manchego has a zesty taste and crumbly texture that is rich, full, and just ever so slightly salty.",
        imgURL: "https://images.pexels.com/photos/773253/pexels-photo-773253.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        inStock: true,
        price: "$18",
        category: "cheese"
      },
      {
        productId: 29,
        name: "Pecorino Toscano",
        description: "A firm-textured ewe’s milk cheese sourced from Tuscany. This versatile cheese has a dense and nutty flavor with a wonderfully rustic finish.",
        imgURL: "https://images.pexels.com/photos/773253/pexels-photo-773253.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        inStock: true,
        price: "$22",
        category: "cheese"
      },
      {
        productId: 30,
        name: "Fiore Sardo",
        description: "A firm, savoury, piquant and smoky flavored chees. The flavor will vary based on the level of ripening and additional hints of dried fruits and an grassy aroma.",
        imgURL: "https://images.pexels.com/photos/773253/pexels-photo-773253.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        inStock: true,
        price: "$18",
        category: "cheese"
      },
      {
        productId: 31,
        name: "Gouda",
        description: "The people’s favorite! A sweet and creamy cheese made from yellow cow’s milk. Pairs well with a Cabernet Franc of your choice.",
        imgURL: "https://images.pexels.com/photos/773253/pexels-photo-773253.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        inStock: true,
        price: "$6",
        category: "cheese"
      },
      {
        productId: 32,
        name: "Feta",
        description: "A tangy and salty cheese. This cheese will crumble like your favorite baked pastry.",
        imgURL: "https://images.pexels.com/photos/773253/pexels-photo-773253.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        inStock: true,
        price: "$4",
        category: "cheese"
      },
      {
        productId: 33,
        name: "Brie",
        description: "A soft pale colored cheese made from cow’s milk. The cheese has a mild, buttery, and creamy taste that makes it a versatile cheese. A great choice for those new to wine and cheese pairings.",
        imgURL: "https://images.pexels.com/photos/773253/pexels-photo-773253.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        inStock: true,
        price: "$9",
        category: "cheese"
      },
      {
        productId: 34,
        name: "Brie",
        description: "A soft pale colored cheese made from cow’s milk. The cheese has a mild, buttery, and creamy taste that makes it a versatile cheese. A great choice for those new to wine and cheese pairings.",
        imgURL: "https://images.pexels.com/photos/773253/pexels-photo-773253.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        inStock: true,
        price: "$9",
        category: "cheese"
      },
      {
        productId: 35,
        name: "Brie",
        description: "A soft pale colored cheese made from cow’s milk. The cheese has a mild, buttery, and creamy taste that makes it a versatile cheese. A great choice for those new to wine and cheese pairings.",
        imgURL: "https://images.pexels.com/photos/773253/pexels-photo-773253.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        inStock: true,
        price: "$9",
        category: "cheese"
      },
      {
        productId: 36,
        name: "Brie",
        description: "A soft pale colored cheese made from cow’s milk. The cheese has a mild, buttery, and creamy taste that makes it a versatile cheese. A great choice for those new to wine and cheese pairings.",
        imgURL: "https://images.pexels.com/photos/773253/pexels-photo-773253.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
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