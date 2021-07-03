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
    const user = await User.findOne({ email: req.body.email }).select(
      "+password"
    );

    if (
      !user ||
      !(await user.comparePassword(req.body.password, user.password))
    ) {
      return next({
        statusCode: 401,
        message: "Wrong email address or password.",
      });
    }

    user.password = undefined;

    return res.status(200).json({ user });
    // TODO: if thats true create a jwt and send it back with the user data
  } catch (error) {
    return next({
      statusCode: 500,
      message: error.message,
    });
  }
};
