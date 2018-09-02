const mongoose = require('mongoose');

// const Schema = mongoose.Schema;
const { Schema } = mongoose;
const { ObjectId } = Schema.Types.ObjectId;

const UserSchame = new Schema({
  name: {
    type: String, required: true, unique: true, index: 1,
  },
  age: {
    type: Number, min: 16, max: 60,
  },
});

const UserModel = mongoose.model('User', UserSchame);

async function insert(user) {
  const created = await UserModel.create(user);
  return created;
}

async function getOneById(id) {
  const user = await UserModel.findOne({ _id: id });
  return user;
}

async function getOneByName(name) {
  const user = UserModel.findOne({ name });
  return user;
}

async function list(params) {
  // const match = {};
  // const flow = UserModel.find(match);
  const flow = UserModel.find();
  const users = await flow.exec();
  return users;
}

module.exports = {
  insert,
  getOneById,
  getOneByName,
  list,
};
