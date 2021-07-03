const { User } = require("../models");

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });

    newUser.password = undefined;
    // TODO: we want to generate a JWT and send it back in a cookie with an expiration date of 1hour
    return res.status(201).json({ user: newUser });
  } catch (error) {
    //duplication error
    if (error.code === 11000) {
      return next({
        statusCode: 400,
        message: "Duplicated field value, please use another value.",
      });
    }

    return next({ statusCode: 500, message: error.message });
  }
};

exports.login = async (req, res, next) => {
  try {
    // find the user based on the email address
    // const user = UserModel.find({email: req.email})
    // TODO: make sure the password matches the password in the db
    // TODO: if thats true create a jwt and send it back with the user data
  } catch (error) {
    return next({
      statusCode: 404,
      message: "Wrong email address or passowrd.",
    });
  }
};
