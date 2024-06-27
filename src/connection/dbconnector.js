const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017/mppscdb'; // Replace with your MongoDB URI

mongoose.connect(uri)
  .then(() => {
    console.log('Successfully connected to mppscdb');
  })
  .catch(err => {
    console.error('Connection error', err);
  });


  module.exports = mongoose