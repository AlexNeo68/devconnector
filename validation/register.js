const Validator = require("validator");
const isEmpty = require("./is-empty");

const validateRegisterInput = ({ email, name, password, password2 }) => {
  errors = {};

  email = !isEmpty(email) ? email : "";
  name = !isEmpty(name) ? name : "";
  password = !isEmpty(password) ? password : "";
  password2 = !isEmpty(password2) ? password2 : "";

  if (!Validator.isEmail(email)) {
    errors.email = "Email incorrect";
  }
  if (!Validator.isLength(name, { min: 3, max: 30 })) {
    errors.name = "Name must be between 3 and 30 characters";
  }
  if (!Validator.isLength(password, { min: 6, max: 60 })) {
    errors.password = "Password must be longer than 6 characters";
  }
  if (!Validator.equals(password, password2)) {
    errors.password2 = "Passwords must match";
  }
  if (Validator.isEmpty(email)) {
    errors.email = "Field Email is required";
  }
  if (Validator.isEmpty(name)) {
    errors.name = "Field Name is required";
  }
  if (Validator.isEmpty(password)) {
    errors.password = "Field Password is required";
  }
  if (Validator.isEmpty(password2)) {
    errors.password2 = "Field Confirm Password is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateRegisterInput;
