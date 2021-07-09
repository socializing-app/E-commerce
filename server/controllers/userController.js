const { User } = require("../models");

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

exports.getUser = (req, res, next) => {
  try {
    const { userID } = req.params;
    const user = User.findById(userID);
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
