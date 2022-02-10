require('dotenv').config();
const bcrypt = require('bcrypt');
const SALT_COUNT = 10;
// const { rebuildDB } = require('../db/seedData');
const { createUser, 
    getUser, 
    getUserById, 
    getUserByUsername, 
    getProductById, 
    getAllProducts,
    createProduct,
    getProductByName,
   } = require('../db');
const client = require('../db/client');

describe('Database', () => {
  beforeAll(async() => {
    await client.connect();
  })
  afterAll(async() => {
    await client.end();
  })
  describe('Users', () => {
    const userCredentials = {
        firstname: "Ricky",
        lastname: "Tester",
        email: "TestEmail@yahoo.com",
        imgURL: "testimgnote.com/testimage",
        username: "RickyWroteThis",
        password: "PlainText", 
        isAdmin: true, 
        address: "yee"};
    describe('createUser({ username, password })', () => {
      let queriedUser;
      beforeAll(async () => {
        await createUser(userCredentials);
        const {rows} = await client.query(`SELECT * FROM users WHERE username = $1`, [userCredentials.username]);
        queriedUser = rows[0];
      })
      it('Creates the user with 8 credentials', async () => {
        expect(queriedUser.firstname).toBe(userCredentials.firstname);
        expect(queriedUser.lastname).toBe(userCredentials.lastname);
        expect(queriedUser.email).toBe(userCredentials.email);
        expect(queriedUser.imgURL).toBe(userCredentials.imgURL);
        expect(queriedUser.username).toBe(userCredentials.username);
        expect(queriedUser.password).toBe(userCredentials.password);
        expect(queriedUser.isAdmin).toBe(userCredentials.isAdmin);
        expect(queriedUser.address).toBe(userCredentials.address);
      });
      it('Does not store plaintext password in the database', async () => {
        expect(queriedUser.password).not.toBe(userCredentials.password);
      });
      it('Hashes the password before storing it to the database', async () => {
        const hashedVersion = bcrypt.compareSync(userCredentials.password, queriedUser.password);
        expect(hashedVersion).toBe(true);
      });
      it('Does not return the password', async () => {
        expect(userToCreateAndUpdate.password).toBeFalsy();
      })
    })
  })
})