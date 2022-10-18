const { studentRoutes } = require("../services/Student-Panel/student/index");
const {
  deshboardRoutes,
} = require("../services/Student-Panel/deshboard/index");
const { adminRoutes } = require("../services/Admin-Panel/superAdmin/index");
const { subjectRoutes } = require("../services/Admin-Panel/subject/index");
const {
  questionnaireRoutes,
} = require("../services/Admin-Panel/questionnaire/index");
const { examRoutes } = require("../services/Admin-Panel/appearedExam/index");
const {
  instructionRoutes,
} = require("../services/Admin-Panel/instruction/index");
const { quizRoutes } = require("../services/Student-Panel/Student-Quiz/index");
const { countryRoute } = require("../services/Student-Panel/Country/index");
const {
  resultRoutes,
} = require("../services/Student-Panel/student_report/index");
const {
  paperMasterRoutes,
} = require("../services/Admin-Panel/paperMaster/index");

const initialize = (app) => {
  // ---Admin Routes--- //
  app.use("/api/v1/admin", adminRoutes);
  app.use("/api/v1/admin/subject", subjectRoutes);
  app.use("/api/v1/admin/questionnaire", questionnaireRoutes);
  app.use("/api/v1/admin/appeared-exam", examRoutes);
  app.use("/api/v1/admin/instruction", instructionRoutes);
  app.use("/api/v1/admin/paper_master", paperMasterRoutes);

  // ---Student Routes--- //
  app.use("/api/v1/student", studentRoutes);
  app.use("/api/v1/student/quiz-result", quizRoutes);
  app.use("/api/v1/deshboard", deshboardRoutes);
  app.use("/api/v1", countryRoute);
  app.use("/api/v1/student", resultRoutes);
};

module.exports = { initialize };
