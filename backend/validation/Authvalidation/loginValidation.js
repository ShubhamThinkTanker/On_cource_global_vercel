const Validator = require("validator");
const isEmpty = require("../isEmpty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.username = !isEmpty(data.username) ? data.username : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.mobile_no = !isEmpty(data.mobile_no) ? data.mobile_no : "";
  // data.role = !isEmpty(data.role) ? data.role : "";

  if (Validator.isEmpty(data.username)) {
    errors.username = "Email Address is required";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
