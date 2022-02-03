require('dotenv').config();
const bcrypt = require('bcrypt');
const SALT_COUNT = 10;
const { rebuildDB } = require('../db/seedData');
const { createUser, 
    getUser, 
    getUserById, 
    getUserByUsername, 
    getProductById, 
    getAllProducts,
    createProduct,
    getProductByName } = require('../db');
const client = require('../db/client');

describe('Database', () => {
    beforeAll(async() => {
      await rebuildDB();
    })
    afterAll(async() => {
      await client.end();
    })
    describe('Users', () => {
      let userToCreateAndUpdate, queriedUser;
      let userCredentials = {username: 'billybob', password: 'bobbybadboy'};
      describe('createUser({ username, password })', () => {
        beforeAll(async () => {
          userToCreateAndUpdate = await createUser(userCredentials);
          const {rows} = await client.query(`SELECT * FROM users WHERE username = $1`, [userCredentials.username]);
          queriedUser = rows[0];
        })
        it('Creates the user', async () => {
          expect(userToCreateAndUpdate.username).toBe(userCredentials.username);
          expect(queriedUser.username).toBe(userCredentials.username);
        });
        it('EXTRA CREDIT: Does not store plaintext password in the database', async () => {
          expect(queriedUser.password).not.toBe(userCredentials.password);
        });
        it('EXTRA CREDIT: Hashes the password (salted 10 times) before storing it to the database', async () => {
          const hashedVersion = bcrypt.compareSync(userCredentials.password, queriedUser.password);
          expect(hashedVersion).toBe(true);
        });
        it('Does NOT return the password', async () => {
          expect(userToCreateAndUpdate.password).toBeFalsy();
        })
      })
      describe('getUser({ username, password })', () => {
        let verifiedUser;
        beforeAll(async () => {
          verifiedUser = await getUser(userCredentials);
        })
        it('Verifies the passed-in, plain-text password against the password in the database (the hashed password, if this portion is complete)', async () => {
          const unVerifiedUser = await getUser({username: userCredentials.username, password: 'badPassword'});
          expect(verifiedUser).toBeTruthy();
          expect(verifiedUser.username).toBe(userCredentials.username);
          expect(unVerifiedUser).toBeFalsy();
        })
        it('Does NOT return the password', async () => {
          expect(verifiedUser.password).toBeFalsy();
        })
      })
      describe('getUserById', () => {
        it('Gets a user based on the user Id', async () => {
          const user = await getUserById(userToCreateAndUpdate.id);
          expect(user).toBeTruthy();
          expect(user.id).toBe(userToCreateAndUpdate.id);
        })
      })
    })
    describe('getUserByUsername', () => {
        it('Gets a user based on the user Id', async () => {
          const user = await getUserByUsername(userToCreateAndUpdate.userToCreateAndUpdate);
          expect(user).toBeTruthy();
          expect(user.username).toBe(userToCreateAndUpdate.username);
        })
      })
    })
      describe('createProduct({ name, description })', () => {
        it('Creates and returns the new activity', async () => {
          const productToCreate = {name: "Test_Wine_Or_Cheese", description: "Test_Description", price: "$Test", imgURL: "imageUrl", inStock: true, category: "Test category"};
          const createdProduct = await createProduct(productToCreate);
          expect(createdProduct.name).toBe(productToCreate.name);
          expect(createdProduct.description).toBe(productToCreate.description);
          expect(createdProduct.price).toBe(productToCreate.price);
          expect(createdProduct.imgURL).toBe(productToCreate.imgURL);
          expect(createdProduct.inStock).toBe(productToCreate.inStock);
          expect(createdProduct.category).toBe(productToCreate.category);
        })
      })
      describe('getAllProducts', () => {
        let product;
        beforeAll(async() => {
          [routine] = await getAllProducts();
        })
        it('selects and returns an array of all products', async () => {
          expect(routine).toEqual(expect.objectContaining({
            id: expect.any(Number),
            description: expect.any(String),
            price: expect.any(String),
            imgURL: expect.any(String),
            inStock: expect.any(Boolean),
            categories: expect.any(String),
          }));
        })
      })
        describe('getProductById', () => {
          it('gets a product by its id', async () => {
            const product = await getProductById(1);
            expect(activity).toBeTruthy();
          })
    })
    describe('getProductByName', () => {
      let productToCreate;
      describe('getProductById', () => {
        it('gets a product by its id', async () => {
          const product = await getProductByName();
          expect(product).toBeTruthy();
        });
      });
    })