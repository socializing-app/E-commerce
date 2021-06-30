// const UserModel = require("../models/users/userModel");

exports.signup = async (req, res, next) => {
  try {
    // const newUser = UserModel.create(req.body);
    // TODO:
    // we want to generate a JWT and send it back in a cookie with an expiration date of 1hour
    return res.status(201).json({ user: newUser });
  } catch (error) {
    //duplication error
    if (error.code === 1100) {
      return next({
        statusCode: 400,
        message: "Duplicated field value, please use another value.",
      });
    }
    return next({ statusCode: 500, message: error.message });
  }
};
