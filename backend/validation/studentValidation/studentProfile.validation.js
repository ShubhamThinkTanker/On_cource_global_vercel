const Validator = require("validator");
const isEmpty = require("../isEmpty");

module.exports = function validateRegisterInput(data) {
  let errors = {};
  data.username = !isEmpty(data.username) ? data.username : "";
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.mobile_no = !isEmpty(data.mobile_no) ? data.mobile_no : "";
  data.birth_date = !isEmpty(data.birth_date) ? data.birth_date : "";
  data.gender = !isEmpty(data.gender) ? data.gender : "";
  data.street_add1 = !isEmpty(data.street_add1) ? data.street_add1 : "";
  data.city = !isEmpty(data.city) ? data.city : "";
  data.state = !isEmpty(data.state) ? data.state : "";
  data.zip = !isEmpty(data.zip) ? data.zip : "";
  data.country = !isEmpty(data.country) ? data.country : "";

  if (Validator.isEmpty(data.username)) {
    errors.username = "User name is required.";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name is required.";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is required";
  }

  if (Validator.isEmpty(data.gender)) {
    errors.gender = "Gender is required.";
  }

  if (Validator.isEmpty(data.birth_date)) {
    errors.birth_date = "BirthDate is required.";
  }

  if (Validator.isEmpty(data.street_add1)) {
    errors.street_add1 = "Address is required.";
  }

  if (Validator.isEmpty(data.city)) {
    errors.city = "City name is required.";
  }

  if (Validator.isEmpty(data.state)) {
    errors.state = "State name is required.";
  }

  if (Validator.isEmpty(data.zip)) {
    errors.zip = "Zip code is required.";
  }

  if (Validator.isEmpty(data.country)) {
    errors.country = "Country name is required.";
  }

  if (Validator.isEmpty(data.mobile_no) || data.mobile_no == "") {
    errors.mobile_no = "Mobile number is required";
  } else if (!data.mobile_no.match(/^\d{10}$/)) {
    errors.mobile_no = "Mobile number should be 10 digit";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
