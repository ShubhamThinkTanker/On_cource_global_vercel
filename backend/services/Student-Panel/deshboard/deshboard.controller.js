const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const deshboardService = require("./deshboard.services");
const isEmpty = require("../../../validation/isEmpty");
const {
  commonResponse,
  commonFunctions,
  customErrorResponse,
} = require("../../../helper");
const studentModel = require("../student/student.model");
const QuizModel = require("../Student-Quiz/quiz.model");

module.exports = {
  deshboard: async (req, res, next) => {
    try {

      if (!req.user) {
        return res.json({
          error: true,
          statusCode: 401,
          message: "Invalid Admin login",
          errors: "Only student can able to action on this module ",
        });
      }

      const { page = 1, limit = 2 } = req.query;
      let order_column = req.query.order_column || "createdAt";
      let sort_order = req.query.sort_order == "asc" ? "ASC" : "DESC";
      let sort_array = [order_column, sort_order];
      let filter_value = req.query.filter_value || "";

      let findAllexam = await deshboardService.get(
        req.query,
        sort_array,
        filter_value
      );
      if (findAllexam) {
        return commonResponse.success(
          res,
          200,
          "Successfully get all deshboard",
          findAllexam
        );

      } else {
        return commonResponse.customErrorResponse(
          res,
          422,
          "Something went wrong",
          errors
        );
      }
    } catch (error) {
      console.log("Find All User Not Success --> ", error);
      return next(error);
    }
  },

  countApi: async (req, res, next) => {
    try {
      if (!req.user) {
        return res.json({
          error: true,
          statusCode: 401,
          message: "Invalid Admin login",
          errors: "Only student can able to action on this module ",
        });
      }

      let QuizCount = await QuizModel.countDocuments({
        stundent_id: req.user._id,
        is_deleted: 0,
      });
      let ComplteQuizCount = await QuizModel.countDocuments({
        stundent_id: req.user._id,
        is_deleted: 0,
        status: "complete",
      });
      let resumeQuizCount = await QuizModel.countDocuments({
        stundent_id: req.user._id,
        is_deleted: 0,
        status: "resume",
      });
      let rejectQuizCount = await QuizModel.countDocuments({
        stundent_id: req.user._id,
        is_deleted: 0,
        status: "reject",
      });

      return commonResponse.success(
        res,
        200,
        "Successfully dashboard data get",
        {
          Quiz_Count: QuizCount,
          Complte_Quiz_Count: ComplteQuizCount,
          Resume_Quiz_Count: resumeQuizCount,
          Reject_Quiz_Count: rejectQuizCount,
        }
      );
    } catch (error) {
      console.log(error, "----------------->error");
    }
  },
};
