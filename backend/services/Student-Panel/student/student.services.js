const { commonResponse } = require("../../../helper");
const studentModel = require("./student.model");

exports.studentCreate = async (reqbody, hash, profileImage) => {
  try {
    const newStudent = new studentModel({
      username: reqbody.username,
      name: reqbody.name,
      email: reqbody.email,
      password: hash,
      mobile_no: reqbody.mobile_no,
      gender: reqbody.gender,
      role: reqbody.role,
      profile_image: "",
      status: reqbody.status || "active",
      birth_date: reqbody.birth_date,
      street_add1: reqbody.street_add1,
      street_add2: reqbody.street_add2,
      state: reqbody.state,
      zip: reqbody.zip,
      country: reqbody.country,
      resetPasswordToken: reqbody.resetPasswordToken,
      resetPasswordExpires: reqbody.resetPasswordExpires,
      created_by: "",
    });
    return await newStudent.save();
  } catch (error) {
    console.log(error, "--> Catch error");
    return { error: error };
  }
};

exports.is_email_exist = async (reqBody) => {
  try {
    let Student = await studentModel.findOne({ email: reqBody.email }).lean();
    if (!Student) {
      return false;
    }
    return Student;
  } catch (error) {
    console.log(error, "--> Catch error");
    return new Error(error);
  }
};

exports.is_mobile_no_exist = async (reqBody) => {
  try {
    let Student = await studentModel
      .findOne({
        mobile_no: reqBody.mobile_no,
      })
      .lean();

    if (!Student) {
      return false;
    }
    return Student;
  } catch (error) {
    console.log(error, "--> Catch error");
    return new Error(error);
  }
};

exports.is_username_exist = async (reqBody) => {
  try {
    let Student = await studentModel
      .findOne({
        username: reqBody.username,
      })
      .lean();

    if (!Student) {
      return false;
    }
    return Student;
  } catch (error) {
    console.log(error, "--> Catch error");
    return new Error(error);
  }
};

exports.UpdateResetLink = async (token, id) => {
  try {
    const updatetoken = await studentModel.updateOne(
      { _id: id },
      { resetPasswordToken: token, resetPasswordExpires: Date.now() }
    );
    return updatetoken;
  } catch (error) {
    console.log(error, "--> Catch error");
    return new Error(error);
  }
};

exports.login = async (reqBody) => {
  try {
    let student = await studentModel
      .findOne({
        $or: [{ email: reqBody.username }, { mobile_no: reqBody.username }],
      })
      .select("+password");

    return student;
  } catch (error) {
    console.log(error, "--> Catch error");
    return new Error(error);
  }
};

exports.updateLogin = async (id) => {
  try {
    let updateIsLogin = await studentModel
      .findOneAndUpdate({ _id: id }, { is_login: 1 })
      .lean();
    return updateIsLogin;
  } catch (error) {
    console.log(error, "--> Catch error");
  }
};

exports.Valid_token = async (token) => {
  try {
    const student = await studentModel.findOne({
      resetPasswordToken: token,
      ResetPasswordExpire: { $gt: Date.now() },
    });
    if (!student) {
      return false;
    }
    return student;
  } catch (error) {
    console.log(error, "--> Catch error");
    return new Error(error);
  }
};

exports.UpdatePassword = async (token, HashPassword) => {
  try {
    var FindStudent = await studentModel.findOne({ resetPasswordToken: token });
    var StudentID = FindStudent._id;

    const updatetoken = await studentModel.findByIdAndUpdate(
      { _id: StudentID },
      {
        resetPasswordToken: "",
        resetPasswordExpires: Date.now(),
        password: HashPassword,
      }
    );

    return updatetoken;
  } catch (error) {
    console.log(error, "--> Catch error");
    return new Error(error);
  }
};

exports.getAllStudent = async (reqQuery, sort_array, filter_value, status) => {
  try {
    let LIMIT = reqQuery.limit * 1;
    let SKIP = (reqQuery.page - 1) * reqQuery.limit;
    if (filter_value != "") {
      var regex = new RegExp(filter_value, "i");

      filter_value = {
        $or: [
          { mobile_no: regex },
          { email: regex },
          { name: regex },
          { status: regex },
          { status: status },
        ],
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

    let getAllStudent = await studentModel
      .find({
        $and: [{ role: "student" }, { is_deleted: 0 }, filter_value, status],
      })
      .limit(LIMIT)
      .skip(SKIP)
      .sort([sort_array]);

    return getAllStudent;
  } catch (error) {
    console.log(error, "--> Catch error");
    return { error: error };
  }
};

exports.getAlluser = async (reqQuery, sort_array, filter_value, status) => {
  try {
    let LIMIT = reqQuery.limit * 1;
    let SKIP = (reqQuery.page - 1) * reqQuery.limit;
    if (filter_value != "") {
      var regex = new RegExp(filter_value, "i");

      filter_value = {
        $or: [{ mobile_no: regex }, { email: regex }, { name: regex }],
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

    let getAllUser = await studentModel
      .find({ $and: [{ role: "user" }, filter_value, status] })
      .limit(LIMIT)
      .skip(SKIP)
      .sort([sort_array]);

    return getAllUser;
  } catch (error) {
    console.log(error, "--> Catch error");
    return { error: error };
  }
};

exports.get = async (id) => {
  try {
    let getStudenyByID = await studentModel.findOne({
      $and: [{ _id: id }, { is_deleted: 0 }],
    });
    return getStudenyByID;
  } catch (error) {
    console.log(error, "--> Catch error");
    return { error: error };
  }
};

exports.updateStudent = async (id, reqBody, filename) => {
  try {
    let findOneBYId = await studentModel.findOne({ _id: id });
    let updateUserData = await studentModel
      .findOneAndUpdate(
        { _id: id, role: "student", is_deleted: 0 },
        { $set: reqBody, profile_image: filename },
        { new: true }
      )
      .lean();

    if (!updateUserData) {
      return new Error(commonResponse.getErrorMessage("USER_NOT_FOUND"));
    }
    return updateUserData;
  } catch (error) {
    console.log(error, "--> Catch error");
    return { error: error };
  }
};

exports.isDelete = async (StudentID) => {
  try {
    const updateIsDelete = await studentModel.updateOne(
      { _id: StudentID },
      {
        is_deleted: 1,
      }
    );
    return updateIsDelete;
  } catch (error) {
    console.log(error, "--> Catch error");
    return new Error(error);
  }
};

exports.updatepassword = async (id, hash) => {
  try {
    let updatepassword = await studentModel
      .findOneAndUpdate({ _id: id }, { password: hash })
      .lean();

    if (!updatepassword) {
      return new Error(commonResponse.getErrorMessage("Data not found"));
    }
    return updatepassword;
  } catch (error) {
    console.log(error, "--> Catch error");
  }
};

exports.FindAdmin = async (reqBody) => {
  try {
    const Student = await studentModel.findOne({
      email: reqBody.username,
    });
    if (!Student) {
      return false;
    }
    return Student;
  } catch (error) {
    console.log(error, "--> Catch error");
    return new Error(error);
  }
};

exports.profilePasswordUpdate = async (id, hashPassword) => {
  try {
    let updateProfilePassword = await studentModel
      .findOneAndUpdate({ _id: id }, { password: hashPassword })
      .lean();

    return updateProfilePassword;
  } catch (error) {
    console.log(error, ":-->error");
  }
};
