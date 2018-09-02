const mongoose = require('mongoose');

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });
const db = mongoose.connection;
db.on('open', () => {
  console.log('db connected');
});
db.on('error', (error) => {
  console.log(error);
});
module.exports = db;
