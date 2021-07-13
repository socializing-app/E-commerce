const { User } = require("../models");
const { verify } = require("jsonwebtoken");
const {
  sendRefreshToken,
  createAccessToken,
  createRefreshToken,
} = require("../utils/auth");

exports.handleRefreshTokenRequest = async (req, res, next) => {
  // if there is no jwt send back error
  const token = req.cookies.rtk;
  console.log(token);
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized.",
    });
  }

  verify(token, process.env.REFRESH_TOKEN_SECRET, async (error, decoded) => {
    // if there is an error during verification
    if (error) {
      return res.status(401).json({
        message: "Unauthorized.",
      });
    }

    // no user with the id from the jwt
    const user = await User.findById(decoded.userID);
    if (!user) {
      return res.status(401).json({
        message: "Unauthorized.",
      });
    }

    // if the refreshtoken was invoked
    if (user.tokenVersion !== decoded.tokenVersion) {
      sendRefreshToken(res, "", { maxAge: 1 });
      return res.status(401).json({
        message: "Unauthorized.",
      });
    }

    sendRefreshToken(res, createRefreshToken(user._id, user.tokenVersion));
    return res.status(200).json({ accessToken: createAccessToken(user._id) });
  });
};

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });

    newUser.password = undefined;

    sendRefreshToken(
      res,
      createRefreshToken(newUser._id, newUser.tokenVersion)
    );

    return res
      .status(201)
      .json({ user: newUser, accessToken: createAccessToken(newUser._id) });
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
    console.log(req.body);
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

    sendRefreshToken(res, createRefreshToken(user._id, user.tokenVersion));

    return res
      .status(200)
      .json({ user: user, accessToken: createAccessToken(user._id) });
  } catch (error) {
    return next({
      statusCode: 500,
      message: error.message,
    });
  }
};

module.exports.logout = (req, res, next) => {
  sendRefreshToken(res, "", { maxAge: 1 });
  return res.status(200).json({
    message: "Logged out.",
    accessToken: "",
  });
};

module.exports.requireAuth = async (req, res, next) => {
  try {
    // Get the token from the request cookie
    const { authorization } = req.headers;
    let token;
    if (authorization && authorization.startsWith("Bearer")) {
      token = authorization.split(" ")[1];
    }

    if (!token) {
      return next({
        statusCode: 401,
        message: "You are not logged in! Please log in to get access.",
      });
    }

    verify(token, process.env.ACCESS_TOKEN_SECRET, async (error, decoded) => {
      if (error) {
        return next({
          statusCode: 401,
          message: "Unauthorized, the provided token is invalid.",
        });
      }

      const user = await User.findById(decoded.userID);
      if (!user) {
        return next({
          statusCode: 401,
          message: "The user belonging to this token does no longer exists.",
        });
      }

      req.user = user;
      return next();
    });
  } catch (error) {
    return next({
      statusCode: 401,
      message: "Unauthorized, you have no access to this page.",
    });
  }
};
