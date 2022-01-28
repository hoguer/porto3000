const client = require("./client");

async function getProductById(id) {
    try {
        const {rows: [product]} = await client.query(`
            SELECT * FROM products 
            WHERE id=$1
        `, [id]);
        return product;
    } catch (error) {
        throw error;
    };
};

async function getAllProducts() {
    try {
        const {rows} = await client.query(`
            SELECT * FROM products
        `);
        return rows;
    } catch (error) {
        throw error;
    };
};

async function createProduct({name, description, price, imgURL, inStock, category}) {
    try {
        const {rows: [newProduct]} = await client.query(`
            INSERT INTO products (name, description, price, "imgURL", "inStock", category)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
        `, [name, description, price, imgURL, inStock, category]);
        return newProduct;
    } catch (error) {
        throw error;
    };
};

async function getProductByName(name) {
    try {
        const {rows: [product]} = await client.query(`
            SELECT * FROM products 
            WHERE name=$1
        `, [name]);
        return product;
    } catch (error) {
        throw error;
    };
};
 module.exports = {
     getProductById,
     getAllProducts,
     createProduct,
     getProductByName
 }