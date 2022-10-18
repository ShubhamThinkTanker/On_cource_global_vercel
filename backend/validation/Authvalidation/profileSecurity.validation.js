const Validator = require("validator");
const isEmpty = require("../isEmpty");

module.exports = function validateRegisterInput(data) {
    let errors = {};
    data.currentpassword = !isEmpty(data.currentpassword) ? data.currentpassword : "";
    data.newpassword = !isEmpty(data.newpassword) ? data.newpassword : "";
    data.confirmpassword = !isEmpty(data.confirmpassword) ? data.confirmpassword : "";

    if (Validator.isEmpty(data.currentpassword)) {
        errors.currentpassword = "Current password is required";
    }

    if (Validator.isEmpty(data.newpassword)) {
        errors.newpassword = "New password is required";
    }

    if (Validator.isEmpty(data.confirmpassword)) {
        errors.confirmpassword = "Confirm password is required";
    }

    if (data.newpassword !== data.confirmpassword) {
        errors.password = "New password And Confirm password does not match";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};