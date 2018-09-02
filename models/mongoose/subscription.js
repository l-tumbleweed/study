const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const subSchema = new Schema({
  userId: {
    type: ObjectId, required: true, index: 1,
  },
  url: {
    type: String, required: true,
  },
});

const subModel = mongoose.model('Sub', subSchema);

async function insert(sub) {
  const created = await subModel.create(sub);
  return created;
}

async function list(params) {
  const match = {};
  const flow = subModel.find(match);
  const subs = await flow.exec();
  return subs;
}

async function findByUseId(userId) {
  const subs = await subModel.find({ userId });
  return subs;
}

module.exports = {
  insert,
  list,
  findByUseId,
};
