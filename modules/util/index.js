let bcrypt = require('bcrypt');

let hash = async(password, saltRounds = 10) => {
  return new Promise(cb => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) throw err;

      cb(hash);
    });
  });
}

let compare = (password, hash) => {
  return new Promise(cb => {
    bcrypt.compare(password, hash, (err, result) => {
      if (err) throw err;

      cb(result);
    });
  });
}

let paramsExist = (obj, params) => {
  for (let name of params) {
    if (!obj[name]) return false;
  }

  return true;
}

module.exports = { hash, compare, paramsExist };