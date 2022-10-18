const Validator = require("validator");
const isEmpty = require("../isEmpty");

module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.current_password = !isEmpty(data.current_password) ? data.current_password : "";
    data.new_password = !isEmpty(data.new_password) ? data.new_password : "";
    data.confirm_password = !isEmpty(data.confirm_password) ? data.confirm_password : "";


    if (Validator.isEmpty(data.current_password)) {
        errors.current_password = "Current Password is required.";
    }

    if (Validator.isEmpty(data.new_password)) {
        errors.new_password = "New Password  is required.";
    }

    if (Validator.isEmpty(data.confirm_password)) {
        errors.confirm_password = "Confirm Password is required.";
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};
