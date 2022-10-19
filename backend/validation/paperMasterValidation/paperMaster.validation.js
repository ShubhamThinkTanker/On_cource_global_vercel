const Validator = require("validator");
const isEmpty = require("../isEmpty");

module.exports = function validatePaperMaster(data) {
  let errors = {};

  data.paper_name = !isEmpty(data.paper_name) ? data.paper_name : "";
  data.paper_description = !isEmpty(data.paper_description)
    ? data.paper_description
    : "";
  data.year = !isEmpty(data.year) ? data.year : "";

  if (Validator.isEmpty(data.paper_name)) {
    errors.paper_name = "Paper name is required";
  }

  if (Validator.isEmpty(data.paper_description)) {
    errors.paper_description = "Paper description is required";
  }

  if (Validator.isEmpty(data.year)) {
    errors.year = "Year is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
