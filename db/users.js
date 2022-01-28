const client = require("./client");
const bcrypt = require("bcrypt");
const SALT_COUNT = 10;

async function createUser ({ firstname, lastname, email, imgURL, username, password, isAdmin, address}) {
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    try {
        const { rows: [user] } = await client.query(`
        INSERT INTO users(firstname, lastname, email, "imgURL", username, password, "isAdmin", address) 
        VALUES ($1, $2)
        ON CONFLICT (username) DO NOTHING
        RETURNING id, username
        `, [username, hashedPassword]);
      return user;
    } catch (error){
        throw error;
    }
} 
async function getUser({ username, password }) {
    try {
      const user = await getUserByUsername(username);
      console.log(user)
      const hashedPassword = user.password;
      const matchedPass = await bcrypt.compare(password, hashedPassword);
  
      if (matchedPass) {
        console.log('matched')
        delete user.password;
        return user;
      } else {
        console.log('didnt match')
        return null;
      }
    } catch (error) {
      throw error;
    }
  }
async function getUserById(id){
    try{
        const {rows:[user] } = await client.query(`
        SELECT * 
        FROM users
        WHERE id= $1;
    `, [id]);
    if (!user) return null;
    delete user.password;
    return user;
} catch (error) {
    throw error;
  }
}
async function getUserByUsername(userName){
    try{
        const {rows: [user] }= await client.query(`
        SELECT * 
        FROM users
        WHERE username = $1; 
    `, [userName]);
   
    return user;
} catch (error){
    throw error;
  }
}
module.exports = {
    createUser, 
    getUser,
    getUserById, 
    getUserByUsername,
};