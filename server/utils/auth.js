const { sign } = require("jsonwebtoken");

exports.createAccessToken = (userID) => {
  return sign({ userID }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
  });
};

exports.createRefreshToken = (userID, tokenVersion) => {
  return sign({ userID, tokenVersion }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
  });
};

exports.sendRefreshToken = (res, token, options = {}) => {
  res.cookie("rtk", token, {
    httpOnly: true,
    path: "/api/v1/refresh_token",
    maxAge: process.env.REFRESH_TOKEN_COOKIE_EXPIRATION * 24 * 60 * 60 * 1000,
    ...options,
  });
};
