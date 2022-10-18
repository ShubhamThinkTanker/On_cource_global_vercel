const resultService = require("./result.services");
const {
    commonResponse,
    commonFunctions,
    customErrorResponse,
} = require("../../../helper");
// const quizValidation = require("../../../validation/quizValidation/quizvalidation");
const quizModel = require("../Student-Quiz/quiz.model");
const questionModel = require("../../Admin-Panel/questionnaire/questionnaire.model");

module.exports = {
    result: async (req, res, next) => {
        try {
            if (!req.user) {
                return res.json({
                    error: true,
                    statusCode: 401,
                    message: "Invalid Student login",
                    errors: "Only Student can able to action on this module ",
                });
            }
            let id = req.user.id;


            let Total_Question = await quizModel.countDocuments({
                $and: [{ stundent_id: id }, { subject_name: req.body.subject_name }],
            });


            let FindResultOfStudent = await resultService.GetAllData(req.body, id)
            if (FindResultOfStudent) {
                return commonResponse.success(
                    res,
                    200,
                    "Success Fully Get Student Result",
                    { Total_Question, FindResultOfStudent }

                );
            } else {
                errors.error = "Something wrong";
                return commonResponse.customErrorResponse(
                    res,
                    422,
                    "Something went wrong",
                    errors
                );
            }

        } catch (error) {
            console.log(error);
        }
    },
};
