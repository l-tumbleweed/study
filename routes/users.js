const express = require('express');

const router = express.Router();
// read models
const User = require('../servers/user_service');
const HTTPReqParamError = require('../errors/http_request_param_error');

/* GET users listing. */
router.get('/', (req, res, next) => {
  (async () => {
    throw new HTTPReqParamError('page', '请指定页码', 'page can not be empty');
    const users = await User.getAllUsers();
    res.locals.users = users;
    // console.log('-------------');
    // console.log(User);
  })()
    .then(() => {
      res.render('users');
      // console.log(r);
    })
    .catch((e) => {
      next(e);
    });
});

router.post('/', (req, res) => {
  const { firstName, lastName, age } = req.body;
  const u = User.addNewUser(firstName, lastName, age);
  res.json(u);
});

router.get('/:userId', (req, res) => {
  (async () => {
    const { userId } = req.params;
    if (userId.length < 5) {
      throw new HTTPReqParamError('userId', '用户ID不能为空', 'user id can not be empty');
    }
    const user = await User.getUserById(req.params.userId);
    res.locals.user = user;
    res.render('user');
  })()
    .catch((e) => {
      console.log(e);
      res.json(e);
    });
});

router.post('/:userId/subscription', (req, res, next) => {
  try {
    const sub = User.createSubscription(Number(req.params.userId, req.body.url));
    res.json(sub);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
