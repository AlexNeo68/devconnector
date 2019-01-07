const Validator = require("validator");
const isEmpty = require("./is-empty");

const validateExperienceInput = ({ title, company, from }) => {
  errors = {};

  title = !isEmpty(title) ? title : "";
  company = !isEmpty(company) ? company : "";
  from = !isEmpty(from) ? from : "";

  if (!Validator.isLength(title, { min: 3, max: 30 })) {
    errors.title = "Title must be between 3 and 30 characters";
  }

  if (Validator.isEmpty(title)) {
    errors.title = "Field title is required";
  }
  if (Validator.isEmpty(company)) {
    errors.company = "Field company is required";
  }
  if (Validator.isEmpty(from)) {
    errors.from = "Field Skills is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateExperienceInput;
