const questionnaireModel = require("../questionnaire/questionnaire.model");
const subjectModel = require("../subject/subject.model");
const examService = require("../appearedExam/exam.services");
const {
  commonResponse,
  commonFunctions,
  customErrorResponse,
} = require("../../../helper");

module.exports = {
  queAnsDisply: async (req, res, next) => {
    try {
      let queand_data = await examService.isQuestion(req.body);

      if (queand_data) {
        return commonResponse.success(
          res,
          200,
          "Successfully get all questionnaire details",
          queand_data
        );
      } else {
        errors.error = "Data can not get";
        return commonResponse.customErrorResponse(
          res,
          422,
          "Something went wrong",
          errors
        );
      }
    } catch (error) {
      console.log(error, "--> Catch error");
      return next(error);
    }
  },

  studentSummery: async (req, res, next) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      let order_column = req.query.order_column || "name";
      let sort_order = req.query.sort_order == "asc" ? "ASC" : "DESC";
      let sort_array = [order_column, sort_order];
      let filter_value = req.query.filter_value || "";
      let status = req.query.status || "";

      let studentdata = await examService.summery(
        req.query,
        sort_array,
        status,
        filter_value
      );
      if (studentdata) {
        commonResponse.success(
          res,
          200,
          "Successfully get student by Id",
          studentdata
        );
      } else if (studentdata === null) {
        return commonResponse.customErrorResponse(
          res,
          400,
          "Something went wrong",
          "User_Not_Found"
        );
      }
    } catch (error) {
      console.log(error, "--> Catch error");
      return next(error);
    }
  },

  studentSummerByID: async (req, res, next) => {
    try {
      var id = req.params.id;
      let findStudentById = await examService.get(id);

      if (findStudentById) {
        commonResponse.success(
          res,
          200,
          "Successfully Get Student By Id",
          findStudentById
        );
      } else if (findStudentById === null) {
        return commonResponse.customErrorResponse(
          res,
          400,
          "Something went wrong",
          "User_Not_Found"
        );
      }
    } catch (error) {
      console.log(error, "--> Catch error");
      return next(error);
    }
  },
};
