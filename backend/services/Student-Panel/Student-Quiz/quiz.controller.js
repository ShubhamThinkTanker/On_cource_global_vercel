const quizService = require("./quiz.services");
const {
  commonResponse,
  commonFunctions,
  customErrorResponse,
} = require("../../../helper");
const quizValidation = require("../../../validation/quizValidation/quizvalidation");
const subjectModel = require("../../Admin-Panel/subject/subject.model");
const questionModel = require("../../Admin-Panel/questionnaire/questionnaire.model");

module.exports = {
  quiz: async (req, res, next) => {
    try {
      if (!req.user) {
        return res.json({
          error: true,
          statusCode: 401,
          message: "Invalid Student login",
          errors: "Only Student can able to action on this module ",
        });
      }
      let id = req.user.id;

      const { errors, isValid } = quizValidation(req.body)
      if (!isValid) {
        return commonResponse.customErrorResponse(res, 422, 'Something went wrong', errors);
      }

      if (req.body.type == "temp") {
        var tempData = req.body.Temp_Quiz_Data;
        var tempQuizDetails = await quizService.tempcreate(
          tempData, id
        );

        if (tempQuizDetails) {
          return commonResponse.success(
            res,
            200,
            "Success fully Temp Quiz complete",
            tempQuizDetails
          );
        } else {
          errors.error = "Something wrong";
          return commonResponse.customErrorResponse(
            res,
            422,
            "Something went wrong",
            errors
          );
        }
      }

      else if (req.body.type == "end") {
        var questionData = req.body.Temp_Quiz_Data;

        const quizDetails = await quizService.create(questionData, id);
        if (quizDetails) {
          return commonResponse.success(
            res,
            200,
            "Success fully quiz complete",
            quizDetails
          );
        } else {
          errors.error = "Something wrong";
          return commonResponse.customErrorResponse(
            res,
            422,
            "Something went wrong",
            errors
          );
        }

      }
    } catch (error) {
      console.log(error);
    }
  },
};
