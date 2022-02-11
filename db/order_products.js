const client = require("./client");

async function getOrderProductsById (id) {
    try{
        const {rows} = await client.query(`
            SELECT * FROM order_products AS op
            WHERE id=$1
        `, [id]);
        return rows
    } catch (error) {
        throw error;
    };
};

async function addProductToOrder (orderId, productId, price, quantity, userID) {
        try {
            if (!productId) {
            const { rows: [order_product] } = await client.query(`
                INSERT INTO op (orderId, productId, price, quantity, userID) 
                VALUES ($1, $2, $3, $4, $5)
                RETURNING *
                `, [orderId, productId, price, quantity, userID]);
            }
      //update , update
      //update the price
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