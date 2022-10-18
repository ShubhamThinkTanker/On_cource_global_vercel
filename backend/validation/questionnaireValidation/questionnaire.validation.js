const Validator = require("validator");
const isEmpty = require("../isEmpty");

module.exports = function validateQuestionnaire(data) {
  let errors = {};
  data.subject_name = !isEmpty(data.subject_name) ? data.subject_name : "";
  data.is_type = !isEmpty(data.is_type) ? data.is_type : "";
  data.question = !isEmpty(data.question) ? data.question : "";
  // data.question_status = !isEmpty(data.question_status)
  //   ? data.question_status
  //   : "";

  data.question_description = !isEmpty(data.question_description)
    ? data.question_description
    : "";
  data.options = !isEmpty(data.options) ? data.options : "";
  data.question_marks = !isEmpty(data.question_marks)
    ? data.question_marks
    : "";
  data.answer = !isEmpty(data.answer) ? data.answer : "";
  data.answer_description = !isEmpty(data.answer_description)
    ? data.answer_description
    : "";
  // if (Validator.isEmpty(data.subject_name)) {
  //   errors.subject_name = "Subject name is required.";
  // }

  if (Validator.isEmpty(data.question)) {
    errors.question = "Question is required.";
  }

  if (Validator.isEmpty(data.is_type)) {
    errors.is_type = "Type is required.";
  }

  if (Validator.isEmpty(data.question_description)) {
    errors.question_description = "Question description is required.";
  }

  // if (Validator.isEmpty(data.question_status)) {
  //   errors.question_status = "Question Status is required.";
  // }
  if (data.options.length < 2) {
    errors.options = "Options is required. It's need atleast 2 options.";
  }
  if (Validator.isEmpty(data.answer.toString())) {
    errors.answer = "Answer is required.";
  }
  if (Validator.isEmpty(data.question_marks.toString())) {
    errors.question_marks = "Question marks is required.";
  }
  if (Validator.isEmpty(data.answer_description.toString())) {
    errors.answer_description = "Answer description  is required.";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
