const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const adminService = require("./admin.services");
const isEmpty = require("../../../validation/isEmpty");
const {
  commonResponse,
  commonFunctions,
  customErrorResponse,
} = require("../../../helper");
const validateLoginInput = require("../../../validation/Authvalidation/loginValidation");
var generator = require("generate-password");
const validateForgotPasswordInput = require("../../../validation/Authvalidation/forgotPasswordValidation");
const validateForgotChagePasswordInput = require("../../../validation/Authvalidation/resetPasswordValidation");
const studentModel = require("../../Student-Panel/student/student.model");
const subjectModel = require("../subject/subject.model");
const questionaryModel = require("../questionnaire/questionnaire.model");

module.exports = {
  login: async (req, res, next) => {
    try {
      const { password, username } = req.body;
      const { errors, isValid } = validateLoginInput(req.body);
      if (!isValid) {
        return commonResponse.customErrorResponse(
          res,
          422,
          "Something went wrong",
          errors
        );
      }

      const Admin = await adminService.login(req.body);

      if (!Admin.role == "admin") {
        errors.error = "Only admin can able to login in this page";
        return commonResponse.customErrorResponse(
          res,
          422,
          "Something went wrong",
          errors
        );
      }

      if (!Admin || !isEmpty(errors)) {
        errors.error = "Email Address Does not exists";
        return commonResponse.customErrorResponse(
          res,
          422,
          "Something went wrong",
          errors
        );
      } else if (Admin.role != "admin") {
        errors.role = "Role does not valid";
        return commonResponse.customErrorResponse(
          res,
          422,
          "Something went wrong",
          errors
        );
      }

      bcrypt.compare(password, Admin.password, (err, data) => {
        if (err) throw err;
        if (data) {
          const token = "Bearer " + Admin.getJWTToken();
          return commonResponse.success(res, 200, "Successfully Login", {
            ability: [{ action: "manage", subject: "all" }],
            Admin_Details: Admin,
            Token: token,
          });
        } else {
          errors.password = "Invalid Password";
          return commonResponse.customErrorResponse(
            res,
            422,
            "Something went wrong",
            errors
          );
        }
      });
    } catch (error) {
      console.log(error);
    }
  },

  forgotPassword: async (req, res, next) => {
    try {
      // if (!req.user) {
      //   return res.json({
      //     error: true,
      //     statusCode: 401,
      //     message: "Invalid Admin login",
      //     errors: "Only Admin can able to access on this page!",
      //   });
      // }

      const { username } = req.body;
      const { errors, isValid } = validateForgotPasswordInput(req.body);

      if (!isValid || !isEmpty(errors)) {
        return commonResponse.customErrorResponse(
          res,
          422,
          "Something went wrong",
          errors
        );
      }

      const Admin = await adminService.FindAdmin(req.body);

      if (Admin) {
        var token = crypto.randomBytes(20).toString("hex");
        var link = "api/v1/admin/resetPassword/" + token;
        var AdminID = Admin._id;
        const updatetoken = await adminService.forgotpassUpdate(token, AdminID);
        var transporter = nodemailer.createTransport({
          host: "mail.thinktanker.io",
          port: 465,
          auth: {
            user: "shubhamvaishnav@thinktanker.in",
            pass: "Shubham@Think300",
          },
        });

        const mailOptions = {
          from: "shubhamvaishnav@thinktanker.in",
          to: Admin.email,
          subject: "Reset Password",
          html: `ResetPassword-Link : ${link}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error.message);
          } else {
            console.log(info, ":info");
          }
        });
        return commonResponse.success(
          res,
          200,
          "Check your email for new password",
          link
        );
      } else {
        errors.Admin = "Please Enter Valid Email Address";
        return commonResponse.customErrorResponse(
          res,
          422,
          "Something went wrong",
          errors
        );
      }
    } catch (error) {
      console.log(error);
    }
  },

  resetPassword: async (req, res, next) => {
    try {
      if (!req.user) {
        return res.json({
          error: true,
          statusCode: 401,
          message: "Invalid Admin login",
          errors: "Only Admin can able to access on this page!",
        });
      }
      var AdminID = req.user._id;
      var token = req.params.token;
      const TokenVerify = await adminService.Valid_token(token);
      const { errors, isValid } = validateForgotChagePasswordInput(req.body);
      var response = {};

      if (!TokenVerify) {
        errors.password = "Password reset token is invalid or has expired.";
      }

      if (!isValid || !isEmpty(errors)) {
        return commonResponse.customErrorResponse(
          res,
          422,
          "Something went wrong",
          errors
        );
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.password, salt, async (err, hash) => {
            const HashPassword = hash;
            const updateAdmin = await adminService.UpdatePassword(
              token,
              HashPassword,
              AdminID
            );
            return commonResponse.success(
              res,
              200,
              "your Password Successfully Changed"
            );
          });
        });
      }
    } catch (e) {
      next(e);
    }
  },

  dashboard: async (req, res, next) => {
    try {
      let studentCount = await studentModel.countDocuments({ is_deleted: 0 });
      let studentActiveCount = await studentModel.countDocuments({
        is_deleted: 0,
        status: "active",
      });
      let studentInactiveCount = await studentModel.countDocuments({
        is_deleted: 0,
        status: "inactive",
      });

      let subjectCount = await subjectModel.countDocuments({ is_deleted: 0 });
      let subjectActiveCount = await subjectModel.countDocuments({
        is_deleted: 0,
        status: "active",
      });
      let subjectInactiveCount = await subjectModel.countDocuments({
        is_deleted: 0,
        status: "inactive",
      });

      let questionaryCount = await questionaryModel.countDocuments({
        is_deleted: 0,
      });
      let questionaryACTActiveCount = await questionaryModel.countDocuments({
        is_deleted: 0,
        is_type: "ACT",
        isActive: "active",
      });
      let questionaryACTInActiveCount = await questionaryModel.countDocuments({
        is_deleted: 0,
        is_type: "ACT",
        isActive: "inactive",
      });
      let questionarySATActiveCount = await questionaryModel.countDocuments({
        is_deleted: 0,
        is_type: "SAT",
        isActive: "active",
      });
      let questionarySATInActiveCount = await questionaryModel.countDocuments({
        is_deleted: 0,
        is_type: "SAT",
        isActive: "inactive",
      });

      return commonResponse.success(
        res,
        200,
        "Successfully dashboard data get",
        {
          StudentCount: studentCount,
          TotalActiveStudent: studentActiveCount,
          TotalInActiveStudent: studentInactiveCount,
          SubjectCount: subjectCount,
          TotalActiveSubject: subjectActiveCount,
          TotalInActiveSubject: subjectInactiveCount,
          Total_Questionnaire: questionaryCount,
          Total_Ques_ACT_ActiveCount: questionaryACTActiveCount,
          Total_Ques_ACT_InActiveCount: questionaryACTInActiveCount,
          Total_Ques_SAT_ActiveCount: questionarySATActiveCount,
          Total_Ques_SAT_InActiveCount: questionarySATInActiveCount,
        }
      );
    } catch (error) {
      console.log(error, "-----------> error");
    }
  },
};
