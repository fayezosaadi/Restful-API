const chai = require("chai");
const { expect } = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app.js");
const { pool } = require("../queries/customers");

chai.should();
chai.use(chaiHttp);

before(async () => {
  await pool.query('START TRANSACTION');
  const { rows }  = await pool.query('INSERT INTO customers (name) VALUES ($1) RETURNING *', ["vrify-test"]);
  const { id: customer_id } = rows[0];
  await pool.query(
    'INSERT INTO customer_addresses (customer_id, street_address, postal_code, country) VALUES ($1, $2, $3, $4)',
    [customer_id, "1125 w12", "v6h3s3", "CA"]
  );
});

after(async () => {
  await pool.query('ROLLBACK');
});

describe("Customers", async () => {
  let customerId;
  describe("/GET customers", () => {
    it("it should GET all the customers", done => {
      chai
        .request(server)
        .get("/customers")
        .end((err, res) => {
          const { id } = res.body.customersLists[0];
          customerId = id;
          res.should.have.status(200);
          res.body.customersLists.should.be.a("array");
          expect(res.body.customersLists[0].name).to.eq("vrify-test");
          res.body.customersLists.length.should.be.eql(1);
          done();
        });
    });

    it("it should GET a single customer with address details", done => {
      chai
        .request(server)
        .get(`/customers/${customerId}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("street_address").eq("1125 w12");
          res.body.should.have.property("postal_code").eq("v6h3s3");
          res.body.should.have.property("country").eq("CA");
          done();
        });
    });
  });

  describe("/POST customers", () => {
      it("it should not POST a customer without name field", done => {
        const payload = {};

        chai
          .request(server)
          .post("/customers")
          .send(payload)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a("object");
            res.body.should.have.property("message");
            res.body.message.should.equal("param name is missing");
            done();
          });
      });

      it("it should POST a customer", done => {
        const payload = { name: "VRIFY" };

        chai
          .request(server)
          .post("/customers")
          .send(payload)
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a("object");
            res.body.should.have
              .property("message")
              .eql("customer has been created successfully");
            done();
          });
      });
    });

  describe("/PUT customers", () => {
      it("it should UPDATE a customer name", done => {
        const payload = { name: "VRIFY" };

        chai
          .request(server)
          .put("/customers/1")
          .send(payload)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("message");
            res.body.message.should.equal("customer has been updated successfully");
            done();
          });
      });
    });

  describe("/DELETE customers", () => {
    it("it should DELETE a customer", done => {
      chai
        .request(server)
        .delete(`/customers/${customerId}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("message");
          res.body.message.should.equal("customer has been deleted successfully");
          done();
        });
    });
  });

});
