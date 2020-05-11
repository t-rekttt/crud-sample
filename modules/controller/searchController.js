let userModel = require(__dirname + '/../db/userModel.js');
var ObjectID = require('mongodb').ObjectID;

let saveSearchParams = async(_id, { page, filter, sortBy, sortDirection } = {}) => {
  return userModel.updateOne({
    _id: ObjectID(_id)
  }, {
    $set: {
      lastSearch: {
        page: page || 0, 
        filter: filter || '', 
        sortBy: sortBy || '', 
        sortDirection: sortDirection || 0
      }
    }
  });
}


let getSearchParams = async(_id) => {
  let user = await userModel.findOne({
    _id: ObjectID(_id)
  });

  return user.lastSearch;
}

module.exports = { saveSearchParams, getSearchParams };