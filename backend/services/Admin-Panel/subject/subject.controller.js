const subjectService = require("./subject.services");
const subjectModel = require("./subject.model");
const isEmpty = require("../../../validation/isEmpty");
const validateSubject = require("../../../validation/subjectValidation/subject.validation");
const sizeOf = require("image-size");
const {
  commonResponse,
  commonFunctions,
  customErrorResponse,
} = require("../../../helper");
const studentModel = require("../../Student-Panel/student/student.model");
const fs = require("fs");
const mime = require("mime");
const fse = require("fs-extra");
const { log } = require("console");

module.exports = {
  createSubject: async (req, res, next) => {
    try {
      if (!req.user) {
        return res.json({
          error: true,
          statusCode: 401,
          message: "Invalid Admin login",
          errors: "Only Admin can able to action on this module ",
        });
      }

      var { errors, isValid } = validateSubject(req.body);

      let isSubjectNameExist = await subjectService.is_subject_name_exist(
        req.body
      );

      if (isSubjectNameExist) {
        errors.subject_name = "Subject Name Is Already Exist";
      }

      if (!isEmpty(errors)) {
        return commonResponse.customErrorResponse(
          res,
          422,
          "Something went wrong",
          errors
        );
      }

      var extension;
      if (
        !isEmpty(req.body.subject_image) &&
        req.body.subject_image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
      ) {
        var matches = req.body.subject_image.match(
          /^data:([A-Za-z-+\/]+);base64,(.+)$/
        ),
          image = {};
        // get image extension and image
        image.type = matches[1];
        image.data = new Buffer.from(matches[2], "base64");
        let decodedImg = image;
        var imageBuffer = decodedImg.data;
        let type = decodedImg.type;
        extension = mime.getExtension(type);

        var filetypes = /jpg|JPG|jpeg|JPEG|png|PNG|GIF|gif/;
        var check_image = !filetypes.test(extension);

        if (check_image) {
          errors.subject_image = "Only image files are allowed";
        } else {
          // var img_size = image.data.length / 1e6;
          var dimensions = sizeOf(image.data);

          if (dimensions.height != 200 && dimensions.width != 500) {
            errors.subject_image = "Image size must be  500*200.";
          }
          if (!isEmpty(req.body.subject_image)) {
            var filepath = "/upload/subjectImage/";
            var publicpath = process.cwd() + "/public";
            var storepath = publicpath + filepath;
            let type = decodedImg.type;
            extension = mime.getExtension(type);
            fse.mkdirsSync(storepath);
            var filename = Date.now() + "-subject_image" + "." + extension;
            try {
              fs.writeFileSync(storepath + filename, imageBuffer, "utf8");
            } catch (e) {
              console.log(e);
            }
          }
        }
      }
      let createSubject = await subjectService.subjectCreate(
        req.body,
        filename
      );

      if (createSubject) {
        return commonResponse.success(
          res,
          201,
          "Successfully Subject Created",
          createSubject
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

      let findAllSubject = await subjectService.allSubjectGet(
        req.query,
        sort_array,
        filter_value,
        status
      );

      let Total_active = await subjectModel.countDocuments({
        status: "active",
        is_deleted: 0,
      });
      let Total_inactive = await subjectModel.countDocuments({
        status: "inactive",
        is_deleted: 0,
      });

      if (findAllSubject) {
        return commonResponse.success(
          res,
          200,
          "Successfully Get All Subject Details",
          {
            TotalActive: Total_active,
            TotalInActive: Total_inactive,
            Subject_Details: findAllSubject,
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

  getsubjectName: async (req, res, next) => {
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

      let findAllSubject = await subjectService.allSubjectGet(
        req.query,
        sort_array,
        filter_value,
        status
      );

      let FindAllSubject = findAllSubject.map((index) => index.subject_name);
      // let FindAllSubjectid = findAllSubject.map(index => index.subject_name)

      var allSubjectName = [];
      if (FindAllSubject) {
        for (let i = 0; i < FindAllSubject.length; i++) {
          var obj = {};
          obj["value"] = FindAllSubject[i];
          obj["label"] = FindAllSubject[i];
          allSubjectName.push(obj);
        }

        return commonResponse.success(
          res,
          200,
          "Get All Student Name",
          allSubjectName
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

  getSubjectByID: async (req, res, next) => {
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

      let findSubjectById = await subjectService.get(id);
      if (findSubjectById) {
        commonResponse.success(
          res,
          200,
          "Successfully Get Subject By Id",
          findSubjectById
        );
      } else if (findSubjectById === null) {
        return commonResponse.customErrorResponse(
          res,
          400,
          "Something went wrong",
          "SUBJECT_NOT_FOUND"
        );
      }
    } catch (error) {
      console.log(error, "--> Catch error");
      return next(error);
    }
  },

  updateSubject: async (req, res, next) => {
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

      var { errors, isValid } = validateSubject(req.body);
      console.log(req.body, ":req.body");

      let isSubjectNameExist = await subjectService.is_subject_name_exist(
        req.body
      );

      if (isSubjectNameExist && isSubjectNameExist._id != id) {
        errors.subject = "Subject Is Already Exists";
      }

      if (!isEmpty(errors)) {
        return commonResponse.customErrorResponse(
          res,
          422,
          "Something went wrong",
          errors
        );
      }
      const subjectImage = await subjectModel.findOne({ _id: id });
      var imageData = subjectImage.subject_image;

      if (
        !isEmpty(req.body.subject_image) &&
        req.body.subject_image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
      ) {
        var matches = req.body.subject_image.match(
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
          errors.subject_image = "Only image files are allowed";
        } else {
          var dimensions = sizeOf(image.data);
          if (dimensions.height != 200 && dimensions.width != 500) {
            errors.subject_image = "Image size must be  500*200.";
          }
          if (!isEmpty(req.body.subject_image)) {
            var filepath = "/upload/subjectImage/";
            var publicpath = process.cwd() + "/public";
            var storepath = publicpath + filepath;
            let type = decodedImg.type;
            extension = mime.getExtension(type);
            fse.mkdirsSync(storepath);
            var filename = Date.now() + "-subject_image" + "." + extension;
            try {
              fs.writeFileSync(storepath + filename, imageBuffer, "utf8");
            } catch (e) {
              console.log(e);
            }
          }

          if (
            req.body.subject_image ||
            req.body.subject_image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
          ) {
            var path = "../../../public/upload/subjectImage";

            fs.unlink(`${storepath}/${imageData}`, (err) => {
              if (err) {
                console.error(err);
              }
            });
          }
        }
      }

      let updatedSubject = await subjectService.update(id, req.body, filename);

      if (updatedSubject["error"] == undefined) {
        commonResponse.success(
          res,
          200,
          "Successfully Update Subject ",
          updatedSubject
        );
      } else {
        errors.error = "Subject Not Found";
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

  deleteSubject: async (req, res, next) => {
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
      let deleteSubject = await subjectService.isDelete(id);

      if (deleteSubject) {
        commonResponse.success(
          res,
          200,
          "Subject Deleted succesfully",
          deleteSubject
        );
      } else {
        errors.error = "Subject Not Found";
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

  multipalDeleteSubject: async (req, res, next) => {
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
      let getSubject = await subjectService.isMultiDelete(multipalIds);

      if (getSubject.deletedCount == 0) {
        return commonResponse.customErrorResponse(
          res,
          422,
          "Can not find data of this id "
        );
      } else {
        return commonResponse.success(
          res,
          200,
          "successfully deleted multiple subject",
          getSubject
        );
      }
    } catch (error) {
      console.log(error, "--> Catch error");
      return next(error);
    }
  },

  multipleSelectSubject: async (req, res, next) => {
    try {
      if (!req.user) {
        return res.json({
          error: true,
          statusCode: 401,
          message: "Invalid Admin login",
          errors: "Only Admin can able to action on this module ",
        });
      }
      let subject11 = req.body.subject;

      var Allsubject = [];
      if (!subject11 || subject11.length == 0) {
        let errors = "Subject name required in array";
        return commonResponse.customErrorResponse(
          res,
          200,
          "Something Went Wrong",
          errors
        );
      }
      var Allsubject = [];
      for (let i = 0; i < subject11.length; i++) {
        const element = subject11[i];
        let getSubject = await subjectService.isMultiSelete(element);

        if (getSubject.length == 0) {
          return commonResponse.customErrorResponse(
            res,
            422,
            "Data Not Found ",
            `${element} Subject Can't Exists`
          );
        }

        Allsubject.push(getSubject);
      }

      if (Allsubject) {
        return commonResponse.success(
          res,
          200,
          "Successfully Deleted Multiple Subject",
          Allsubject.flat(2)
        );
      }
    } catch (error) {
      console.log(error, "--> Catch error");
      return next(error);
    }
  },
};
