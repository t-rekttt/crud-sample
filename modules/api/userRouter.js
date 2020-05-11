let Router = require('express').Router();
let { paramsExist } = require(__dirname + '/../util');
let { register, login, getUsers } = require(__dirname + '/../controller/userController.js');
let { saveSearchParams, getSearchParams } = require(__dirname + '/../controller/searchController.js');

Router.post('/login', async(req, res) => {
  try {
    if (!paramsExist(req.body, ['username', 'password'])) {
      return res.fail(null, 'Missing required param');
    }

    let user = await login(req.body);

    req.session.user = user;

    return res.success(user);
  } catch (err) {
    return res.fail(null, err.message);
  }
});

Router.post('/register', async(req, res) => {
  try {
    if (!paramsExist(req.body, ['username', 'fullname', 'email', 'password'])) {
      return res.fail(null, 'Missing required param');
    }

    let result = await register(req.body);

    return res.success(result);
  } catch (err) {
    return res.fail(null, err.message);
  }
});

Router.use((req, res, next) => {
  if (!req.session.user) {
    return res.fail(null, 'Not logged in');
  }

  next();
});

Router.get('/userList', async(req, res)  => {
  try {
    let { page, filter, sortBy, sortDirection } = req.query;

    let searchParams = { page, filter, sortBy, sortDirection };

    if (!page && !filter && !sortBy && !sortDirection) {
      searchParams = await getSearchParams(req.session.user._id);
    }

    let results = await getUsers(searchParams);

    let saveResult = await saveSearchParams(req.session.user._id, searchParams);

    return res.success(results);
  } catch (err) {
    return res.fail(null, err.message);
  }
});

module.exports = Router;