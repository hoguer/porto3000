const client = require("./client");

// Does not return order's products
async function getOrderById (id) {
    try{
        const {rows: [order]} = await client.query(`

            SELECT o.*,  p.name
            FROM orders AS o
            INNER JOIN order_products AS op ON op."orderId" = o.id
            INNER JOIN products AS p ON op."productId" = p.id;
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
            SELECT o.*,  p.name
            FROM orders AS o
            INNER JOIN order_products AS op ON op."orderId" = o.id
            INNER JOIN products AS p ON op."productId" = p.id;

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
            SELECT o.*,  p.name
            FROM orders AS o
            INNER JOIN order_products AS op ON op."orderId" = o.id
            INNER JOIN products AS p ON op."productId" = p.id;
            WHERE "userID" = $1;
        `, [id])

    } catch (error) {
        throw error;
    };
};

// Does not return order's products
async function getOrdersByProduct({id}) {
    try {
        const {rows: [order]} = await client.query(`
            SELECT o.*,  p.name
            FROM orders AS o
            INNER JOIN order_products AS op ON op."orderId" = o.id
            INNER JOIN products AS p ON op."productId" = p.id;
            WHERE "productId" = $1;

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
            SELECT o.*,  p.name
            FROM orders AS o
            INNER JOIN order_products AS op ON op."orderId" = o.id
            INNER JOIN products AS p ON op."productId" = p.id;
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