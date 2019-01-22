const cuid = require("cuid");
const filter = require("lodash/filter");
const findIndex = require("lodash/findIndex");
const remove = require("lodash/remove");

const { customersList, addressesList } = require("../database/seeds");

// get list of customers
const getCustomers = () => customersList;

// get a single customer
const getCustomer = ({ id }) => ({
  customer: filter(customersList, { id })[0]
});

// get details address
const getAddress = ({ customerId }) => ({
  addressDetails: filter(addressesList, { customerId })[0]
});

// create a new customer
const createCustomer = async ({
  name,
  street_address,
  postal_code,
  country
}) => {
  const customerId = cuid();
  const addressId = cuid();

  await customersList.push({
    id: customerId,
    name
  });

  await addressesList.push({
    id: addressId,
    customerId,
    street_address,
    postal_code,
    country,
    name
  });
};

// update a customer
const updateCustomer = async ({ id, params }) => {
  const index = findIndex(customersList, { id });
  customersList.splice(index, 1, { id, ...params });
};

// delete a customer
const deleteCustomer = async ({ id }) => {
  remove(customersList, { id });
};

module.exports = {
  getCustomers,
  getCustomer,
  getAddress,
  createCustomer,
  updateCustomer,
  deleteCustomer
};
