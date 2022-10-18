const Validator = require("validator");
const isEmpty = require("../isEmpty");

module.exports = function validateRegisterInput(data) {
  let errors = {};



  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    if (Validator.isEmpty(element.subject_id)) {
      errors.subject_id = "Subject Id is required.";
    }

    if (Validator.isEmpty(element.questionnaire_id)) {
      errors.questionnaire_id = "Questionnaire Id is required.";
    }

    if (Validator.isEmpty(element.answered)) {
      errors.answered = "Right Answer is required.";
    }

    // if (Validator.isEmpty(element.submited_answered)) {
    //   errors.submited_answered = "Submited Answered is required.";
    // }
  }



  return {
    errors,
    isValid: isEmpty(errors),
  };
};
