const express = require('express');

const knex = require('knex');

const server = express();

const knexConfiguration = {
    client: "sqlite3",
    connection: {
        filename: "./data/car-dealer.db3",
    },
    useNullAsDefault: true,
};

const Database = knex(knexConfiguration);

server.use(express.json());

server.get('/', (req, res) => {
    res.send(`<h2>Web DB II</h2>`);
  });

server.get('/api/cars', (req, res) => {
    Database('cars')
    .then(cars => {
        res.json(cars);
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to retrieve car.' })
    })
  });

  server.post('/api/cars', (req, res) => {
    const carData = req.body;
    Database('cars').insert(carData)
    .then(ids => {
        Database('cars').where({ id: ids[0] })
      .then(newCarEntry => {
        res.status(201).json(newCarEntry);
      });
    })
    .catch (err => {
      console.log('POST error', err);
      res.status(500).json({ message: "Failed to store data" });
    });
  });

  module.exports = server;