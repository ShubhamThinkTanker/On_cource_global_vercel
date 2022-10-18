const studentModel = require("../student/student.model");

module.exports = {
  get: async (reqQuery, sort_array, filter_value) => {
    try {
      let LIMIT = reqQuery.limit * 1;
      let SKIP = (reqQuery.page - 1) * reqQuery.limit;

      if (filter_value != "") {
        var regex = new RegExp(filter_value, "i");

        filter_value = {
          $or: [
            { username: regex },
            { name: regex },
            { mobile_no: regex },
            { gender: regex },
          ],
        };
      } else {
        filter_value = {};
      }

      let getAllExam = await studentModel
        .find(filter_value)
        .limit(LIMIT)
        .skip(SKIP)
        .sort([sort_array]);

      return getAllExam;
    } catch (error) {
      console.log("Error : ", error);
      return new Error(error);
    }
  },
};
