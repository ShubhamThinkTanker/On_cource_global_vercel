const instructionService = require("./instruction.services");
var ObjectId = require("mongoose").Types.ObjectId;
const instructionModel = require("./instruction.model");
const SubjectModel = require("../subject/subject.model");
const isEmpty = require("../../../validation/isEmpty");
const validateInstruction = require("../../../validation/instructionValidation/instruction.validation");
const {
  commonResponse,
  commonFunctions,
  customErrorResponse,
} = require("../../../helper");

module.exports = {
  createInstruction: async (req, res, next) => {
    try {
      if (!req.user) {
        return res.json({
          error: true,
          statusCode: 401,
          message: "Invalid Admin login",
          errors: "Only Admin can able to action on this module ",
        });
      }
      var { errors, isValid } = validateInstruction(req.body);
      if (!isEmpty(errors)) {
        return commonResponse.customErrorResponse(
          res,
          422,
          "Something went wrong",
          errors
        );
      }

      let subjectId = await instructionService.getsubjectId(
        req.body.subject_name
      );

      if (subjectId == null) {
        errors.subject = "Subject name is not exists";
        return commonResponse.customErrorResponse(
          res,
          422,
          "Something went wrong",
          errors
        );
      }

      let checkInstruction = await instructionService.instructionCheck(
        subjectId._id
      );
      if (checkInstruction) {
        errors.subject = "Instruction For This Subject Already Created";
        return commonResponse.customErrorResponse(
          res,
          422,
          "something went wrong",
          errors
        );
      }

      let id = subjectId._id;
      let name = subjectId.subject_name;

      let createInstruction = await instructionService.instructionCreate(
        req.body,
        id,
        name
      );

      if (createInstruction) {
        return commonResponse.success(
          res,
          201,
          "Successfully Created Instruction",
          createInstruction
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

  getInstructionByID: async (req, res, next) => {
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
      const idVerify = ObjectId.isValid(id);
      if (!idVerify) {
        let errors = "Enter a valid id";
        return commonResponse.customErrorResponse(
          res,
          422,
          "Something went wrong",
          errors
        );
      }

      let findInstructionById = await instructionService.get(id);

      if (findInstructionById.length == 0) {
        errors = "Instruction Not Found";
        return commonResponse.customErrorResponse(
          res,
          400,
          "Something went wrong",
          errors
        );
      } else {
        commonResponse.success(
          res,
          200,
          "Successfully Get Instruction By Id",
          findInstructionById
        );
      }
    } catch (error) {
      console.log(error, "--> Catch error");
      return next(error);
    }
  },

  updateInstruction: async (req, res, next) => {
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
      const idVerify = ObjectId.isValid(id);
      if (!idVerify) {
        let errors = "Enter a valid id";
        return commonResponse.customErrorResponse(
          res,
          422,
          "Something went wrong",
          errors
        );
      }
      var { errors, isValid } = validateInstruction(req.body);

      if (!isEmpty(errors)) {
        return commonResponse.customErrorResponse(
          res,
          422,
          "Something went wrong",
          errors
        );
      }
      let updatedInstruction = await instructionService.update(id, req.body);

      if (updatedInstruction == null) {
        errors.error = "Instruction not found";
        return commonResponse.customErrorResponse(
          res,
          400,
          "Something went wrong",
          errors
        );
      } else {
        commonResponse.success(
          res,
          200,
          "Successfully updated instruction",
          updatedInstruction
        );
      }
    } catch (error) {
      console.log(error, "--> Catch error");
      return next(error);
    }
  },

  deleteInstruction: async (req, res, next) => {
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
      const idVerify = ObjectId.isValid(id);
      if (!idVerify) {
        let errors = "Enter a valid id";
        return commonResponse.customErrorResponse(
          res,
          422,
          "something went wrong",
          errors
        );
      }
      let deleteInstruction = await instructionService.delete(id);

      if (
        deleteInstruction.modifiedCount == 0 &&
        deleteInstruction.matchedCount == 0
      ) {
        let errors = "Instruction not found";
        return commonResponse.customErrorResponse(
          res,
          400,
          "Something went wrong",
          errors
        );
      } else {
        commonResponse.success(
          res,
          200,
          "Successfully delete Instruction By Id",
          deleteInstruction
        );
      }
    } catch (error) {
      console.log(error, "--> Catch error");
      return next(error);
    }
  },

  multipalDeleteInstruction: async (req, res, next) => {
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
      let getInstruction = await instructionService.isMultiDelete(multipalIds);

      if (getInstruction.modifiedCount == 0) {
        return commonResponse.customErrorResponse(
          res,
          422,
          "Can not find data of this id "
        );
      } else {
        return commonResponse.success(
          res,
          200,
          "Successfully Deleted Multiple Instruction",
          getInstruction
        );
      }
    } catch (error) {
      console.log(error, "--> Catch error");
      return next(error);
    }
  },

  getAllInstruction: async (req, res, next) => {
    try {
      if (!req.user) {
        return res.json({
          error: true,
          statusCode: 401,
          message: "Invalid Admin  login",
          errors: " Only Admin can able to action on this module ",
        });
      }
      const { page = 1, limit = 2 } = req.query;
      let order_column = req.query.order_column || "total_marks";
      let sort_order = req.query.sort_order == "asc" ? "ASC" : "DESC";
      let sort_array = [order_column, sort_order];
      let filter_value = req.query.filter_value || "";

      let TotalCount = await instructionModel.countDocuments({
        is_deleted: 0,
      });

      let findAllInstruction = await instructionService.AllInstruction(
        req.query,
        sort_array,
        filter_value
      );

      if (findAllInstruction.length == 0) {
        errors = "Instruction not found";
        return commonResponse.customErrorResponse(
          res,
          422,
          "Something went wrong",
          errors
        );
      } else {
        return commonResponse.success(
          res,
          200,
          "Successfully Get All Instruction",
          { TotalCount, findAllInstruction }
        );
      }
    } catch (error) {
      console.log(error, "--> Catch error");
      return next(error);
    }
  },

  getAllSubject: async (req, res, next) => {
    try {
      if (!req.user) {
        return res.json({
          error: true,
          statusCode: 401,
          message: "Invalid Admin login",
          errors: "Only Admin can able to action on this module ",
        });
      }

      const { page = 1, limit = 10 } = req.query;
      let order_column = req.query.order_column || "subject_name";
      let sort_order = req.query.sort_order == "asc" ? "ASC" : "DESC";
      let sort_array = [order_column, sort_order];
      let filter_value = req.query.filter_value || "";
      let status = req.query.status || "";

      let findAllSubject = await instructionService.allSubjectGet(
        req.query,
        sort_array,
        filter_value,
        status
      );

      let Total_active = await SubjectModel.countDocuments({
        status: "active",
      });
      let Total_inactive = await SubjectModel.countDocuments({
        status: "inactive",
      });

      if (findAllSubject.length == 0) {
        errors = "Subject Not Found";
        return commonResponse.customErrorResponse(
          res,
          422,
          "Something went wrong",
          errors
        );
      } else {
        return commonResponse.success(
          res,
          200,
          "Successfully get all Subject Details",
          {
            TotalActive: Total_active,
            TotalInActive: Total_inactive,
            Subject_Details: findAllSubject,
          }
        );
      }
    } catch (error) {
      console.log(error, "--> Catch error");
      return next(error);
    }
  },

  getAllInstructionForStudent: async (req, res, next) => {
    try {
      if (!req.user) {
        return res.json({
          error: true,
          statusCode: 401,
          message: "Invalid Student  login",
          errors: "  Student can able to action on this module ",
        });
      }

      let findAllInstruction =
        await instructionService.allSubjectInstructionForStudent(req.query);

      if (findAllInstruction.length == 0) {
        errors = "Instruction not found";
        return commonResponse.customErrorResponse(
          res,
          422,
          "Something went wrong",
          errors
        );
      } else {
        return commonResponse.success(
          res,
          200,
          "Successfully Get All Instruction",
          { findAllInstruction }
        );
      }
    } catch (error) {
      console.log(error, "--> Catch error");
      return next(error);
    }
  },
};
