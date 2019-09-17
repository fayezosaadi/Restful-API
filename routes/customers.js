const express = require("express");
const router = express.Router();
const {
  getCustomers,
  getCustomer,
  getAddress,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  createAddress,
  updateAddress,
  deleteAddress
} = require("../queries/customers");

// get list of customers
router.get("/", async (req, res) => {
  try {
    res.status(200).send({ customersLists: await getCustomers() });
  } catch ({ message }) {
    res.status(404).send({ message });
  }
});

// get a single customer and address details
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [customer]  = await getCustomer({ id });
    const [address]  = await getAddress({ customerId: id });
    res.status(200).send({ ...address, ...customer });
  } catch({ message }) {
    console.error('get customer route', message);
    res.status(404).send({ message: `could not find customer with id ${id}` });
  }
});

// create a customer
router.post("/", async (req, res) => {
  const { name } = req.body;

  if (name) {
    try {
      await createCustomer({ name });
      res.status(201).send({ message: "customer has been created successfully" });
    } catch ({ message }) {
      res.status(500).send({ message });
    }
  } else {
    res.status(400).send({ message: "param name is missing" });
  }
});

// create customer address
router.post("/address/:id", async (req, res) => {
  const { id } = req.params;
  const { street_address, postal_code, country } = req.body;
  if (street_address && postal_code && country) {
    try {
      await createAddress({ customer_id: id, street_address, postal_code, country });
      return res.status(201).send({ message: "customer address has been created successfully" });
    } catch ({ message }) {
      return res.status(500).send({ message });
    }
  } else {
    return res.status(400).send({ message: "params street_address, postal_code, country are missing" });
  }
});

// update customer data
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  if (name) {
    try {
      await updateCustomer({id, name});
      return res.status(200).send({ message: "customer has been updated successfully" });
    } catch ({ message }) {
      return res.status(500).send({ message });
    }
  }
  return res.status(400).send({ message: "param name is missing" });
});

// update customer addresses
router.put("/address/:id", async (req, res) => {
  const { id } = req.params;
  const { street_address, postal_code, country } = req.body;
    if (street_address || postal_code || country) {
      try {
        await updateAddress({customer_id: id, street_address, postal_code, country});
        return res.status(200).send({message: "customer address has been updated successfully"});
      } catch ({ message }) {
        return res.status(500).send({message});
      }
    }
    return res.status(400).send({ message: "please make sure you have included correct params" });
});

// delete customer data
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await deleteCustomer({ id });
    res.status(200).send({ message: "customer has been deleted successfully" });
  } catch ({ message }) {
    console.error('delete customer route', message);
    res.status(500).send({ message });
  }
});

router.delete("/address/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await deleteAddress({ id });
    res.status(200).send({ message: "address has been deleted successfully" });
  } catch ({ message }) {
    console.error('delete address route', message);
    res.status(500).send({ message });
  }
});

module.exports = router;
