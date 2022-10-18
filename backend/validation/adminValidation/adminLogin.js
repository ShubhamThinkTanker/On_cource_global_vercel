const Validator = require("validator");
const isEmpty = require("../isEmpty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.mobile_no = !isEmpty(data.mobile_no) ? data.mobile_no : "";
  data.role = !isEmpty(data.role) ? data.role : "";

  if (Validator.isEmpty(data.email || data.mobile_no)) {
    errors.email = "Email Or Mobile is required";
  }

  if (data.email) {
    if (!Validator.isEmail(data.email)) {
      errors.email = "Email format is Not Valid";
    }
  } else if (data.mobile_no) {
    var phoneno = /^\d{10}$/;
    if (!data.mobile_no.match(phoneno)) {
      errors.mobile_no = "Mobile no should be 10 Digit";
    }
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }

  if (Validator.isEmpty(data.role)) {
    errors.role = "Role is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
