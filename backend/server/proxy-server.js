const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const DB_PATH = path.join(__dirname, '../db');
const STORES_JSON_FILE_PATH = `${DB_PATH}/stores.json`;
const SERVER_ERROR_MESSAGE = 'Server error';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/stores', (_, res) => {
  fs.readFile(STORES_JSON_FILE_PATH, (err, data) => {
    if (err) {
      console.error('my error', err, 'my res', res);
      return res.status(500).send(SERVER_ERROR_MESSAGE);
    }
    const stores = JSON.parse(data);
    res.status(200).json(stores);
  });
});

app.put('/createStores', cors(), (req, res) => {
  fs.readFile(STORES_JSON_FILE_PATH, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send(SERVER_ERROR_MESSAGE);
    }
    const stores = JSON.parse(data);
    const newStore = req.body;
    stores.push(newStore);

    fs.writeFile(STORES_JSON_FILE_PATH, JSON.stringify(stores, null, 2), err => {
      if (err) {
        console.error(err);
        return res.status(500).send(SERVER_ERROR_MESSAGE);
      }
      res.status(201).json({ message: 'The store has been successfully created' });
    });
  });
});

app.delete('/deleteStores', cors(), (req, res) => {
  fs.readFile(STORES_JSON_FILE_PATH, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send(SERVER_ERROR_MESSAGE);
    }

    const stores = JSON.parse(data);
    const updatedStores = stores.filter(store => store.name !== req.body.name);

    fs.writeFile(STORES_JSON_FILE_PATH, JSON.stringify(updatedStores, null, 2), err => {
      if (err) {
        console.error(err);
        return res.status(500).send(SERVER_ERROR_MESSAGE);
      }
      res.json({ message: 'The store was deleted successfully' });
    });
  });
});

app.get('/products', (_, res) => {
  fs.readFile(`${DB_PATH}/products.json`, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send(SERVER_ERROR_MESSAGE);
    }
    const products = JSON.parse(data);
    res.status(200).json(products);
  });
});

app.listen(port, () => {
  console.log(`The server is running on the port ${port}`);
});
