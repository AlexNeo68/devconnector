const Validator = require("validator");
const isEmpty = require("./is-empty");

const validateExperienceInput = ({
  handle,
  status,
  skills,
  website,
  youtube,
  twitter,
  instagram,
  linkedin,
  facebook
}) => {
  errors = {};

  handle = !isEmpty(handle) ? handle : "";
  status = !isEmpty(status) ? status : "";
  skills = !isEmpty(skills) ? skills : "";

  if (!Validator.isLength(handle, { min: 3, max: 30 })) {
    errors.handle = "Handle must be between 3 and 30 characters";
  }

  if (!isEmpty(website) && !Validator.isURL(website)) {
    errors.website = "Incorrect URL";
  }
  if (!isEmpty(youtube) && !Validator.isURL(youtube)) {
    errors.youtube = "Incorrect URL";
  }
  if (!isEmpty(facebook) && !Validator.isURL(facebook)) {
    errors.facebook = "Incorrect URL";
  }
  if (!isEmpty(linkedin) && !Validator.isURL(linkedin)) {
    errors.linkedin = "Incorrect URL";
  }
  if (!isEmpty(twitter) && !Validator.isURL(twitter)) {
    errors.twitter = "Incorrect URL";
  }
  if (!isEmpty(instagram) && !Validator.isURL(instagram)) {
    errors.instagram = "Incorrect URL";
  }

  if (Validator.isEmpty(handle)) {
    errors.handle = "Field handle is required";
  }
  if (Validator.isEmpty(status)) {
    errors.status = "Field status is required";
  }
  if (Validator.isEmpty(skills)) {
    errors.skills = "Field Skills is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateExperienceInput;
