let userModel = require(__dirname + '/../db/userModel.js');
let { hash, compare } = require(__dirname + '/../util');

let register = async({ username, fullname, email, password }) => {
  let hashedPassword = await hash(password);

  let user = await userModel.create({ 
    username, 
    fullname, 
    email, 
    password: hashedPassword,
    lastSearch: null
  });

  user = user.toObject();

  delete user.password;
  delete user._id;

  return user;
}

let login = async({ username, password }) => {
  let user = await userModel.findOne({ username });

  let realPassword = user.password;

  let match = compare(password, realPassword);

  // Could check user and password seperately for better performance but make the application vulnerable to timing attack
  if (!user || !match) throw new Error("Wrong username or password");

  user = user.toObject();

  delete user.password;

  return user;
}

let getUsers = async({ page, filter, sortBy, sortDirection } = {}) => {
  let pipeline = [];

  let regex = new RegExp(filter ,'i');

  if (filter) {
    pipeline.push({
      '$match': {
        '$or': [
          { username: regex },
          { fullname: regex }
        ]
      }
    });
  }

  if (sortBy && sortDirection) {
    pipeline.push({
      '$sort': {
        [sortBy]: sortDirection
      }
    });
  }

  pipeline.push({
    '$limit': 5
  });

  if (page) {
    pipeline.push({
      '$skip': page * 5
    });
  }

  pipeline.push({
    '$project': {
      password: 0,
      _id: 0,
      lastSearch: 0
    }
  })

  return userModel.aggregate(pipeline);
}

module.exports = { register, login, getUsers };