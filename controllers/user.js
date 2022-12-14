const User = require("../models/userModel");
const { ObjectID } = require("bson");

const getUser = async (req, res) => {
  try {
    if(!req.user){
      return res.status(401).json({ 'message': 'Please, include token to request' });
    }
    let user = await User.findOne({ "_id": ObjectID(req.user.userId) });
    if (user) {
      return res.status(200).json({
        "user": {
          "_id": user._id,
          "email": user.email,
          "created_date": user.createdDate,
        }
      });
    }
    else {
      return res.status(400).json({ 'message': 'User not found' });
    }
  } catch (err) {
    return res.status(500).json({ 'message': 'Server error' });
  }

};

module.exports = {
  getUser 
};
