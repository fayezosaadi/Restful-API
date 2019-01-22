const express = require("express");
const router = express.Router();
const {
  getCustomers,
  getCustomer,
  getAddress,
  createCustomer,
  updateCustomer,
  deleteCustomer
} = require("../queries/customers");

// get list of customers
router.get("/", (req, res) => {
  res.status(200).send({ customersLists: getCustomers() });
});

// get a single customer and address details
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const { customer } = await getCustomer({ id });
    const {
      addressDetails: { street_address, postal_code, country }
    } = await getAddress({ customerId: id });

    res.status(200).send({ ...customer, street_address, postal_code, country });
  } catch {
    res.status(400).send({ message: `could not find customer with id ${id}` });
  }
});

// create a customer
router.post("/", async (req, res) => {
  const { name, street_address, postal_code, country } = req.body;

  if (name && street_address && postal_code && country) {
    await createCustomer({ name, street_address, postal_code, country });

    res.status(201).send({ message: "customer has been created successfully" });
  } else {
    res.status(400).send({
      message:
        "please make sure you have sent the correct format for creating a customer: { name, street_address, postal_code, country }"
    });
  }
});

// update customer data
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  await updateCustomer({ id, params: { name } });
  res.status(200).send({ message: "customer has been updated successfully" });
});

// delete customer data
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await deleteCustomer({ id });
  res.status(200).send({ message: "customer has been deleted successfully" });
});

module.exports = router;
