const Validator = require("validator");
const isEmpty = require("../isEmpty");

module.exports = function validateIntruction(data) {
  let errors = {};

  // data.subject_id = !isEmpty(data.subject_id) ? data.subject_id : "";
  data.subject_name = !isEmpty(data.subject_name) ? data.subject_name : "";
  data.total_marks = !isEmpty(data.total_marks) ? data.total_marks : "";
  data.description = !isEmpty(data.description) ? data.description : "";
  data.time_duration = !isEmpty(data.time_duration) ? data.time_duration : "";

  // if (Validator.isEmpty(data.subject_id)) {
  //   errors.subject_id = "subject_id is Required";
  // }

  if (Validator.isEmpty(data.subject_name)) {
    errors.subject_name = "Subject name is required.";
  }

  if (Validator.isEmpty(data.total_marks.toString())) {
    errors.total_marks = "Total marks is required";
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = "Description is required";
  }

  if (Validator.isEmpty(data.time_duration.toString())) {
    errors.time_duration = "Time duration is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

//     data.subject_name = !isEmpty(data.subject_name) ? data.subject_name : "";
//     data.total_marks = !isEmpty(data.total_marks) ? data.total_marks : "";
//     // data.description = !isEmpty(data.description) ? data.description : "";
//     // data.time_duration = !isEmpty(data.time_duration) ? data.time_duration : "";

//     if (Validator.isEmpty(data.subject_name)) {
//         errors.subject_name = "Subject name is required.";
//     }
//     if (Validator.isEmpty(data.total_marks)) {
//         errors.total_marks = "Total marks is required.";
//     }
//     // if (Validator.isEmpty(data.description)) {
//     //     errors.description = "description is required.";
//     // }
//     // if (Validator.isEmpty(data.time_duration)) {
//     //     errors.time_duration = "time_duration is required.";
//     // }

//     return {
//         errors,
//         isValid: isEmpty(errors)
//     };
// };
