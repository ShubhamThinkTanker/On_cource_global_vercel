const { commonResponse, commonFunctions, customErrorResponse } = require("../../../helper");
const quizModel = require("../Student-Quiz/quiz.model");

exports.GetAllData = async (reqbody, id) => {

   
    try {
        let findResult = await quizModel.find({
            $and: [{ stundent_id: id }, { subject_name: reqbody.subject_name }],
        }).select({ questionnaire_id: 0, total_questions: 0, is_deleted: 0, created_by: 0, createdAt: 0, updatedAt: 0, updated_by: 0, })

        return findResult
    } catch (error) {
        console.log(error,"aaaaaaaaaa");
    }

}
