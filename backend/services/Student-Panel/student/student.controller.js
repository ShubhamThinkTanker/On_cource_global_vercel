const studentModel = require("./student.model");
const studentService = require("./student.services");
const isEmpty = require("../../../validation/isEmpty");
const { log } = require("console");
const crypto = require("crypto");
var generator = require("generate-password");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const { Country, State, City } = require("country-state-city");
const validateLoginInput = require("../../../validation/Authvalidation/loginValidation");
const validateForgotPasswordInput = require("../../../validation/Authvalidation/forgotPasswordValidation");
const validateForgotChagePasswordInput = require("../../../validation/Authvalidation/resetPasswordValidation");
const validateStudentRegister = require("../../../validation/studentValidation/student.validation");
const validateStudentProfile = require("../../../validation/studentValidation/studentProfile.validation");

const validateStudentProfilePassword = require("../../../validation/studentValidation/studentprofilepassword");

const fs = require("fs");
const mime = require("mime");
const fse = require("fs-extra");
const sizeOf = require("image-size");
const subjectModel = require("../../Admin-Panel/subject/subject.model");

const {
  commonResponse,
  commonFunctions,
  customErrorResponse,
} = require("../../../helper");
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

      const Student = await studentService.login(req.body);
      if (Student == null) {
        errors.error = "Invalid Credentials";
        return commonResponse.customErrorResponse(
          res,
          422,
          "Something went wrong",
          errors
        );
      }

      if (Student.is_login == 1) {
        errors.error = "Oops! You or someone else logged in on another device";
        return commonResponse.customErrorResponse(
          res,
          422,
          "Something went wrong",
          errors
        );
      } else if (Student.is_deleted == 1) {
        return commonResponse.customErrorResponse(
          res,
          422,
          "Something went wrong",
          "Credential does not valid"
        );
      }

      if (!Student || !isEmpty(errors)) {
        errors.error = "Email Does not exists";
        return commonResponse.customErrorResponse(
          res,
          422,
          "Something went wrong",
          errors
        );
      } else if (Student.role != "student") {
        errors.role = "Role does not valid";
        return commonResponse.customErrorResponse(
          res,
          422,
          "Something went wrong",
          errors
        );
      }

      bcrypt.compare(password, Student.password, (err, data) => {
        if (err) throw err;
        if (data) {
          var Student_id = Student._id;
          const StudentisLogin = studentService.updateLogin(Student_id);

          const token = "Bearer " + Student.getJWTToken();

          return commonResponse.success(res, 200, "Successfully Login", {
            ability: [{ action: "read", subject: "Auth" }],
            Student_Details: Student,
            Token: token,
          });
        } else {
          errors.password = "Password does not valid !";
          return commonResponse.customErrorResponse(
            res,
            422,
            "Something went wrong",
            errors
          );
        }
      });
    } catch (error) {
      console.log(error, "--> Catch error");
    }
  },

  forgotPassword: async (req, res, next) => {
    try {
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

      const user = await studentService.FindAdmin(req.body);

      if (user) {
        var token = crypto.randomBytes(20).toString("hex");
        var link = "http://localhost:3000/reset-password/" + token;
        var StudentID = user._id;
        const updatetoken = await studentService.UpdateResetLink(
          token,
          StudentID
        );
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
          to: user.email,
          subject: "Reset Password",
          html: `ResetPassword-Link : ${link}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error.message);
          } else {
            console.log(info, "info");
          }
        });

        return commonResponse.success(
          res,
          200,
          "We have e-mailed your password reset link!",
          { ResetPassword_Link: link }
        );
      } else {
        errors.username = "No Student found with this Email Address !";
        return commonResponse.customErrorResponse(
          res,
          422,
          "Something went wrong",
          errors
        );
      }
    } catch (error) {
      console.log(error, "--> Catch error");
    }
  },

  resetPassword: async (req, res, next) => {
    try {
      var token = req.params.token;
      const TokenVerify = await studentService.Valid_token(token);
      const { errors, isValid } = validateForgotChagePasswordInput(req.body);
      var response = {};

      if (!TokenVerify) {
        errors.token = "This password reset token is invalid.";
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

            const updateStudent = await studentService.UpdatePassword(
              token,
              HashPassword
            );
            return commonResponse.success(
              res,
              200,
              "Your password has been reset!"
            );
          });
        });
      }
    } catch (error) {
      console.log(error, "--> Catch error");
    }
  },

  createstudent: async (req, res, next) => {
    try {
      var { errors, isValid } = validateStudentRegister(req.body);

      // let is_exist = await studentService.is_email_exist(req.body);
      // let is_mobile_exist = await studentService.is_mobile_no_exist(req.body);
      // let is_username_exist = await studentService.is_username_exist(req.body);
      // if (is_exist || is_mobile_exist) {
      //   if (is_exist && is_mobile_exist && is_username_exist) {
      //     errors.email = "Email is already exist";
      //     errors.mobile_no = "Mobile no is already exist";
      //     errors.username = "Username is already exist";
      //   } else if (!is_exist && is_mobile_exist) {
      //     errors.mobile_no = "Mobile no is already exist";
      //   } else if (is_exist && !is_mobile_exist) {
      //     errors.email = "Email is already exist";
      //   } else if (is_username_exist) {
      //     errors.username = "Username is already exist";
      //   }
      // }

      let is_exist = await studentService.is_email_exist(req.body);
      let is_username_exist = await studentService.is_username_exist(req.body);
      if (is_exist) {
        errors.email = "Email is already exist";
      } else if (is_username_exist) {
        errors.username = "Username is already exist";
      } else if (is_exist || is_username_exist) {
        errors.email = "Email is already exist";
        errors.username = "Username is already exist";
      }

      if (!isEmpty(errors)) {
        return commonResponse.customErrorResponse(
          res,
          422,
          "Something went wrong",
          errors
        );
      }

      var password = generator.generate({
        length: 10,
        numbers: true,
      });
      console.log(password, ":password");

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
          if (err) throw err;
          const email = req.body.email;

          var transporter = nodemailer.createTransport({
            host: "mail.thinktanker.in",
            port: 465,
            auth: {
              user: "shubham@thinktanker.in",
              pass: "Shubham@Think300",
            },
          });

          const mailOptions = {
            from: "shubham@thinktanker.in",
            to: email,
            subject: "Login Credentials",
            html: `Email : ${email}
            Password : ${password}`,
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              return console.log(error.message, "--> Mail Error");
            } else {
              console.log("success", info);
            }
          });

          let Student = await studentService.studentCreate(req.body, hash);

          if (Student) {
            return commonResponse.success(
              res,
              201,
              "Successfully registered student!",
              Student
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
        });
      });
    } catch (error) {
      console.log(error, "--> Catch error");
    }
  },

  getAllStudent: async (req, res, next) => {
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
      let order_column = req.query.order_column || "name";
      let sort_order = req.query.sort_order == "asc" ? "ASC" : "DESC";
      let sort_array = [order_column, sort_order];
      let filter_value = req.query.filter_value || "";
      let status = req.query.status || "";

      let findAllStudent = await studentService.getAllStudent(
        req.query,
        sort_array,
        filter_value,
        status
      );

      let Total_count = await studentModel.countDocuments({
        role: "student",
        is_deleted: 0,
      });
      let Total_active = await studentModel.countDocuments({
        status: "active",
        is_deleted: 0,
      });
      let Total_inactive = await studentModel.countDocuments({
        status: "inactive",
        is_deleted: 0,
      });
      if (findAllStudent) {
        return commonResponse.success(
          res,
          200,
          "Successfully Get All Student",
          {
            TotalCount: Total_count,
            TotalActive: Total_active,
            TotalInActive: Total_inactive,
            Student_Details: findAllStudent,
          }
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
      console.log(error, "--> Catch error");
      return next(error);
    }
  },

  getStudentByID: async (req, res, next) => {
    try {
      if (!req.user) {
        return res.json({
          error: true,
          statusCode: 401,
          message: "Invalid Admin login",
          errors: "Only Admin And Student can able to action on this module ",
        });
      }
      var id = req.params.id;
      let findStudentById = await studentService.get(id);

      if (findStudentById) {
        commonResponse.success(
          res,
          200,
          "Student Get Successfully By Id",
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

  getStudentByIDForStudent: async (req, res, next) => {
    try {
      if (!req.user) {
        return res.json({
          error: true,
          statusCode: 401,
          message: "Invalid Admin login",
          errors: "Only Student can able to action on this module ",
        });
      }
      var id = req.params.id;
      let findStudentById = await studentService.get(id);

      if (findStudentById) {
        commonResponse.success(
          res,
          200,
          "Student Get Successfully By Id",
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

  update: async (req, res, next) => {
    try {
      if (!req.user) {
        return res.json({
          error: true,
          statusCode: 401,
          message: "Invalid Admin login",
          errors: "Only Admin can able to action on this module ",
        });
      }
      var studentID = req.params.id;
      var { errors, isValid } = validateStudentRegister(req.body);
      // let is_exist = await studentService.is_email_exist(req.body);
      // let is_mobile_exist = await studentService.is_mobile_no_exist(req.body);

      let is_exist = await studentService.is_email_exist(req.body);
      let is_username_exist = await studentService.is_username_exist(req.body);
      if (is_exist) {
        errors.email = "Email is already exist";
      } else if (is_username_exist) {
        errors.username = "Username is already exist";
      } else if (is_exist || is_username_exist) {
        errors.email = "Email is already exist";
        errors.username = "Username is already exist";
      }

      // if (is_exist || is_mobile_exist) {
      //   if (
      //     is_exist &&
      //     is_mobile_exist &&
      //     is_exist._id != studentID &&
      //     is_mobile_exist._id != studentID
      //   ) {
      //     errors.email = "email is already exist";
      //     errors.mobile_no = "mobile no is already exist";
      //   } else if (!is_exist && is_mobile_exist && is_mobile_exist._id != studentID) {
      //     errors.mobile_no = "mobile no is already exist";
      //   } else if (is_exist && !is_mobile_exist && is_exist._id != studentID) {
      //     errors.email = "email is already exist";
      //   }
      // }

      if (!isEmpty(errors)) {
        return commonResponse.customErrorResponse(
          res,
          422,
          "Something went wrong",
          errors
        );
      }

      if (req.files != undefined && req.files.profile_image != undefined) {
        req.body.profile_image = req.files.profile_image;
      }

      let updatedStudent = await studentService.updateStudent(
        studentID,
        req.body
      );

      if (updatedStudent["error"] == undefined) {
        commonResponse.success(
          res,
          200,
          "Student Data Successfully Updated",
          updatedStudent
        );
      } else {
        errors.error = "User_Not_Found";
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

  delete: async (req, res, next) => {
    try {
      if (!req.user) {
        return res.json({
          error: true,
          statusCode: 401,
          message: "Invalid Admin login",
          errors: "Only Admin can able to action on this module",
        });
      }
      var StudentID = req.params.id;
      let deleteStudent = await studentService.isDelete(StudentID);

      if (deleteStudent) {
        commonResponse.success(
          res,
          200,
          "Student SuccessFully Deleted",
          deleteStudent
        );
      } else {
        errors = "User_Not_Found";
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

  deleteMulti: async (req, res, next) => {
    try {
      if (!req.user) {
        return res.json({
          error: true,
          statusCode: 401,
          message: "Invalid Admin login",
          errors: "Only Admin can able to action on this module",
        });
      }
      let id = req.body.id;
      let StudentData = await studentService.isDelete(id);

      if (StudentData.deletedCount == 0) {
        return commonResponse.customErrorResponse(
          res,
          422,
          "Can not find data of this id"
        );
      } else {
        return commonResponse.success(
          res,
          200,
          "Student's SuccessFully Deleted",
          StudentData
        );
      }
    } catch (error) {
      console.log(error, "--> Catch error");
      return next(error);
    }
  },

  userprofile: async (req, res, next) => {
    try {
      if (!req.user) {
        return res.json({
          error: true,
          statusCode: 401,
          message: "Invalid Student login",
          errors: "Only student can able to update his profile",
        });
      }
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await studentModel.findOne({ _id: decoded.id });

      if (req.user) {
        var StudentID = req.user._id;

        var { errors, isValid } = validateStudentProfile(req.body);
        // let is_exist = await studentService.is_email_exist(req.body);
        // let is_mobile_exist = await studentService.is_mobile_no_exist(req.body);
        // let is_username_exist = await studentService.is_username_exist(req.body);
        // if (is_exist || is_mobile_exist) {
        //   if (is_exist && is_mobile_exist && is_username_exist) {
        //     errors.email = "Email is already exist";
        //     errors.mobile_no = "Mobile no is already exist";
        //     errors.username = "Username is already exist";
        //   } else if (!is_exist && is_mobile_exist) {
        //     errors.mobile_no = "Mobile no is already exist";
        //   } else if (is_exist && !is_mobile_exist) {
        //     errors.email = "Email is already exist";
        //   } else if (is_username_exist) {
        //     errors.username = "Username is already exist";
        //   }
        // }

        if (!isEmpty(errors)) {
          return commonResponse.customErrorResponse(
            res,
            422,
            "Something went wrong",
            errors
          );
        }

        const subjectImage = await studentModel.findOne({ _id: req.user.id });
        var imageData = subjectImage.profile_image;

        if (
          !isEmpty(req.body.profile_image) &&
          req.body.profile_image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
        ) {
          var matches = req.body.profile_image.match(
            /^data:([A-Za-z-+\/]+);base64,(.+)$/
          ),
            image = {};
          image.type = matches[1];

          image.data = new Buffer.from(matches[2], "base64");
          let decodedImg = image;
          var imageBuffer = decodedImg.data;
          let type = decodedImg.type;
          var extension = mime.getExtension(type);
          var filetypes = /jpg|JPG|jpeg|JPEG|png|PNG|GIF|gif/;
          var check_image = !filetypes.test(extension);

          if (check_image) {
            errors.profile_image = "Only image files are allowed";
          } else {
            var dimensions = sizeOf(image.data);
            if (dimensions.height != 200 && dimensions.width != 500) {
              errors.profile_image = "Image size must be  500*200.";
            }
            if (!isEmpty(req.body.profile_image)) {
              var filepath = "/upload/profileImage/";
              var publicpath = process.cwd() + "/public";
              var storepath = publicpath + filepath;
              let type = decodedImg.type;
              extension = mime.getExtension(type);
              fse.mkdirsSync(storepath);
              var filename = Date.now() + "-profile_image" + "." + extension;

              try {
                fs.writeFileSync(storepath + filename, imageBuffer, "utf8");
              } catch (e) {
                console.log(e);
              }
            }

            if (
              req.body.profile_image ||
              req.body.profile_image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
            ) {
              var path = "../../../public/upload/profileImage";

              fs.unlink(`${storepath}/${imageData}`, (err) => {
                if (err) {
                  console.error(err);
                }
              });
            }
          }
        }

        let updatedStudent = await studentService.updateStudent(
          StudentID,
          req.body,
          filename
        );

        if (updatedStudent["error"] == undefined) {
          commonResponse.success(
            res,
            200,
            "Successfully update user by Id",
            updatedStudent
          );
        } else {
          errors.error = "User_Not_Found";
          return commonResponse.customErrorResponse(
            res,
            400,
            "Something went wrong",
            errors
          );
        }
      } else {
        errors.error = "User_Not_Found";
        return commonResponse.customErrorResponse(
          res,
          400,
          "Something went wrong",
          errors
        );
      }
    } catch (error) {
      console.log(error, "--> Catch error");
    }
  },

  logout: async (req, res, next) => {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await studentModel.findOne({ _id: decoded.id });

      if (req.user) {
        let updateIsLogin = await studentModel
          .findOneAndUpdate({ _id: req.user.id }, { is_login: 0 })
          .lean();
        return commonResponse.success(res, 200, "Successfully Logout", {
          Logout: "Sign out successfully",
        });
      } else {
        return commonResponse.customErrorResponse(
          res,
          422,
          "Something went wrong",
          "Token does not valid, Please try again"
        );
      }
    } catch (error) {
      console.log(error, "--> Catch error");
    }
  },

  Autorization: async (req, res, next) => {
    try {
      console.log(req.body.id);
      let Student = await studentModel.findOne({ _id: req.body.id });

      if (Student) {
        let updateIsLogin = await studentModel
          .findOneAndUpdate({ _id: req.body.id }, { is_login: 0 })
          .lean();
        return commonResponse.success(
          res,
          200,
          "Successfully Logout",
          "Token expire"
        );
      } else if (Student == null) {
        return commonResponse.customErrorResponse(
          res,
          422,
          "Something went wrong",
          "Student id can not exists"
        );
      }
    } catch (error) {
      console.log(error);
    }
  },

  Change_Password: async (req, res, next) => {
    try {
      if (!req.user) {
        return res.json({
          error: true,
          statusCode: 401,
          message: "Invalid Admin login",
          errors: "Only Student can able to action on this module ",
        });
      }

      let id = req.user._id;
      let { current_password, new_password, confirm_password } = req.body;

      var { errors, isValid } = validateStudentProfilePassword(req.body);
      if (!isEmpty(errors)) {
        return commonResponse.customErrorResponse(
          res,
          422,
          "Something went wrong",
          errors
        );
      }

      const Student = await studentModel.findOne({ _id: id });

      console.log(Student, ":Student");
      console.log(req.body.current_password, "----------:");
      console.log(req.body.new_password, ":confirm_passwordconfirm_password");
      console.log(req.body.confirm_password, ":confirm_password");

      bcrypt.compare(
        req.body.current_password,
        Student.password,
        (err, data) => {
          console.log(data, ":data");
          if (new_password !== confirm_password) {
            return commonResponse.customErrorResponse(
              res,
              422,
              "Something went wrong",
              "New Password And Confirm Password doesn't match"
            );
          }

          if (data) {
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(req.body.new_password, salt, async (err, hash) => {
                let updatePassword = await studentService.profilePasswordUpdate(
                  id,
                  hash
                );
                if (updatePassword) {
                  return commonResponse.success(
                    res,
                    200,
                    "Successfully Password Change",
                    updatePassword
                  );
                } else {
                  return commonResponse.customErrorResponse(
                    res,
                    422,
                    "Something went wrong",
                    "Password Can't change , Something Went Wrong"
                  );
                }
              });
            });
          } else {
            return commonResponse.customErrorResponse(
              res,
              422,
              "Something went wrong",
              { password: "Password does not valid !" }
            );
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  },
};
