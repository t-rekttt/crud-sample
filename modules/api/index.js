let Router = require('express').Router();
let userRouter = require(__dirname + '/userRouter.js');
let searchRouter = require(__dirname + '/searchRouter.js');

Router.use('/user', userRouter);
Router.use('/search', searchRouter);

module.exports = Router;