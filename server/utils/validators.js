const { check, body, validationResult } = require("express-validator");

////////////////////////////
// Generate rules based on the inserted fields
exports.generateRules = (...fields) => {
  if (!fields.length) return [];

  const validators = [];

  for (let field of fields) {
    validators.push(rules[field]);
  }
  return validators;
};

//////////////////////////////
// If there is validation error send it back
exports.validate = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) return next();

  const formatedErrors = errors.array().map((error) => {
    return { [error.param]: error.msg };
  });

  return res.status(422).json({ errors: formatedErrors });
};

///////////////////////////////
// Rules definitions
const rules = {
  firstName: body("firstName")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Field is required.")
    .escape(),
  lastName: body("firstName")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Field is required.")
    .escape(),
  phone: body("phone").trim().escape(),
  email: body("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Field is required.")
    .escape()
    .isEmail()
    .withMessage("Invalid email address.")
    .normalizeEmail({ gmail_remove_dots: false }),
  password: body("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Field is required.")
    .escape()
    .isStrongPassword()
    .withMessage("Password is weak."),
  passwordConfirm: body("passwordConfirm")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Field is required.")
    .escape()
    .custom((val, { req }) => {
      if (val !== req.body.password)
        throw new Error("Password confirmation does not match password.");

      return true;
    }),
};
