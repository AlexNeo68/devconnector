const Validator = require("validator");
const isEmpty = require("./is-empty");

const validatePostInput = ({
  text
}) => {
  errors = {};

  text = !isEmpty(text) ? text : "";

  if (!Validator.isLength(text, {
      min: 10,
      max: 300
    })) {
    errors.text = "Text must be between 3 and 30 characters";
  }

  if (Validator.isEmpty(text)) {
    errors.text = "Field text is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validatePostInput;