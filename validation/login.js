const Validator = require("validator");
const isEmpty = require("./is-empty");

const validateLoginInput = ({ email, password }) => {
  errors = {};

  email = !isEmpty(email) ? email : "";
  password = !isEmpty(password) ? password : "";

  if (!Validator.isEmail(email)) {
    errors.email = "Email incorrect";
  }
  if (!Validator.isLength(password, { min: 6, max: 60 })) {
    errors.password = "Password must be longer than 6 characters";
  }
  if (Validator.isEmpty(email)) {
    errors.email = "Field Email is required";
  }
  if (Validator.isEmpty(password)) {
    errors.password = "Field Password is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateLoginInput;
