const { User } = require("../models");
const { sendRefreshToken } = require("../utils/auth");

/**
 *
 * @filter {email: 'test@gmail.com'}
 * @selectedFields 'firstName email'
 * @populateFields 'producReviews shippingAddres'
 * @returns users object
 */
exports.getAllUser = async (req, res, next) => {
  try {
    const { selectedFields, filter = {}, populateFields = "" } = req.body;

    const users = await User.find(
      { active: true, ...filter },
      selectedFields
    ).populate(populateFields);
    return res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const { userID } = req.params;
    console.log(userID);
    const user = await User.findById(userID);
    if (!user) {
      return next({
        statusCode: 404,
        message: "The requested user does not exist;",
      });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    if (req.body.password || req.body.confirmPassword) {
      return next({
        statusCode: 400,
        message:
          "This route is not for password updates. Please use /updatePassowrd.",
      });
    }
    const allowedFields = ["firstName", "lastName", "phone", "email"];
    const filteredFields = Object.entries(req.body).reduce((acc, field) => {
      if (allowedFields.includes(field[0])) {
        acc[field[0]] = field[1];
      }
      return acc;
    }, {});
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      filteredFields,
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({ user: updatedUser });
  } catch (error) {
    return next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, { active: false });
    sendRefreshToken(res, "", { maxAge: 1 });
    return res.status(204).json({ user: null, accessToken: null });
  } catch (error) {
    return next(error);
  }
};
