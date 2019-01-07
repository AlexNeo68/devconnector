const Validator = require("validator");
const isEmpty = require("./is-empty");

const validateEducationInput = ({ school, degree, fieldofstudy, from }) => {
  errors = {};

  school = !isEmpty(school) ? school : "";
  degree = !isEmpty(degree) ? degree : "";
  fieldofstudy = !isEmpty(fieldofstudy) ? fieldofstudy : "";
  from = !isEmpty(from) ? from : "";

  if (!Validator.isLength(school, { min: 3, max: 30 })) {
    errors.school = "school must be between 3 and 30 characters";
  }

  if (Validator.isEmpty(school)) {
    errors.school = "Field school is required";
  }
  if (Validator.isEmpty(degree)) {
    errors.degree = "Field degree is required";
  }
  if (Validator.isEmpty(fieldofstudy)) {
    errors.fieldofstudy = "Field fieldofstudy is required";
  }
  if (Validator.isEmpty(from)) {
    errors.from = "Field From is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateEducationInput;
