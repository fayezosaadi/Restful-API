// initial data
let customersList = [
  {
    id: "1",
    name: "Rayan"
  },
  {
    id: "2",
    name: "Colin"
  }
];

let addressesList = [
  {
    id: "1",
    customerId: "2",
    street_address: "123 west 12th",
    postal_code: "b3h2ye",
    country: "US"
  },
  {
    id: "2",
    customerId: "1",
    street_address: "123 nw",
    postal_code: "v6h3ze",
    country: "US"
  }
];

module.exports = { customersList, addressesList };
