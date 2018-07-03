const express = require('express');
const app = express();
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const parser = require('body-parser');
const createRouter = require('./helpers/create_router.js');

const publicPath = path.join(__dirname, '../client/public');
app.use(express.static(publicPath));

app.use(parser.json());

MongoClient.connect('mongodb://localhost:27017', (err, client) => {
  if (err) {
    console.error(err);
  }

  const db = client.db('birds');
  const sightingsCollection = db.collection('sightings');
  const sightingsRouter = createRouter(sightingsCollection)
  app.use('/api/sightings', sightingsRouter);
});

app.listen(3000, function () {
  console.log(`Listening on port ${ this.address().port }`);
});
