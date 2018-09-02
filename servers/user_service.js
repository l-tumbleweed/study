const User = require('../models/mongoose/user');
const Subscription = require('../models/mongoose/subscription');

module.exports.getAllUsers = async () => {
  const users = await User.list();
  return users;
};

module.exports.addNewUser = async (name, age) => {
  const user = await User.insert({ name, age });
  return user;
};

module.exports.getUserById = async (userId) => {
  const user = await User.getOneById(userId);
  return user;
};

module.exports.createSubscription = async (userId, url) => {
  const user = await User.getOneById(userId);
  if (!user) throw Error('no such user');
  const sub = await Subscription.insert(userId, url);
  return sub;
};
