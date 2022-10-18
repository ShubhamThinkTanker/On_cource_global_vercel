const { commonResponse } = require("../../../helper");
const instructionModel = require("./instruction.model");
const SubjectModel = require("../subject/subject.model");
var ObjectId = require("mongodb").ObjectID;

exports.instructionCheck = async (data) => {
  try {
    let instruction = instructionModel.findOne({
      subject_id: data,
      is_deleted: 0,
    });

    return instruction;
  } catch (error) {
    console.log(error, "--> Catch error");
    return new Error(error);
  }
};

exports.getsubjectId = async (subject) => {
  try {
    let subjectIdGet = await SubjectModel.findOne({ subject_name: subject });
    return subjectIdGet;
  } catch (error) {
    console.log(error, "--> Catch error");
    return new Error(error);
  }
};

exports.instructionCreate = async (data, id, name) => {
  try {
    const instruction = new instructionModel({
      subject_id: id,
      subject_name: name,
      total_marks: data.total_marks,
      description: data.description,
      time_duration: data.time_duration,
      isActive: data.isActive,
      createdAt: data.createdAt,
    });
    return await instruction.save();
  } catch (error) {
    console.log(error, "--> Catch error");
    return new Error(error);
  }
};

exports.get = async (id) => {
  try {
    let getInstructionByID = await instructionModel.aggregate([
      {
        $match: {
          _id: ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "subjects",
          localField: "subject_id",
          foreignField: "_id",
          as: "Subjectdetail",
        },
      },
    ]);

    return getInstructionByID;
  } catch (error) {
    console.log(error, "--> Catch error");
    return { error: error };
  }
};

exports.update = async (id, reqBody) => {
  try {
    let updateInstruction = await instructionModel
      .findOneAndUpdate({ _id: id }, { $set: reqBody }, { new: true })
      .lean();
    if (!updateInstruction || updateInstruction != null) {
      return updateInstruction;
    }
  } catch (error) {
    console.log(error, "--> Catch error");
    return new Error(error);
  }
};

exports.delete = async (id) => {
  try {
    let deleteInstruction = await instructionModel.updateOne(
      { _id: { $in: id } },
      { is_deleted: 1 }
    );
    return deleteInstruction;
  } catch (error) {
    console.log(error, "--> Catch error");
    return new Error(error);
  }
};

exports.isMultiDelete = async (id) => {
  try {
    let instruction = await instructionModel.updateMany(
      { _id: id },
      { $set: { is_deleted: 1 } }
    );
    return instruction;
  } catch (error) {
    console.log(error, "--> Catch error");
    return new Error(error);
  }
};

exports.AllInstruction = async (reqQuery, sort_array, filter_value) => {
  try {
    let LIMIT = reqQuery.limit * 1;
    let SKIP = (reqQuery.page - 1) * reqQuery.limit;

    if (filter_value != "") {
      var regex = new RegExp(filter_value, "i");

      filter_value = {
        $or: [
          { subject_name: regex },
          { description: regex },
          // { 'time_duration': regex },
        ],
      };
    } else {
      filter_value = {};
    }

    let getAllInstruction = await instructionModel
      .find({ $and: [{ is_deleted: { $eq: 0 } }, filter_value] })
      .limit(LIMIT)
      .skip(SKIP)
      .sort([sort_array]);

    return getAllInstruction;
  } catch (error) {
    console.log(error, "--> Catch error");
    return new Error(error);
  }
};

exports.allSubjectGet = async (reqQuery, sort_array, filter_value, status) => {
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

    if (status != "") {
      var regex = new RegExp(status, "i");
      status = {
        $or: [{ status: regex }],
      };
    } else {
      status = {};
    }
    let getAllSubject = await SubjectModel.find({
      $and: [filter_value, status, { is_deleted: 0 }],
    })
      .limit(LIMIT)
      .skip(SKIP)
      .sort([sort_array]);

    return getAllSubject;
  } catch (error) {
    console.log(error, "--> Catch error");
    return { error: error };
  }
};

exports.allSubjectInstructionForStudent = async (reqQuery) => {
  try {
    let getAllInstruction = await instructionModel.find({
      $and: [{ is_deleted: { $eq: 0 } }],
    });
    return getAllInstruction;
  } catch (error) {
    console.log(error, "--> Catch error");
    return new Error(error);
  }
};
