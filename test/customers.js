const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app.js");

// During the test the env variable is set to test
process.env.NODE_ENV = "test";

chai.should();
chai.use(chaiHttp);

describe("Customers", () => {
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
          res.body.customersLists.length.should.be.eql(2);
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
          res.body.should.have.property("street_address").eq("123 nw");
          done();
        });
    });

    describe("/POST customers", () => {
      it("it should not POST a customer without name field", done => {
        const customer = {};

        chai
          .request(server)
          .post("/customers")
          .send(customer)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a("object");
            res.body.should.have.property("message");
            res.body.message.should.equal(
              "please make sure you have sent the correct format for creating a customer: { name, street_address, postal_code, country }"
            );
            done();
          });
      });

      it("it should POST a customer", done => {
        const customer = {
          name: "VRIFY",
          street_address: "1123",
          postal_code: "vdf",
          country: "US"
        };

        chai
          .request(server)
          .post("/customers")
          .send(customer)
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
        const customer = { name: "VRIFY" };

        chai
          .request(server)
          .put("/customers/1")
          .send(customer)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("message");
            res.body.message.should.equal(
              "customer has been updated successfully"
            );
            done();
          });
      });
    });
  });
});
