require('dotenv').config();
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let session = require('express-session');
let apiRouter = require(__dirname + '/modules/api');

let PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/ums', {useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  // we're connected!
  console.log('Connected');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use((req, res, next) => {
  res.success = (data, message) => {
    return res.json({ success: 1, data, message });
  }

  res.fail = (data, message) => {
    return res.json({ success: 0, data, message });
  }

  next();
});

app.use('/', express.static(__dirname + '/public'));

app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});