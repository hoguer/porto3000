const client = require("./client");
const bcrypt = require("bcrypt");
const { user } = require("pg/lib/defaults");
const SALT_COUNT = 10;

async function createUser ({ firstname, lastname, email, imgURL, username, password, isAdmin, address}) {
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  try {
    const { rows: [user] } = await client.query(`
      INSERT INTO users(firstname, lastname, email, "imgURL", username, password, "isAdmin", address) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT (username) DO NOTHING
      RETURNING *
      `, [firstname, lastname, email, imgURL, username, hashedPassword, isAdmin, address]);
    delete user.password;
    return user;
  } catch (error){
    throw error;
  }
} 

async function getAllUsers() {
  try {
    const {rows} = await client.query(`
      SELECT * FROM users
    `);
    delete user.password;
    return rows;
  } catch (error) {
    throw error;
  };
};

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
    getAllUsers,
    getUserById, 
    getUserByUsername,
};