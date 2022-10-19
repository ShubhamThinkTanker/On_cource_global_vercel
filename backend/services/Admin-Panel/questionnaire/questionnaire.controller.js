const questionnaireService = require("./questionnaire.services");
const questionnaireModel = require("./questionnaire.model");
const isEmpty = require("../../../validation/isEmpty");
const validateQuestionnaire = require("../../../validation/questionnaireValidation/questionnaire.validation");
const {
  commonResponse,
  commonFunctions,
  customErrorResponse,
} = require("../../../helper");
const subjectModel = require("../subject/subject.model");
const paperModel = require("../paperMaster/paperMaster.model");
const XLSX = require("xlsx");
const { exists } = require("./questionnaire.model");

module.exports = {
  createQuestionnaire: async (req, res, next) => {
    try {
      if (!req.user) {
        return res.json({
          error: true,
          statusCode: 401,
          message: "Invalid Admin login",
          errors: "Only Admin can able to action on this module ",
        });
      }
      var { errors, isValid } = validateQuestionnaire(req.body);

      var paperId = req.body.paper_name;
      console.log(paperId);

      var paperData = await paperModel.findOne({ paper_name: paperId });
      console.log(paperData, ":paperData");
      if (paperData === null) {
        errors.paper = `Paper Is Not Exists`;
        return commonResponse.customErrorResponse(
          res,
          422,
          "Something went wrong",
          errors
        );
      }

      let subjectName = req.body.subject;
      let subjectId = await questionnaireService.getsubjectId(subjectName);
      if (subjectId === null) {
        errors.subject = `Subject Is Not Exists`;
        return commonResponse.customErrorResponse(
          res,
          422,
          "Something went wrong",
          errors
        );
      }

      var id = subjectId._id;
      var name = subjectId.subject_name;

      let isQuestionExistedOrNot = await questionnaireService.isQuestion(
        req.body
      );

      if (isQuestionExistedOrNot) {
        errors.question = "Question Is Already Exist";
      }

      if (!isEmpty(errors)) {
        return commonResponse.customErrorResponse(
          res,
          422,
          "Something went wrong",
          errors
        );
      }
      let createQuestionnaire = await questionnaireService.questionnaireCreate(
        req.body,
        id,
        name,
        paperData
      );

      if (createQuestionnaire) {
        return commonResponse.success(
          res,
          201,
          "Successfully Create Questionnarie",
          createQuestionnaire
        );
      } else {
        errors.error = "Something went wrong, Please try again Later";
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

  getAllSATQuestionnaire: async (req, res, next) => {
    try {
      if (!req.user) {
        return res.json({
          error: true,
          statusCode: 401,
          message: "Invalid Admin login",
          errors: "Only Admin can able to action on this module ",
        });
      }

      let { page = 1, limit = 10 } = req.query;

      let filter_value = req.query.filter_value || "";
      let isActive = req.query.isActive || "";

      let findAllQuestionnaire =
        await questionnaireService.allSATQuestionnaireGet(
          req.query,
          filter_value,
          isActive
        );

      let Total_active = await questionnaireModel.countDocuments({
        isActive: "active",
        is_type: "SAT",
        is_deleted: 0,
      });
      let Total_inactive = await questionnaireModel.countDocuments({
        isActive: "inactive",
        is_type: "SAT",
        is_deleted: 0,
      });
      let TotalCount = await questionnaireModel.countDocuments({
        is_deleted: 0,
        is_type: "SAT",
      });

      if (findAllQuestionnaire) {
        return commonResponse.success(
          res,
          200,
          "Successfully Get All Questionnaire Details",
          {
            TotalCount: TotalCount,
            TotalActive: Total_active,
            TotalInActive: Total_inactive,
            Questionnaire_Details: findAllQuestionnaire,
          }
        );
      } else {
        return commonResponse.customErrorResponse(
          res,
          422,
          "Something Went Wrong",
          errors
        );
      }
    } catch (error) {
      console.log(error, "--> Catch error");
      return next(error);
    }
  },

  getAllACTQuestionnaire: async (req, res, next) => {
    try {
      if (!req.user) {
        return res.json({
          error: true,
          statusCode: 401,
          message: "Invalid login",
          errors: "Only Admin & Student can able to action on this module ",
        });
      }

      let { page = 1, limit = 10 } = req.query;

      let filter_value = req.query.filter_value || "";
      let isActive = req.query.isActive || "";
      let paperName = req.query.paper_name || "";

      // let findSubjectWise = { }

      if (filter_value != "") {
        var regex = new RegExp(filter_value, "i");
        filter_value = {
          $or: [{ subject_name: regex }],
        };
      } else {
        filter_value = {};
      }

      let findAllQuestionnaire =
        await questionnaireService.allACTQuestionnaireGet(
          req.query,
          filter_value,
          isActive,
          paperName
        );

      let Total_active = await questionnaireModel
        .find({
          $and: [
            { is_deleted: 0 },
            { is_type: "ACT" },
            { isActive: "active" },
            filter_value,
          ],
        })
        .count();
      let Total_inactive = await questionnaireModel
        .find({
          $and: [
            { is_deleted: 0 },
            { is_type: "ACT" },
            { isActive: "inactive" },
            filter_value,
          ],
        })
        .count();
      let TotalCount = await questionnaireModel
        .find({
          $and: [{ is_deleted: 0 }, { is_type: "ACT" }, filter_value],
        })
        .count();

      if (findAllQuestionnaire) {
        return commonResponse.success(
          res,
          200,
          "Successfully Get All ACT Questionnaire Details",
          {
            TotalCount: TotalCount,
            TotalActive: Total_active,
            TotalInActive: Total_inactive,
            Questionnaire_Details: findAllQuestionnaire,
          }
        );
      } else {
        return commonResponse.customErrorResponse(
          res,
          422,
          "Something Went Wrong",
          errors
        );
      }
    } catch (error) {
      console.log(error, "--> Catch error");
      return next(error);
    }
  },

  getQuestionnaireByID: async (req, res, next) => {
    try {
      if (!req.user) {
        return res.json({
          error: true,
          statusCode: 401,
          message: "Invalid Admin login",
          errors: "Only Admin can able to action on this module ",
        });
      }
      var id = req.params.id;

      let findQuestionnaireById = await questionnaireService.get(id);
      if (findQuestionnaireById) {
        commonResponse.success(
          res,
          200,
          "Successfully Get Questionnaire By Id",
          findQuestionnaireById
        );
      } else if (findQuestionnaireById === null) {
        return commonResponse.customErrorResponse(
          res,
          400,
          "Something went wrong",
          "QUESTIONNAIRE_NOT_FOUND"
        );
      }
    } catch (error) {
      console.log(error, "--> Catch error");
      return next(error);
    }
  },

  updateQuestionnaire: async (req, res, next) => {
    try {
      if (!req.user) {
        return res.json({
          error: true,
          statusCode: 401,
          message: "Invalid Admin login",
          errors: "Only Admin can able to action on this module ",
        });
      }
      var id = req.params.id;

      var { errors, isValid } = validateQuestionnaire(req.body);

      let subjectIsExist = await questionnaireService.isSubjectIsExist(
        req.body
      );

      if (!subjectIsExist) {
        errors.subject = "Subject Is Not Exist  ";
      }

      let isQuestionExistedOrNot = await questionnaireService.isQuestion(
        req.body
      );

      if (isQuestionExistedOrNot !== null && isQuestionExistedOrNot._id != id) {
        errors.question = "Question Is Already Exist";
      }

      if (!isEmpty(errors)) {
        return commonResponse.customErrorResponse(
          res,
          422,
          "Something went wrong",
          errors
        );
      }

      let updatedQuestione = await questionnaireService.update(id, req.body);

      if (updatedQuestione["error"] == undefined) {
        commonResponse.success(
          res,
          200,
          "Successfully Update Questione",
          updatedQuestione
        );
      } else {
        errors.error = "QUESTIONNAIRE_NOT_FOUND";
        return commonResponse.customErrorResponse(
          res,
          400,
          "Something Went Wrong",
          errors
        );
      }
    } catch (error) {
      console.log(error, "--> Catch error");
      return next(error);
    }
  },
  deleteQuestionnaire: async (req, res, next) => {
    try {
      if (!req.user) {
        return res.json({
          error: true,
          statusCode: 401,
          message: "Invalid Admin login",
          errors: "Only Admin can able to action on this module ",
        });
      }
      var id = req.params.id;
      let deleteQuestionnaire = await questionnaireService.isDelete(id);

      if (deleteQuestionnaire) {
        commonResponse.success(
          res,
          200,
          "Successfully Delete Questionnaire By Id",
          deleteQuestionnaire
        );
      } else {
        errors.error = "QUESTIONNAIRE_NOT_FOUND";
        return commonResponse.customErrorResponse(
          res,
          400,
          "Something went wrong",
          errors
        );
      }
    } catch (error) {
      console.log(error, "--> Catch error");
      return next(error);
    }
  },

  multipalDeleteQuestionnaire: async (req, res, next) => {
    try {
      if (!req.user) {
        return res.json({
          error: true,
          statusCode: 401,
          message: "Invalid Admin login",
          errors: "Only Admin can able to action on this module ",
        });
      }
      let id = req.body;

      let multipalIds = id.map((index) => index._id);

      let getQuestionnaire = await questionnaireService.isMultiDelete(
        multipalIds
      );

      if (getQuestionnaire.deletedCount == 0) {
        return commonResponse.customErrorResponse(
          res,
          422,
          "Can not find data of this id "
        );
      } else {
        return commonResponse.success(
          res,
          200,
          "successfully deleted multiple questionnaire",
          getQuestionnaire
        );
      }
    } catch (error) {
      console.log("delete multipal questionnaire not success --> ", error);
      return next(error);
    }
  },

  getAllQuestionnaireByStudent: async (req, res, next) => {
    try {
      if (!req.user) {
        return res.json({
          error: true,
          statusCode: 401,
          message: "Invalid Student login",
          errors: "Only Student can able to action on this module ",
        });
      }

      let order_column = "question_number";
      let sort_order = "ASC";
      let sort_array = [order_column, sort_order];

      let findAllQuestionnaireByStudent =
        await questionnaireService.allQuestionnaireGetByStudent(
          req.query,
          sort_array
        );

      if (findAllQuestionnaireByStudent) {
        return commonResponse.success(
          res,
          200,
          "Successfully Get All Questionnaire Details",
          {
            Questionnaire_Details: findAllQuestionnaireByStudent,
          }
        );
      } else {
        return commonResponse.customErrorResponse(
          res,
          422,
          "Something Went Wrong",
          errors
        );
      }
    } catch (error) {
      console.log(error, "--> Catch error");
      return next(error);
    }
  },

  getQuestionnaireByIDForStudent: async (req, res, next) => {
    try {
      if (!req.user) {
        return res.json({
          error: true,
          statusCode: 401,
          message: "Invalid User login",
          errors: " Student can able to action on this module ",
        });
      }
      var id = req.params.id;

      let findQuestionnaireById = await questionnaireService.get(id);
      if (findQuestionnaireById) {
        commonResponse.success(
          res,
          200,
          "Successfully Get Questionnaire By Id",
          findQuestionnaireById
        );
      } else if (findQuestionnaireById === null) {
        return commonResponse.customErrorResponse(
          res,
          400,
          "Something went wrong",
          "QUESTIONNAIRE_NOT_FOUND"
        );
      }
    } catch (error) {
      console.log(error, "--> Catch error");
      return next(error);
    }
  },

  flagQuestion: async (req, res, next) => {
    try {
      if (!req.user) {
        return res.json({
          error: true,
          statusCode: 401,
          message: "Invalid Student login",
          errors: "Only Student can able to action on this module ",
        });
      }

      var questionnaireID = req.body.questionnaire_id;
      var flag = req.body.flag;

      let findQuestionnaireById = await questionnaireService.get(
        questionnaireID
      );

      if (findQuestionnaireById === null) {
        return commonResponse.customErrorResponse(
          res,
          422,
          "Something went wrong",
          { Question: `Question Is Not Exists` }
        );
      }

      if (findQuestionnaireById) {
        let Flag = findQuestionnaireById.flag;
        const flagCondition = Flag == 0 ? "1" : "0";

        let flagUpdate = await questionnaireService.FlagUpdate(
          findQuestionnaireById._id,
          flagCondition
        );

        return commonResponse.success(
          res,
          200,
          "Successfully update Question Flag",
          flagUpdate
        );
      } else {
        return commonResponse.customErrorResponse(
          res,
          422,
          "Something Went Wrong",
          errors
        );
      }
    } catch (error) {
      console.log(error, "--> error");
    }
  },

  xlsx: async (req, res, next) => {
    try {
      var data = req.body.excelData;
      // console.log(data, ":data");

      let createQuestionnaire =
        await questionnaireService.ExcellquestionnaireCreate(data);
      // if (createQuestionnaire) {
      //   return commonResponse.success(
      //     res,
      //     200,
      //     "Successfully update Question Flag",
      //     createQuestionnaire
      //   );
      // } else {
      //   return commonResponse.customErrorResponse(
      //     res,
      //     422,
      //     "Something Went Wrong",
      //     { error: "nothing" }
      //   );
      // }

      // for (let index = 0; index < data.length; index++) {
      //   const element = data[index];
      //   let subjectId = await questionnaireService.getsubjectId(
      //     element.subject_name
      //   );

      //   let questionArray = []
      //   if (subjectId !== null) {

      //     let QuestionIsExist = await questionnaireModel.find({ question: element.question })

      //     if (QuestionIsExist !== null) {

      //       let createQuestionnaire =
      //         await questionnaireService.ExcellquestionnaireCreate(
      //           element,
      //           subjectId._id,
      //           subjectId.subject_name
      //         );

      //       questionArray.push(createQuestionnaire)
      //       // console.log(createQuestionnaire, ":questionnaireService")
      //     }

      //     console.log(questionArray, ":questionArray");

      //   }
      //   console.log(questionArray.concat());
      //   // console.log(questionArray, ":questionArray");
      // }
    } catch (error) {
      console.log(error, "error");
    }
  },

  uploadCkeditorImage: async (req, res, next) => {
    try {
      // if (!req.user) {
      //   return res.json({
      //     error: true,
      //     statusCode: 401,
      //     message: "Invalid  login",
      //     errors: "Both can able to action on this module ",
      //   });
      // }
      var editordata = req.body.dataCkeditor;
      var imgTag;
      if (req.body.dataCkeditor.includes("<img>")) {
        imgTag = req.body.dataCkeditor.replace(
          "<img>",
          `<img src=http://localhost:5000/admin/upload/${req.file.filename} />`
        );
      }
      console.log(imgTag, "fdsfsdfs");
      return res.status(200).json({
        image: req.file.filename,
        imgData: imgTag,
        message: "CALLED",
      });
    } catch (error) {
      console.log(error, "--> Catch error");
      return next(error);
    }
  },
};
