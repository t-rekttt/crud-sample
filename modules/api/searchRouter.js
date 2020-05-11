let Router = require('express').Router();
let { getSearchParams } = require(__dirname + '/../controller/searchController.js');

Router.use((req, res, next) => {
  if (!req.session.user) {
    return res.fail(null, 'Not logged in');
  }

  next();
});

Router.get('/searchParams', async(req, res) => {
  try {
    let result = await getSearchParams(req.session.user._id);

    console.log(result);

    return res.success(result);
  } catch (err) {
    return res.fail(null, err.message);
  }
});

module.exports = Router;