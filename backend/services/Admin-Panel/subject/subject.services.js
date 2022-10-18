const { commonResponse } = require("../../../helper");
const subjectModel = require("./subject.model");
const questionnaireModel = require("./../questionnaire/questionnaire.model");
const instructionModel = require("./../instruction/instruction.model");
const fs = require("fs");
const mime = require("mime");
const fse = require("fs-extra");
const { fileUploadToS3, deleteImage } = require("../../../helper/s3aws");
var ObjectId = require("mongodb").ObjectID;

exports.is_subject_name_exist = async (reqBody) => {
  try {
    let subject_exist = await subjectModel.findOne({
      subject_name: reqBody.subject_name,
      is_deleted: 0,
    });

    return subject_exist;
  } catch (error) {
    console.log(error, "--> Catch error");
    return new Error(error);
  }
};
exports.subjectCreate = async (reqbody, filename) => {
  console.log(filename, "filename");
  try {
    const newSubject = new subjectModel({
      subject_image: filename,
      subject_name: reqbody.subject_name,
      status: reqbody.status || "active",
    });

    return await newSubject.save();
  } catch (error) {
    console.log(error, "--> Catch error");
    return { error: error };
  }
};
exports.allSubjectGet = async (reqQuery, sort_array, filter_value) => {
  try {
    let LIMIT = reqQuery.limit * 1;
    let SKIP = (reqQuery.page - 1) * reqQuery.limit;
    if (filter_value != "") {
      var regex = new RegExp(filter_value, "i");
      filter_value = {
        $or: [{ subject_name: regex }],
      };
    } else {
      filter_value = {};
    }
    // if (status != "") {
    //   var regex = new RegExp(status, "i");
    //   status = {
    //     $or: [{ status: regex }],
    //   };
    // } else {
    //   status = {};
    // }
    let getAllSubject = await subjectModel
      .find({
        $and: [{ is_deleted: 0 }, filter_value],
      })
      .limit(LIMIT)
      .skip(SKIP)
      .sort([sort_array]);

    // var allSubjectArr = []
    // getAllSubject.forEach(async (element) => {
    //   var path = `${process.env.server_path}/admin/upload/subjectImage/`
    //   var id = element._id

    //   let getSubjectData = await subjectModel.aggregate([{ $match: { _id: id } },
    //   {
    //     $addFields: {
    //       "subject_image_path": path + element.subject_image
    //     }
    //   }])

    //   return allSubjectArr.push(getSubjectData)
    // });

    return getAllSubject;
  } catch (error) {
    console.log(error, "--> Catch error");
    return { error: error };
  }
};
exports.get = async (id) => {
  try {
    var path = `${process.env.server_path}/admin/upload/subjectImage/`;

    let getSubjectByID = await subjectModel.findOne({ _id: id });
    // let getSubjectData = await subjectModel.aggregate([{ $match: { _id: new ObjectId(id) } },
    // {
    //   $addFields: {
    //     "subject_image_path": path + getSubjectByID.subject_image
    //   }
    // }])

    return getSubjectByID;
  } catch (error) {
    console.log(error, "--> Catch error");
    return { error: error };
  }
};
exports.update = async (id, reqBody, filename) => {
  console.log(reqBody, "reqBody");
  try {
    let findOneBYId = await subjectModel.findOne({ _id: id });

    let updateSubjectData = await subjectModel
      .findOneAndUpdate(
        { _id: id },
        {
          subject_image: filename,
          subject_name: reqBody.subject_name,
          status: reqBody.status,
        },
        { new: true }
      )
      .lean();
    if (!updateSubjectData) {
      return new Error(commonResponse.getErrorMessage("SUBJECT_NOT_FOUND"));
    }
    return updateSubjectData;
  } catch (error) {
    console.log(error, "--> Catch error");
    return { error: error };
  }
};
exports.isDelete = async (id) => {
  try {
    const updateIsDelete = await subjectModel.updateOne(
      { _id: { $in: id } },
      { is_deleted: 1 }
    );
    const updateQuesDelete = await questionnaireModel.updateMany(
      { subject_id: { $in: id } },
      { is_deleted: 1 }
    );
    const updateinstructionDelete = await instructionModel.updateMany(
      { subject_id: { $in: id } },
      { is_deleted: 1 }
    );

    return updateIsDelete;
  } catch (error) {
    console.log(error, "--> Catch error");
    return new Error(error);
  }
};

exports.isMultiDelete = async (id) => {
  try {
    const updateSubjectAndDelete = await subjectModel.updateMany(
      { _id: id },
      { $set: { is_deleted: 1 } }
    );
    return updateSubjectAndDelete;
  } catch (error) {
    console.log("subject multi delete error : ", error);
    return new Error(error);
  }
};
exports.isMultiSelete = async (subject11) => {
  try {
    const multipleSelect = await subjectModel.find({
      subject_name: subject11,
      is_deleted: 0,
    });

    return multipleSelect;
  } catch (error) {
    console.log(error, "--> Catch error");
    return new Error(error);
  }
};
