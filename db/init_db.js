const client = require('./client');
const { createProduct } = require("./products")
const { createUser } = require("./users")
const { defaultCheese } = require("../src/images/defaultCheese.png")

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
          "imgURL" VARCHAR(255) DEFAULT 'https://www.customscene.co/wp-content/uploads/2020/01/wine-bottle-mockup-thumbnail.jpg',
          username VARCHAR(255) UNIQUE NOT NULL, 
          password VARCHAR(255) NOT NULL, 
          "isAdmin" BOOLEAN DEFAULT false,
          address VARCHAR(255) NOT NULL
        );
      `);

      await client.query(`
        CREATE TABLE products(
          id SERIAL PRIMARY KEY, 
          name VARCHAR(255) NOT NULL, 
          description VARCHAR(1000), 
          price INTEGER NOT NULL, 
          "imgURL" VARCHAR(255) DEFAULT 'https://www.customscene.co/wp-content/uploads/2020/01/wine-bottle-mockup-thumbnail.jpg',
          "inStock" BOOLEAN DEFAULT true,
          category VARCHAR(255)
        );
      `);

      await client.query(`
        CREATE TABLE orders(
          id SERIAL PRIMARY KEY, 
          status VARCHAR(255) DEFAULT 'created', 
          "userId" INTEGER REFERENCES users(id), 
          "datePlaced" timestamp DEFAULT now()
        );
      `);

      await client.query(`
        CREATE TABLE order_products(
          id SERIAL PRIMARY KEY, 
          "productId" INTEGER REFERENCES products(id),
          "orderId" INTEGER REFERENCES orders(id), 
          price INTEGER NOT NULL,
          quantity INTEGER NOT NULL DEFAULT 0,
        );
      `);
    console.log("finished building THE tables")
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    console.log("populating our wine and cheese tables");
    const wineAndCheeseData = [
      {
        name: "Port Wine",
        description: "2016, Red Wine from Portugal: One of our most desired wines, also known as  vinho do Porto. It has a seductive, rich aroma of ripe plums, cherries, and dark chocolate notes. Pairs well with dark chocolate and goat cheese.  19.5% ABV",
        imgURL: "https://i.ibb.co/5G1N8VP/Red-wine.jpg",
        inStock: true,
        price: "88",
        category: "wine"
      },
      {
        name: "Cabernet Sauvignon",
        description: "2018, Red Wine: Our Cabernet explodes with blueberry, blackberry pie, elderberry, plum jam, slight cigar box, and mocha oak notes. Pairs well with our aged cheddar, gorgonzola, or gouda. 14% ABV",
        imgURL: "https://i.ibb.co/5G1N8VP/Red-wine.jpg",
        inStock: true,
        price: "35",
        category: "wine"
      },
      {
        name: "Pinot Noir",
        description: "2019, Red Wine: Our Pinot Noir has a wonderful body and deep color with the varietal signature notes of crushed raspberry, cranberry, and lilacs, with subtle hints of vanilla and toasted oak. Pairs well with our pecorino toscano. 14.5% ABV",
        imgURL: "https://i.ibb.co/5G1N8VP/Red-wine.jpg",
        inStock: true,
        price: "28",
        category: "wine"
      },
      {
        name: "Merlot",
        description: "2017, Red Wine: Our Merlot is energetic and fresh, revealing blueberry, blackberry, and black cherry notes with a neon tinge of violets and smoke that are tightly knit with fine-grained, elongated tannins. Pairs well with our gouda, brie, and gorgonzola. 14.6% ABV",
        imgURL: "https://i.ibb.co/5G1N8VP/Red-wine.jpg",
        inStock: true,
        price: "80",
        category: "wine"
      },
      {
        name: "Zinfandel",
        description: "2019, Red Wine: Our Zinfandel is richly concentrated with ripe boysenberry, caramel, and cooking spice and finishes with luscious tannins, a hint of bright raspberry, and perfect balance. Pairs well with our feta, manchego, and cheddar. 15.5% ABV",
        imgURL: "https://i.ibb.co/5G1N8VP/Red-wine.jpg",
        inStock: true,
        price: "50",
        category: "wine"
      },
      {
        name: "Petite Sirah",
        description: "2017, Red Wine: Our Sirah has well-balanced flavors of cherry, spices and summer savory lead to a lengthy finish with silky tannins. Pairs well with our gouda cheese. 16% ABV",
        imgURL: "https://i.ibb.co/5G1N8VP/Red-wine.jpg",
        inStock: true,
        price: "60",
        category: "wine"
      },
      {
        name: "Sauvignon Blanc",
        description: "2020, White Wine: Our Sauvignon Blanc is a treat! Bright flavors of lime, melon, and guava are vibrant and juicy. Pairs well with our havarti, cheddar, and gouda cheeses. 13.5% ABV",
        imgURL: "https://i.ibb.co/yhy94Gj/white-wine.jpg",
        inStock: true,
        price: "28",
        category: "wine"
      },
      {
        name: "Chardonnay",
        description: "2018, White Wine: Our Chardonnay is  packed full of tropical and stone fruit flavors with oak and vanilla complexity and a long, luscious, finish. Pairs well with our goat, gruyere, and gouda cheeses. 14.5% ABV",
        imgURL: "https://i.ibb.co/yhy94Gj/white-wine.jpg",
        inStock: true,
        price: "35",
        category: "wine"
      },
      {
        name: "Pinot Gris",
        description: "2020, White Wine: our Pinot Gris has exquisite flavors of pear, apple and citrus fruits. This wine has bright acidity and was aged without oak to highlight the fresh fruit. Pairs well with our fiore sardo or pecorino toscano cheeses. 14.5% ABV",
        imgURL: "https://i.ibb.co/yhy94Gj/white-wine.jpg",
        inStock: true,
        price: "28",
        category: "wine"
      },
      {
        name: "Rose",
        description: "2018, Rose Wine: Our Rosé has generous aromas of fresh strawberry and floral notes leading to bright flavors of ripe berry, cherry, and hints of spring flowers. Pairs well with our feta and cheddar cheeses. 13% ABV",
        imgURL: "https://i.ibb.co/SX4hBNT/rose.jpg",
        inStock: true,
        price: "28",
        category: "wine"
      },
      {
        name: "Cabernet Franc",
        description: "2015, Red Wine: Savor flavors of wild berries, toasted fennel seed, high-toned spice, and a hint of savoriness, all of it lingering with coffee and cocoa powder. Pairs well with our feta, goat cheese, and brie.13% ABV ",
        imgURL: "https://i.ibb.co/5G1N8VP/Red-wine.jpg",
        inStock: true,
        price: "35",
        category: "wine"
      },
      {
        name: "Carmenere",
        description: "2017, Red Wine:  Pronounced, delicious aromas of ripe red and black fruit melt into inviting chocolate, mocha and brioche. Pairs well with our brie and manchego cheeses. 14.5% ABV",
        imgURL: "https://i.ibb.co/5G1N8VP/Red-wine.jpg",
        inStock: true,
        price: "15",
        category: "wine"
      },
      {
        name: "Gewurztraminer",
        description: "2014, White Wine: Our Gewurztraminer begins with a pleasing aroma full of tropical fruit, citrus, honeysuckle and a touch of petrol. Pairs well with our gruyere cheese. 12% ABV",
        imgURL: "https://i.ibb.co/yhy94Gj/white-wine.jpg",
        inStock: true,
        price: "25",
        category: "wine"
      },
      {
        name: "Grenache",
        description: "2019, Red Wine: Our Grenache showcases aromas of black and white peppercorns, crushed cherries, and dried herbs, with a hint of grenadine before flavors of darker cherries, gently toasted vanilla pod, black raspberries, and boysenberries. Pairs well with any of our cheeses, but we recommend our goat cheese. 15% ABV",
        imgURL: "https://i.ibb.co/5G1N8VP/Red-wine.jpg",
        inStock: true,
        price: "375",
        category: "wine"
      },
      {
        name: "Nebbiolo",
        description: "2008, Red Wine: Our Nebbiolo offers plenty of oak aromas with vanilla and apricot. Pairs well with our brie, feta, or goat cheeses. 13% ABV ",
        imgURL: "https://i.ibb.co/5G1N8VP/Red-wine.jpg",
        inStock: true,
        price: "115",
        category: "wine"
      },
      {
        name: "Malbec",
        description: "2013, Red Wine:  Intense floral and fruity notes. Presence of violets, ripe black cherry and plum aromas.Pairs well with our aged cheddar or gouda. 14% ABV ",
        imgURL: "https://i.ibb.co/5G1N8VP/Red-wine.jpg",
        inStock: true,
        price: "20",
        category: "wine"
      },
      {
        name: "Muscat Ottonel",
        description: "2015, White Wine: A wine that combines sweetness and elegance in balance. Spice and cinnamon flavors give it an exotic perfumed appeal. Pairs well with our Pairs well with our brie, feta, or goat cheeses. 12.7% ABV ",
        imgURL: "https://i.ibb.co/yhy94Gj/white-wine.jpg",
        inStock: true,
        price: "15",
        category: "wine"
      },
      {
        name: "Riesling",
        description: "2015, White Wine: Our Riesling offers delicious flavors of lime and pineapple with perfectly balanced acidity that leads to a crisp and refreshing finish. Pairs well with our havarti or gorgonzola cheeses. 9% ABV",
        imgURL: "https://i.ibb.co/yhy94Gj/white-wine.jpg",
        inStock: true,
        price: "68",
        category: "wine"
      },
      {
        name: "Semillon",
        description: "2021, White Wine: Our Semillon has vibrant fruit and balanced acidity, this wine shows fragrant citrus blossom and honey aromas, with pretty layers of lemon bar, apricot and keylime expanding on a balanced finish. Pairs well with our gruyere, manchego, gouda, or smoked gouda. 14.5% ABV",
        imgURL: "https://i.ibb.co/yhy94Gj/white-wine.jpg",
        inStock: true,
        price: "20",
        category: "wine"
      },
      {
        name: "Tempranillo",
        description: "2019, Red Wine: Black cherry, tobacco, vanilla and earthy flavors mingle in this supple, rich, complex red. Pairs well with our manchego or pecorino toscano. 13% ABV ",
        imgURL: "https://i.ibb.co/5G1N8VP/Red-wine.jpg",
        inStock: true,
        price: "35",
        category: "wine"
      },
      {
        name: "Smoked Gouda",
        description: "A Dutch cheese with an edible dark rind and a creamy interior. The cheese is  buttery and mild with a slightly sweet caramel undertone. ",
        imgURL: "https://images.pexels.com/photos/773253/pexels-photo-773253.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        inStock: true,
        price: "20",
        category: "cheese"
      },
      {
        name: "Brie",
        description: "A soft pale colored cheese made from cow's milk. The cheese has a mild, buttery, and creamy taste that makes it a versatile cheese. A great choice for those new to wine and cheese pairings.",
        imgURL: "https://images.pexels.com/photos/773253/pexels-photo-773253.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        inStock: true,
        price: "9",
        category: "cheese"
      },
      {
        name: "Gruyere",
        description: "A firm, yellow Swiss cheese that is sweet and slightly salty. The flavor of the cheese will vary by age. Like a typical facebook relationship status, its flavor is 'complicated.'",
        imgURL: "https://images.pexels.com/photos/773253/pexels-photo-773253.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        inStock: true,
        price: "12",
        category: "cheese"
      },
      {
        name: "Gorgonzola",
        description: "A veined blue cheese created from unskimmed cow's milk. A full flavored cheese that is salty and earthy. Eating this cheese will bring memories of a quiet barn settled in a beautiful field of flowers.",
        imgURL: "https://images.pexels.com/photos/773253/pexels-photo-773253.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        inStock: true,
        price: "8",
        category: "cheese"
      },
      {
        name: "Goat Cheese",
        description: "A soft, fresh cheese made from goat's milk with a tart but earthy profile. Wonderfully pairs with your choice of red wine or crumbled over a fresh salad.",
        imgURL: "https://images.pexels.com/photos/773253/pexels-photo-773253.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        inStock: true,
        price: "5",
        category: "cheese"
      },
      {
        name: "Aged Cheddar",
        description: "A dense, solid cow's milk cheese with a flaky texture. This cheese has a slightly tangier finish with hard salt-like crystals that will add a crunch to your bite and a smile on your face.",
        imgURL: "https://images.pexels.com/photos/773253/pexels-photo-773253.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        inStock: true,
        price: "37",
        category: "cheese"
      },
      {
        name: "Havarti",
        description: "A smooth washed-curd cheese that can be with a subtle flavor. Pairs well with a Pinot Noir or Merlot of your choice. Tastes heavenly in a grilled cheese sandwich as well.",
        imgURL: "https://images.pexels.com/photos/773253/pexels-photo-773253.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        inStock: true,
        price: "10",
        category: "cheese"
      },
      {
        name: "Manchego",
        description: "A cheese from the La Manch region of Spain. This cheese is carefully crafted with the milk of a Manchega sheep and will vary in age from 60 days to 2 years. The flavor profile of this cheese is INTENSE! Manchego has a zesty taste and crumbly texture that is rich, full, and just ever so slightly salty.",
        imgURL: "https://images.pexels.com/photos/773253/pexels-photo-773253.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        inStock: true,
        price: "18",
        category: "cheese"
      },
      {
        name: "Pecorino Toscano",
        description: "A firm-textured ewe's milk cheese sourced from Tuscany. This versatile cheese has a dense and nutty flavor with a wonderfully rustic finish.",
        imgURL: "https://images.pexels.com/photos/773253/pexels-photo-773253.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        inStock: true,
        price: "22",
        category: "cheese"
      },
      {
        name: "Fiore Sardo",
        description: "A firm, savoury, piquant and smoky flavored chees. The flavor will vary based on the level of ripening and additional hints of dried fruits and an grassy aroma.",
        imgURL: "https://images.pexels.com/photos/773253/pexels-photo-773253.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        inStock: true,
        price: "18",
        category: "cheese"
      },
      {
        name: "Gouda",
        description: "The people's favorite! A sweet and creamy cheese made from yellow cow's milk. Pairs well with a Cabernet Franc of your choice.",
        imgURL: "https://images.pexels.com/photos/773253/pexels-photo-773253.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        inStock: true,
        price: "6",
        category: "cheese"
      },
      {
        name: "Feta",
        description: "A tangy and salty cheese. This cheese will crumble like your favorite baked pastry.",
        imgURL: "https://images.pexels.com/photos/773253/pexels-photo-773253.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        inStock: true,
        price: "4",
        category: "cheese"
      },
      {
        name: "Brie",
        description: "A soft pale colored cheese made from cow's milk. The cheese has a mild, buttery, and creamy taste that makes it a versatile cheese. A great choice for those new to wine and cheese pairings.",
        imgURL: "https://images.pexels.com/photos/773253/pexels-photo-773253.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        inStock: true,
        price: "9",
        category: "cheese"
      },
      {
        name: "Brie",
        description: "A soft pale colored cheese made from cow's milk. The cheese has a mild, buttery, and creamy taste that makes it a versatile cheese. A great choice for those new to wine and cheese pairings.",
        imgURL: "https://images.pexels.com/photos/773253/pexels-photo-773253.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        inStock: true,
        price: "9",
        category: "cheese"
      },
      {
        name: "Brie",
        description: "A soft pale colored cheese made from cow's milk. The cheese has a mild, buttery, and creamy taste that makes it a versatile cheese. A great choice for those new to wine and cheese pairings.",
        imgURL: "https://images.pexels.com/photos/773253/pexels-photo-773253.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        inStock: true,
        price: "9",
        category: "cheese"
      },
      {
        name: "Brie",
        description: "A soft pale colored cheese made from cow's milk. The cheese has a mild, buttery, and creamy taste that makes it a versatile cheese. A great choice for those new to wine and cheese pairings.",
        imgURL: "https://images.pexels.com/photos/773253/pexels-photo-773253.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        inStock: true,
        price: "9",
        category: "cheese"
      },
      {
        name: "Extra Mature Real Yorkshire Wensleydalee",
        description: "The strongest Wensleydale cheese, matured for nine months; produced in the town of Hawes in Wensleydale.",
        imgURL: "https://www.cheese.com/media/img/tweets/721/553711274962718.jpg",
        inStock: false,
        price: "0",
        category: "cheese"
      },
      {
        name: "Red Leicester",
        description: "A traditional hard English cheese made from unpasteurised cow's milk.",
        imgURL: "https://artofeating.com/wp-content/uploads/2019/03/Red-Leicester-2-1024x655.jpg",
        inStock: true,
        price: "15",
        category: "cheese"
      },
      {
        name: "Olavidia Goat Cheese",
        description: "World's Best Cheese in 2021 from the Spanish producer Quesos y Beso; the soft goat's cheese topped the list of 4,079 entries from 45 countries.",
        imgURL: "https://img.republicworld.com/republic-prod/stories/promolarge/xhdpi/fnzdwfwwqpkgtorg_1636286263.jpeg?tr=w-1200,h-900",
        inStock: true,
        price: "300",
        category: "cheese"
      },
      {
        name: "Oscypek",
        description: "spindle-shaped smoked cheese hailing from the Tatra highlands. Maybe this one deserves its own cracker.",
        imgURL: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Oscypki.jpg",
        inStock: true,
        price: "500",
        category: "cheese"
      },
      {
        name: "Gorgonzola dolce",
        description: "Gorgonzola dolce is a traditional Italian variety of Gorgonzola cheese. The cheese is made from pasteurized cow's milk and it's left to age for at least 45 days before consumption",
        imgURL: "https://www.salumeriaitaliana.com/sites/default/files/imagecache/product_full/products/gorg.%20dolce_0.jpg",
        inStock: true,
        price: "40",
        category: "cheese"
      },
      {
        name: "Queijo de coalho",
        description: "Queijo de coalho is a traditional cow's milk cheese from the northeastern regions of Brazil. The cheese is characterized by its firm, yet elastic texture and a slightly yellow color. Coalho is often sold on sticks for roasting, because it can withstand high temperatures and does not melt easily.",
        imgURL: "https://c8.alamy.com/comp/GF5EJK/brazilian-traditional-cheese-queijo-coalho-on-wooden-board-selective-GF5EJK.jpg",
        inStock: true,
        price: "5",
        category: "cheese"
      },
      {
        name: "Redykołka ",
        description: "Redykołka is a small, semi-hard cheese made from half-fat sheep's milk in the Podhale region in Poland.",
        imgURL: "https://catalog-cs.info/img-cs/259_1.jpg.pagespeed.ce.yGTQVD4ZrD.jpg",
        inStock: true,
        price: "21",
        category: "cheese"
      },
      {
        name: "Gorgonzola dolce & Porto 3000",
        description: "Perfect for a reserved table and an evening with us at Porto3000, our signature wine with Gorgonzola dolce is a traditional Italian variety of Gorgonzola cheese.",
        imgURL: "https://en.gorgonzola.com/wp-content/uploads/sites/2/2020/01/abbinamenti-head.jpg",
        inStock: true,
        price: "50",
        category: "wine and cheese"
      },
    ]

    const products = await Promise.all(wineAndCheeseData.map(createProduct));
    console.log("Wine and Cheese", wineAndCheeseData)
    console.log("All products created", products)

  } catch (error) {
    throw error;
  }
}

async function createInitialUsers() {
  console.log("Starting to create users");
  try {
    const userData = [
      {firstname: "Dan", lastname: "Colomba", email: "TheBigStache@aol.com", imgURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Head_silhouette.svg/600px-Head_silhouette.svg.png", username: "DanColomba", password: "TheStache", isAdmin: true, address: "Port 5432"},
      {firstname: "Cookie", lastname: "Monster", email: "ChocochipCookie@SesameStreet.com", imgURL: "https://static.wikia.nocookie.net/muppet/images/0/08/CookieMonsterWaving.jpg/revision/latest/scale-to-width-down/280?cb=20120128192952", username: "CookieM0nster", password: "I love cookies1q!", isAdmin: true, address: "123 Sesame Street"},
      {firstname: "Robert ", lastname: "RectanglePants", email: "DoodleBob@BikiniBottom.com", imgURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Head_silhouette.svg/600px-Head_silhouette.svg.png", username: "SnailLover101", password: "KrustyKrab2006", isAdmin: false, address: "200 Pineapple Way"},
      {firstname: "Hernando", lastname: "Madrigal", email: "FearlessOne@Encanto.com", imgURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Head_silhouette.svg/600px-Head_silhouette.svg.png", username: "RatsOnB4ck", password: "future37", isAdmin: false, address: "1000 Casita Lane"},
      {firstname: "Chiba", lastname: "Lily", email: "Doggos@gmail.com", imgURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Head_silhouette.svg/600px-Head_silhouette.svg.png", username: "SnifferWiffer302", password: "tr3atsplz", isAdmin: false, address: "501 Borkley Street"},
      {firstname: "Patrick", lastname: "Bateman", email: "PaulAllen@gmail.com", imgURL: "https://cdn.mos.cms.futurecdn.net/PzPq6Pbn5RqgrWunhEx6rg-1200-80.jpg", username: "PatrickBateman", password: "HueyLewisAndTheNewROCK", isAdmin: false, address: "2025 Psycho Path"},
      {firstname: "Oscar", lastname: "Wilde", email: "theimportanceof@aol.com", imgURL: "https://i.guim.co.uk/img/media/7a770bbbaaf6ca9d56022829c6d31977b1d6f646/0_128_2520_1511/master/2520.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=fd5d8fd76d6a4becd6286851c194700e", username: "OscarWilde", password: "NotAGoodPass", isAdmin: false, address: "6543 toomany st"},
      {firstname: "Dre", lastname: "Dawg", email: "DrDr@yahoo.com", imgURL: "https://pbs.twimg.com/profile_images/715341035107278848/RotN_Kmm_400x400.jpg", username: "WaltWhitman", password: "BeatsByDre", isAdmin: false, address: "360 Bad St"},
      {firstname: "Don", lastname: "Juan", email: "DonJuan@gmail.com", imgURL: "https://cdn.britannica.com/40/66340-004-547E0283/Byron-George-Gordon-1820.jpg", username: "LordByron", password: "WhoIsAsking", isAdmin: false, address: "70 Old Guy Road"},
      {firstname: "Victor", lastname: "Frankenstein", email: "Frankenstein@aol.com", imgURL: "https://i0.wp.com/thenerddaily.com/wp-content/uploads/2018/05/Mary-Shelley-Movie-2018.jpg?fit=1000%2C742&ssl=1", username: "MarySchelly", password: "37The37", isAdmin: false, address: "7331 Crapi Apartmens"},
    ]

    const users = await Promise.all(userData.map(createUser));

  } catch (error) {
    throw error;
  };
};

buildTables()
  .then(populateInitialData)
  .then(createInitialUsers)
  .catch(console.error)
  .finally(() => client.end());
