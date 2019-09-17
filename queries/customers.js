const Pool = require('pg').Pool

// pg db connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'vrify',
  port: 5432,
});

// get list of customers
const getCustomers = async () => {
  try {
    const { rows } = await pool.query('SELECT * FROM customers ORDER BY id ASC');
    return rows
  } catch (e) {
    console.error(`getCustomers ${e}`);
    throw e
  }
};

// get a single customer
const getCustomer = async ({ id }) => {
  try {
    const { rows } = await pool.query('SELECT * FROM customers WHERE id = $1', [id]);
    return rows
  } catch (e) {
    console.error(`getCustomer ${e}`);
    throw e
  }
};

// get address
const getAddress = async ({ customerId }) => {
  try {
    const { rows } = await pool.query('SELECT * FROM customer_addresses WHERE customer_id = $1', [customerId]);
    return rows
  } catch (e) {
    console.error(`getAddress ${e}`);
    throw e
  }
};

// create a new customer
const createCustomer = async ({ name }) => {
  try {
    const { rows } = await pool.query('INSERT INTO customers (name) VALUES ($1) RETURNING *', [name]);
    return rows;
  } catch (e) {
    console.error(`createCustomer ${e}`);
    throw e
  }
};

// create a new address
const createAddress = async ({ customer_id, street_address, postal_code, country }) => {
  try {
    await pool.query(
      'INSERT INTO customer_addresses (customer_id, street_address, postal_code, country) VALUES ($1, $2, $3, $4)',
      [customer_id, street_address, postal_code, country]
    );
  } catch (e) {
    console.error(`createAddress ${e}`);
    throw e
  }
};

// update a customer
const updateCustomer = async ({ id, name }) => {
  try {
    await pool.query('UPDATE customers SET name = $1 WHERE id = $2', [name, id]);
  } catch (e) {
    console.error(`updateCustomer ${e}`);
    throw e
  }
};

// update an address
const updateAddress = async ({ customer_id, street_address, postal_code, country }) => {
  try {
    await pool.query(
      'UPDATE customer_addresses SET street_address = $1, postal_code = $2, country = $3 WHERE customer_id = $4',
      [street_address, postal_code, country, customer_id]
    )
  } catch (e) {
    console.error(`updateAddress ${e}`);
    throw e
  }
};

// delete a customer and their address
const deleteCustomer = async ({ id }) => {
  try {
    await pool.query('DELETE FROM customers WHERE id = $1', [id])
  } catch (e) {
    console.error(`deleteCustomer ${e}`);
    throw e
  }
};

// delete an address
const deleteAddress = async ({ id }) => {
  try {
    await pool.query('DELETE FROM customer_addresses WHERE id = $1', [id])
  } catch (e) {
    console.error(`deleteAddress ${e}`);
    throw e
  }
};

module.exports = {
  getCustomers,
  getCustomer,
  getAddress,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  createAddress,
  updateAddress,
  deleteAddress
};
