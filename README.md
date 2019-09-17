# VRIFY Restful API Application

A simple application based on RESTful architecture that uses Express framework

## Technical Approach & Objectives

The server is built with Node, Express and postgres and allows users to consume CRUD services on customer
endpoint. It is a Http RESTful api that will response with JSON objects.

## Getting Started

1.  clone this repository.
2.  Install dependencies: `npm install` or `npm i` for short.
3.  Start the web server from the command line: `npm run start`

* You can curl or use any http client app such as `Postman` to query the desired endpoints

- Querying `/customers` will return a full list of customers
- Querying `/customers/<customerId>` will return a single customer with address details
- Posting into `/customers` will create a new customer and return a success message
- Posting into `/customers/address/:<customerId>` will create a new address and return a success message
- PUT `/customers/<customerId>` will update an existing customer and return a success message
- PUT `/customers/address/<customerId>` will update an existing address and return a success message
- DELETE `/customers/<customerId>` will delete an existing customer and all addresses related to it
- DELETE `/customers/address/<customerId>` will delete an existing address

## Dependencies & Troubleshooting

Dependencies:

* Express
* Node 5.10.x or above
* postgres db

## postgres
In order to be able to run the app and its tests, please make sure you have these dbs created: `vrify-test` and `vrify` 
with `customers` and `customer_addresses` tables in each of them.

###### customers schema:
```
id: integer(pk)
name: text
```
###### customer_addresses schema:
```
id: integer(pk)
customer_id: integer(fk - customer.id) - on delete: cascade
postal_code: text
street_address: text
countryL text
```

## Running Tests:

Tests are written to verify that the api endpoints are functioning as expected, they are written using Mocha
framework and Chai assertion library, in order to run the tests, please use the following command:

* npm run test
