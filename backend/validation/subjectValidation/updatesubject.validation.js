const Validator = require("validator");
const isEmpty = require("../isEmpty");

module.exports = function validateSubject(data) {
  let errors = {};

  data.subject_name = !isEmpty(data.subject_name) ? data.subject_name : "";

  //   if (Validator.isEmpty(data.subject_name)) {
  //     errors.subject_name = "Subject name is required.";
  //   }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
