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
  email: body("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Field is required.")
    .escape()
    .isEmail()
    .normalizeEmail(),
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
