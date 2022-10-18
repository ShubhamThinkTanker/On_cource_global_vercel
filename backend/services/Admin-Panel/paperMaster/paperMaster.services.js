const paperMasterModel = require("./paperMaster.model");

exports.create = async (reqBody) => {
  try {
    console.log("2222");
    const newPaperMaster = new paperMasterModel({
      paper_name: reqBody.paper_name,
      paper_description: reqBody.paper_description,
      year: reqBody.year,
      status: reqBody.status,
    });

    return await newPaperMaster.save();
  } catch (error) {
    return new Error(error);
  }
};

exports.paperMasterCheck = async (data) => {
  try {
    let paperMaster = paperMasterModel.findOne({
      paper_name: data.paper_name,
      is_deleted: 0,
    });

    return paperMaster;
  } catch (error) {
    console.log(error, "--> Catch error");
    return new Error(error);
  }
};

exports.getById = async (id) => {
  try {
    let getPapaerMasterByID = await paperMasterModel.findOne({ _id: id });

    return getPapaerMasterByID;
  } catch (error) {
    console.log(error, "--> Catch error");
    return { error: error };
  }
};

exports.allPaperMaster = async (reqQuery, sort_array, filter_value, status) => {
  try {
    let LIMIT = reqQuery.limit * 1;
    let SKIP = (reqQuery.page - 1) * reqQuery.limit;
    if (filter_value != "") {
      var regex = new RegExp(filter_value, "i");
      filter_value = {
        $or: [{ paper_name: regex }],
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
    let getAllSubject = await paperMasterModel
      .find({
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

exports.update = async (id, reqBody) => {
  try {
    let updatePaperMaster = await paperMasterModel
      .findOneAndUpdate({ _id: id }, { $set: reqBody }, { new: true })
      .lean();
    if (!updatePaperMaster || updatePaperMaster != null) {
      return updatePaperMaster;
    }
  } catch (error) {
    console.log(error, "--> Catch error");
    return new Error(error);
  }
};

exports.delete = async (id) => {
  try {
    let deletePaperMaster = await paperMasterModel.updateOne(
      { _id: { $in: id } },
      { is_deleted: 1 }
    );
    return deletePaperMaster;
  } catch (error) {
    console.log(error, "--> Catch error");
    return new Error(error);
  }
};

exports.isMultiDelete = async (id) => {
  try {
    console.log(id, "ididi");
    const updatePaperMaster = await paperMasterModel.updateMany(
      { _id: id },
      { $set: { is_deleted: 1 } }
    );
    return updatePaperMaster;
  } catch (error) {
    console.log("subject multi delete error : ", error);
    return new Error(error);
  }
};

exports.allPaperNameGet = async (reqQuery, sort_array, filter_value) => {
  try {
    let LIMIT = reqQuery.limit * 1;
    let SKIP = (reqQuery.page - 1) * reqQuery.limit;
    if (filter_value != "") {
      var regex = new RegExp(filter_value, "i");
      filter_value = {
        $or: [{ paper_name: regex }],
      };
    } else {
      filter_value = {};
    }

    let getAllPaperName = await paperMasterModel
      .find({
        $and: [{ is_deleted: 0 }, filter_value],
      })
      .limit(LIMIT)
      .skip(SKIP)
      .sort([sort_array]);

    return getAllPaperName;
  } catch (error) {
    console.log(error, "--> Catch error");
    return { error: error };
  }
};
