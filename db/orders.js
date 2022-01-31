const client = require("./client");

// Does not return order's products
async function getOrderById (id) {
    try{
        const {rows: [order]} = await client.query(`
        SELECT * FROM orders
        WHERE id=$1
        `, [id]);
        return order;
    } catch (error) {
        throw error;
    };
};

// Does not return order's products
async function getAllOrders() {
    try {
        const {rows} = await client.query(`
            SELECT * FROM orders
        `);
        return rows;
    } catch (error) {
        throw error;
    };
};

// Does not return order's products
async function getOrdersByUser({id}) {
    try {
        const {rows: [order]} = await client.query(`
            SELECT * FROM orders
            WHERE "userID" = $1;
        `)
    } catch (error) {
        throw error;
    };
};

// Does not return order's products
async function getOrdersByProduct({id}) {
    try {
        const {rows: [order]} = await client.query(`
            SELECT * FROM orders
            WHERE "userID" = $1
            AND status = "created";
        `, [id]);
        return order;
    } catch (error) {
        throw error;
    }
};

// Does not return order's products
async function getCartByUser({id}) {
    try {
        const{rows: [cart]} = await client.query(`
            SELECT * FROM orders
            WHERE "userID" = $1
            AND status = "created";
        `, [id])
        return cart;
    } catch (error) {
        throw error;
    };
};

// Does not return order's products
async function createOrder({status, userID}) {
    try {
        const {rows: [order]} = await client.query(`
            INSERT INTO orders(status, "userID")
            VALUES ($1, $2)
            RETURNING *
            `, [status, userID]);
        return order;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getOrderById,
    getAllOrders,
    getOrdersByUser,
    getOrdersByProduct,
    getCartByUser,
    createOrder
}