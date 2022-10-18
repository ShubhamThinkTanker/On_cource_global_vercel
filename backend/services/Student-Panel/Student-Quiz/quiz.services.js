const {
  commonResponse,
  commonFunctions,
  customErrorResponse,
} = require("../../../helper");
const quizModel = require("./quiz.model");
const tempQuizModel = require("./tempQuiz.model");
const subjectModel = require("../../Admin-Panel/subject/subject.model");
const questionModel = require("../../Admin-Panel/questionnaire/questionnaire.model");
const studentModel = require("../student/student.model");
const { find } = require("../student/student.model");

exports.create = async (reqbody, id) => {
  try {
    var allQuestion = [];

    for (let index = 0; index < reqbody.length; index++) {
      const element = reqbody[index];
      let studentFind = await studentModel.find({ _id: id });
      let Name = studentFind.map((index) => index.name);

      var subjectFind = await subjectModel.findOne({
        _id: element.subject_id,
      });
      if (subjectFind != null) {
        // QuizData.push(element)

        var findQuestion = await questionModel.findOne({
          _id: element.questionnaire_id,
        });

        console.log(findQuestion, "findQuestion");

        const Right_answered =
          element.answered === element.submited_answered ? 1 : 0;
        const Student_marks =
          Right_answered == 1 ? findQuestion.question_marks : 0;
        const submited_answered =
          element.submited_answered == ""
            ? "unAnswered"
            : element.submited_answered;

        const quiz = new quizModel({
          stundent_id: id,
          stundent_name: Name[0],
          subject_name: subjectFind.subject_name,
          paper_id: findQuestion.paper_id,
          paper_name: findQuestion.paper_name,
          questionnaire_id: element.questionnaire_id,
          questions: paper_name.question,
          question_number: findQuestion.question_number,
          total_questions: "",
          options: findQuestion.options,
          answered: findQuestion.answer,
          submited_answered: submited_answered,
          right_answered: Right_answered,
          student_marks: Student_marks,
          // result: reqbody.result,
          // start_date: reqbody.start_date,
          // end_date: reqbody.end_date,
          // start_time: reqbody.start_time,
          // end_time: reqbody.end_time,
          // attampt_time: reqbody.attampt_time,
          status: "",
          is_deleted: reqbody.is_deleted,
          createdAt: reqbody.createdAt,
          created_by: id,
          updatedAt: reqbody.updatedAt,
          updated_by: reqbody.updated_by,
        });

        console.log(quiz, ":quiz");

        allQuestion.push(quiz);
      }
    }

    // console.log(allQuestion, ":allQuestion");
    let insertData = await quizModel.insertMany(allQuestion);
    return insertData;

    // let questionCount = reqbody.questions
    // let totalQuestion = 0;
    // let flagQuestion = []
    // let answered = 0
    // let unAnswered = 0
    // let rightAnswered = 0
    // for (let i = 0; i < questionCount.length; i++) {
    //     const element = questionCount[i];
    //     if (element) totalQuestion++
    //     if (element.ans === element.right_ans) rightAnswered++
    //     if (element.flag == 1) { flagQuestion.push(element) }
    //     if (element.ans.replace(/\s/g, "") != '' && element.ans != 'undefine' && element.ans != null) { answered++ }

    // }
  } catch (error) {
    console.log(error);
  }
};

exports.tempcreate = async (tempData, id) => {
  try {
    var tempQuizData = [];
    for (let index = 0; index < tempData.length; index++) {
      const element = tempData[index];

      let studentFind = await studentModel.find({ _id: id });
      let Name = studentFind.map((index) => index.name);

      var subjectFind = await subjectModel.findOne({
        _id: element.subject_id,
      });
      if (subjectFind != null) {
        // console.log(element, ":subjectFind");
        var findQuestion = await questionModel.findOne({
          _id: element.questionnaire_id,
        });

        const tempQuiz = new tempQuizModel({
          stundent_id: id,
          stundent_name: Name[0],
          subject_name: subjectFind.subject_name,
          questionnaire_id: element.questionnaire_id,
          questions: findQuestion.question,
          options: findQuestion.options,
          answered: findQuestion.answer,
          submited_answered: element.submited_answered,
          // is_deleted: reqbody.is_deleted,
          // createdAt: reqbody.createdAt,
          // created_by: id,
          // updatedAt: reqbody.updatedAt,
          // updated_by: reqbody.updated_by,
        });

        tempQuizData.push(tempQuiz);
      }
    }
    let insertTempData = await tempQuizModel.insertMany(tempQuizData);
    return insertTempData;
  } catch (error) {
    console.log(error);
  }
};
