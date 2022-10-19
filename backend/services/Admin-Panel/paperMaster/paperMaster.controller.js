const {
  commonResponse,
  commonFunctions,
  customErrorResponse,
} = require("../../../helper");
var ObjectId = require("mongoose").Types.ObjectId;
const paperMasterModel = require("./paperMaster.model");
const paperService = require("./paperMaster.services");
const validatePaperMaster = require("../../../validation/paperMasterValidation/paperMaster.validation");

module.exports = {
  createPaperMaster: async (req, res, next) => {
    try {
      if (!req.user) {
        return res.json({
          error: true,
          statusCode: 401,
          message: "Invalid Admin login",
          errors: "Only Admin can able to action on this module ",
        });
      }

      var { errors, isValid } = validatePaperMaster(req.body);

      if (isValid == false) {
        return commonResponse.customErrorResponse(
          res,
          422,
          "Something went wrong",
          errors
        );
      }
      const paperCheck = await paperService.paperMasterCheck(req.body);
      if (paperCheck) {
        errors.paper_name = "Paper For This  Already Created";
        return commonResponse.customErrorResponse(
          res,
          422,
          "Something went wrong",
          errors
        );
      }

      const paperCreate = await paperService.create(req.body);

      if (paperCreate) {
        return commonResponse.success(
          res,
          201,
          "Successfully Created PaperMaster",
          paperCreate
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

  getPaperMasterByID: async (req, res, next) => {
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

      let findPaperMasterById = await paperService.getById(id);

      if (findPaperMasterById) {
        commonResponse.success(
          res,
          200,
          "Successfully Get paperMaster By Id",
          findPaperMasterById
        );
      } else if (findPaperMasterById === null) {
        return commonResponse.customErrorResponse(
          res,
          400,
          "Something went wrong",
          "PaperMaster_NOT_FOUND"
        );
      }
    } catch (error) {
      console.log(error, "--> Catch error");
      return next(error);
    }
  },

  getPaperMaster: async (req, res, next) => {
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
      let order_column = req.query.order_column || "paper_name";
      let sort_order = req.query.sort_order == "asc" ? "ASC" : "DESC";
      let sort_array = [order_column, sort_order];
      let filter_value = req.query.filter_value || "";

      let TotalCount = await paperMasterModel.countDocuments({
        is_deleted: 0,
      });

      let findAllPaperMaster = await paperService.allPaperMaster(
        req.query,
        sort_array,
        filter_value
      );

      if (findAllPaperMaster.length == 0) {
        errors = "PaperMaster not found";
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
          "Successfully Get All paperMaster",
          { TotalCount, findAllPaperMaster }
        );
      }
    } catch (error) {
      console.log(error, "--> Catch error");
      return next(error);
    }
  },

  updatePaperMaster: async (req, res, next) => {
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
      var { errors, isValid } = validatePaperMaster(req.body);

      if (isValid == false) {
        return commonResponse.customErrorResponse(
          res,
          422,
          "Something went wrong",
          errors
        );
      }
      let updatedPaperMaster = await paperService.update(id, req.body);

      if (updatedPaperMaster == null) {
        errors.error = "PaperMaster not found for This Id";
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
          "Successfully updated PaperMaster",
          updatedPaperMaster
        );
      }
    } catch (error) {
      console.log(error, "--> Catch error");
      return next(error);
    }
  },

  deletePaperMaster: async (req, res, next) => {
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
      let deletePaperMaster = await paperService.delete(id);

      if (
        deletePaperMaster.modifiedCount == 0 &&
        deletePaperMaster.matchedCount == 0
      ) {
        let errors = "PaperMaster not found";
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
          "Successfully delete PaperMaster By Id",
          deletePaperMaster
        );
      }
    } catch (error) {
      console.log(error, "--> Catch error");
      return next(error);
    }
  },

  multipalDeletePaperMaster: async (req, res, next) => {
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

      let getPaperMaster = await paperService.isMultiDelete(multipalIds);

      if (getPaperMaster.modifiedCount == 0) {
        return commonResponse.customErrorResponse(
          res,
          422,
          "PaperMaster not deletd for this id"
        );
      } else {
        return commonResponse.success(
          res,
          200,
          "Successfully Deleted Multiple PaperMaster",
          getPaperMaster
        );
      }
    } catch (error) {
      console.log(error, "--> Catch error");
      return next(error);
    }
  },

  getPaperName: async (req, res, next) => {
    try {
      if (!req.user) {
        return res.json({
          error: true,
          statusCode: 401,
          message: "Invalid  login",
          errors: "Admin & Student can able to action on this module ",
        });
      }

      const { page = 1, limit = 10 } = req.query;
      let order_column = req.query.order_column || "subject_name";
      let sort_order = req.query.sort_order == "asc" ? "ASC" : "DESC";
      let sort_array = [order_column, sort_order];
      let filter_value = req.query.filter_value || "";
      let status = req.query.status || "";

      let findAllPaper = await paperService.allPaperNameGet(
        req.query,
        sort_array,
        filter_value,
        status
      );

      let FindAllPaper = findAllPaper.map((index) => index.paper_name);

      var allPaperName = [];
      if (FindAllPaper) {
        for (let i = 0; i < FindAllPaper.length; i++) {
          var obj = {};
          obj["value"] = FindAllPaper[i];
          obj["label"] = FindAllPaper[i];
          allPaperName.push(obj);
        }

        return commonResponse.success(
          res,
          200,
          "Get All Paper Name",
          allPaperName
        );
      } else {
        return commonResponse.customErrorResponse(
          res,
          422,
          "Something went wrong"
        );
      }
    } catch (error) {
      console.log("Find all subject not success --> ", error);
      return next(error);
    }
  },
};
