const { commonResponse } = require("../../../helper");
const questionnaireModel = require("./questionnaire.model");

const subjectModel = require("../subject/subject.model");

exports.isSubjectIsExist = async (reqBody) => {
  try {
    let checkSubject = await subjectModel
      .findOne(
        { subject_name: reqBody.subject_name },
        { subject_name: 1, _id: 0 }
      )
      .lean();

    if (!checkSubject) {
      return null;
    }
    return checkSubject;
  } catch (error) {
    console.log(error, "--> Catch error");
    return new Error(error);
  }
};

exports.excelUpload = async (reqBody) => {
  try {
    let excelSaved = await questionnaireModel.insertMany(reqBody);

    return { message: "Data successfully saved" };
  } catch (error) {
    console.log(error, "--> Catch error");
    return new Error(error);
  }
};

exports.isQuestion = async (reqBody) => {
  try {
    let questionExist = await questionnaireModel.findOne({
      question: reqBody.question,
    });
    if (!questionExist) {
      return null;
    }
    return questionExist;
  } catch (error) {
    console.log(error, "--> Catch error");
    return new Error(error);
  }
};

exports.questionnaireCreate = async (reqbody, id, name, paperData) => {
  try {
    let obj = {};
    let option = reqbody.options.forEach(
      (value, index) => (obj[index + 1] = value)
    );

    const lastQuestionNo = await questionnaireModel
      .findOne({ subject_name: name })
      .sort({ question_number: -1 });

    console.log(paperData.paper_name, "::::::::::");

    const newquestionnaire = new questionnaireModel({
      is_type: reqbody.is_type || "act",
      // subject_id: id.flat(2),
      // subject_name: name.flat(1),
      question_number:
        lastQuestionNo != null ? lastQuestionNo.question_number + 1 : 1,
      paper_id: paperData.id,
      paper_name: paperData.paper_name,
      subject_id: id,
      subject_name: name,
      question: reqbody.question,
      question_description: reqbody.question_description,
      // question_status: reqbody.question_status,
      options: obj,
      answer: reqbody.answer,
      answer_description: reqbody.answer_description,
      question_marks: reqbody.question_marks,
      isActive: reqbody.status || "active",
    });

    // console.log(datac, "::English");
    return await newquestionnaire.save();
  } catch (error) {
    console.log(error, "--> Catch error");
    return { error: error };
  }
};

exports.allSATQuestionnaireGet = async (reqQuery, filter_value, isActive) => {
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
    if (isActive != "") {
      var regex = new RegExp(isActive, "i");
      isActive = {
        $or: [{ isActive: regex }],
      };
    } else {
      isActive = {};
    }

    let getAllQuestionnaireGet = await questionnaireModel
      .find({
        $and: [{ is_deleted: { $eq: 0 } }, { is_type: "SAT" }, filter_value],
      })
      .limit(LIMIT)
      .skip(SKIP);

    return getAllQuestionnaireGet;
  } catch (error) {
    console.log(error, "--> Catch error");
    return { error: error };
  }
};

exports.allACTQuestionnaireGet = async (reqQuery, filter_value, isActive, paperName) => {
  try {
    let LIMIT = reqQuery.limit * 1;
    let SKIP = (reqQuery.page - 1) * reqQuery.limit;

    if (isActive != "") {
      var regex = new RegExp(isActive, "i");
      isActive = {
        $or: [{ isActive: regex }],
      };
    } else {
      isActive = {};
    }

    let getAllQuestionnaireGet = await questionnaireModel
      .find({
        $and: [{ is_deleted: { $eq: 0 } }, { is_type: "ACT" }, { paper_name: paperName }, filter_value],
      })
      .limit(LIMIT)
      .skip(SKIP);

    return getAllQuestionnaireGet;
  } catch (error) {
    console.log(error, "--> Catch error");
    return { error: error };
  }
};

exports.get = async (id) => {
  try {
    let getQuestionnaireById = await questionnaireModel.findOne({ _id: id });
    return getQuestionnaireById;
  } catch (error) {
    console.log(error, "--> Catch error");
    return { error: error };
  }
};

exports.update = async (id, reqBody, name) => {
  try {
    let obj = {};
    let option = reqBody.options.forEach(
      (value, index) => (obj[index + 1] = value)
    );

    reqBody.options = obj;

    let updateQuestionnaireData = await questionnaireModel
      .findOneAndUpdate(
        { _id: id, is_deleted: 0 },
        { $set: reqBody },
        { new: true }
      )
      .lean();

    if (!updateQuestionnaireData) {
      return new Error(
        commonResponse.getErrorMessage("QUESTIONNAIRE_NOT_FOUND")
      );
    }
    return updateQuestionnaireData;
  } catch (error) {
    console.log(error, "--> Catch error");
    return { error: error };
  }
};

exports.isDelete = async (id) => {
  try {
    const questionnaireData = await questionnaireModel.findOne({ _id: id });

    var count = questionnaireData.question_number;
    var subjectNames = questionnaireData.subject_name;

    const pendingQuestionnaireFind = await questionnaireModel.find({
      $and: [
        { subject_name: subjectNames },
        { question_number: { $gt: count } },
      ],
    });

    const updatedQuestionnaireData = await questionnaireModel.updateMany(
      { _id: { $in: pendingQuestionnaireFind } },
      { $inc: { question_number: -1 } }
    );

    const updateAndDelete = await questionnaireModel.updateOne(
      { _id: { $in: id } },
      { is_deleted: 1 }
    );
    return updateAndDelete;
  } catch (error) {
    console.log(error, "--> Catch error");
    return new Error(error);
  }
};

exports.isMultiDelete = async (id) => {
  try {
    const multipalQuestionnaireData = await questionnaireModel.find({
      _id: id,
    });

    var obj = {};
    const findDeletedObjectCount = multipalQuestionnaireData.map(
      (index) => index.question_number
    );
    const findDeletedObjectSubjectName = multipalQuestionnaireData.map(
      (index) => index.subject_name
    );

    const updateQuestionnaireAndDelete = await questionnaireModel.updateMany(
      { _id: id },
      { $set: { is_deleted: 1 } }
    );

    // const pendingAllQuestionnaireData = await questionnaireModel.aggregate([
    //   {
    //     $match: {
    //       is_deleted: { $eq: "0" },
    //       subject_name: { $in: findDeletedObjectSubjectName },
    //     },
    //   },

    //   { $sort: { subject_name: 1, question_number: 1 } },
    // ]);

    // var obj = {};
    // var updatedAllPendingQuestionnaireData = [];
    // var setPendingQuetionsNumber = pendingAllQuestionnaireData.map((e) => {
    //   if (!(e.subject_name in obj)) {
    //     obj[e.subject_name] = [];
    //   }
    //   e.question_number = obj[e.subject_name].length + 1;
    //   obj[e.subject_name].push(e);
    //   updatedAllPendingQuestionnaireData.push(e);
    // });

    return updateQuestionnaireAndDelete;
  } catch (error) {
    console.log("questionnaire multi delete error : ", error);
    return new Error(error);
  }
};

exports.getsubjectId = async (subject) => {
  try {
    let subjectIdGet = await subjectModel.findOne({ subject_name: subject });

    return subjectIdGet;
  } catch (error) {
    console.log(error, "--> Catch error");
    return new Error(error);
  }
};

exports.allQuestionnaireGetByStudent = async (reqQuery, sort_array) => {
  try {
    var where_condition = {};
    if (reqQuery.question_number != "" && reqQuery.subject_name != "") {
      where_condition = {
        is_deleted: { $eq: 0 },
        subject_name: { $eq: reqQuery.subject_name },
        question_number: { $eq: reqQuery.question_number },
      };
    }
    if (reqQuery.question_number != "" && reqQuery.subject_name == "") {
      where_condition = {
        is_deleted: { $eq: 0 },
        question_number: { $eq: reqQuery.question_number },
      };
    }
    if (reqQuery.subject_name != "" && reqQuery.question_number == "") {
      where_condition = {
        is_deleted: { $eq: 0 },
        subject_name: { $eq: reqQuery.subject_name },
      };
    }
    var subjectsCount = {};
    var getAllQuestionnaireGetByStudentCount =
      await questionnaireModel.aggregate([
        { $match: { is_deleted: { $eq: "0" } } },
        {
          $group: {
            _id: "$subject_name",
            count: { $sum: 1 },
          },
        },
      ]);

    getAllQuestionnaireGetByStudentCount.forEach((e, i) => {
      subjectsCount[e._id] = e.count;
    });

    var questionnaire = await questionnaireModel
      .find(where_condition)
      .sort([sort_array]);
    return { questionnaire, subjectsCount };
  } catch (error) {
    console.log(error, "--> Catch error");
    return { error: error };
  }
};

exports.FlagUpdate = async (id, flag) => {
  try {
    let updateQuestionnaireData = await questionnaireModel
      .updateOne({ _id: id, is_deleted: 0 }, { flag: flag })
      .lean();

    return updateQuestionnaireData;
  } catch (error) {
    console.log(error, "--> Catch error");
    return { error: error };
  }
};

exports.ExcellquestionnaireCreate = async (data) => {
  try {
    let questionArray = [];

    for (let index = 0; index < data.length; index++) {
      const element = data[index];

      let subjectId = await subjectModel.findOne({
        subject_name: element.subject_name,
      });

      if (subjectId !== null) {
        let Options = element.options;

        const lastQuestionNo = await questionnaireModel
          .findOne({
            subject_name: subjectId.subject_name,
            is_type: element.is_type,
          })
          .sort({ question_number: -1 });

        console.log(lastQuestionNo, ":-->lastQuestionNo --> --> -->");

        const newquestionnaire = new questionnaireModel({
          is_type: element.is_type || "act",
          // subject_id: id.flat(2),
          // subject_name: name.flat(1),
          question_number:
            lastQuestionNo != null ? lastQuestionNo.question_number + 1 : 1,
          subject_id: subjectId._id,
          subject_name: subjectId.subject_name,
          question: element.question,
          question_description: element.question_description,
          options: Options,
          answer: element.answer,
          question_marks: element.question_marks,
          isActive: element.status || "active",
        });

        questionArray.push(newquestionnaire);
      }
    }

    let multipleQuestion = await questionnaireModel.insertMany(questionArray);
    // console.log(multipleQuestion, "multipleQuestion");
    return multipleQuestion;

    // let OptionData = Array.flat(1);

    // let obj = {};
    // let option = OptionData.forEach((value, index) => (obj[index + 1] = value));

    // const lastQuestionNo = await questionnaireModel
    //   .findOne({ subject_name: name, is_type: reqbody.is_type })
    //   .sort({ question_number: -1 });
    // const newquestionnaire = new questionnaireModel({
    //   is_type: reqbody.is_type || "act",
    //   // subject_id: id.flat(2),
    //   // subject_name: name.flat(1),
    //   question_number:
    //     lastQuestionNo != null ? lastQuestionNo.question_number + 1 : 1,
    //   subject_id: id,
    //   subject_name: name,
    //   question: reqbody.question,
    //   question_description: reqbody.question_description,
    //   options: obj,
    //   answer: reqbody.answer,
    //   question_marks: reqbody.question_marks,
    //   isActive: reqbody.status || "active",
    // });

    // return await newquestionnaire.save();
  } catch (error) {
    console.log(error, "--> Catch error");
    return { error: error };
  }
};
