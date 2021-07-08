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
