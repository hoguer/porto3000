const client = require("./client");
const { getProductById, getOrderById} = require("./")

async function getOrderProductsById (id) {
    try{
        const {rows: [order_product]} = await client.query(`
            SELECT * FROM order_products
            WHERE id=$1
        `, [id]);
        return order_product
    } catch (error) {
        throw error;
    };
};

async function addProductToOrder (orderId, productId, price, quantity, userId) {
        try {
          const product = getProductById(productId)
          const order = getOrderById(orderId)
            if (!product || !order) return;
            const { rows: [order_product] } = await client.query(`
                INSERT INTO order_products (orderId, productId, price, quantity, userId) 
                VALUES ($1, $2, $3, $4, $5)
                RETURNING *
                `, [orderId, productId, price, quantity, userId]);
            }

    return order_products;
  } catch (error){
    throw error;
  }
} 

async function updateOrderProduct({ id, ...fields }) {
    try {
        const toUpdate = {};
        let setStrings = [];
        let count = 1;
        for(let column in fields) {
          if(fields[column] !== undefined) {
            toUpdate[column] = fields[column];
            setStrings.push(`"${column}"=$${count}`)
            count++;
          };
        };
        const setStr = setStrings.join(',');
        const {rows: [order_product]} = await client.query(`
            UPDATE order_products
            SET ${setStr}
            WHERE id=${ id }
            RETURNING *;
        `, Object.values(toUpdate));
          return order_product;
      } catch (error) {
        throw error;
      };
  };

  async function destroyOrderProduct(id) {
    try {
      const { rows: [order_product]} = await client.query(`
      DELETE FROM order_products
      WHERE id=$1
      RETURNING *;
  `, [id]);
    return order_product
    } catch (error) {
      console.error("Error with deleteUser in db/users.");
      throw error;
    }
}

module.exports = {
    getOrderProductsById,
    addProductToOrder,
    updateOrderProduct,
    destroyOrderProduct
}