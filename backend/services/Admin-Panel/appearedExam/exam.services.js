const questionnaireModel = require("../questionnaire/questionnaire.model");
const subjectModel = require("../subject/subject.model")


exports.isQuestion = async (reqBody) => {
    try {

        let searchStr = {};

        if (reqBody.subject_name == "All" || reqBody.subject_name == "" || reqBody.subject_name == undefined) {
            searchStr = {};
        } else {
            searchStr["subject_name"] = reqBody.subject_name
        }


        let questionExist = await subjectModel.aggregate([
            { $match: searchStr },
            {
                $lookup:
                {
                    from: 'questionnaires',
                    let: { id: '$_id' },
                    pipeline: [

                        {

                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ['$subject_id', '$$id'] },
                                    ]
                                }
                            }
                        },


                    ],
                    as: 'SubjectWise_data'
                }
            },
            { $project: { "subject_name": 1, "SubjectWise_data": { "question": 1, "question_description": 1, "options": 1, "answer": 1, "question_marks": 1 } } }
        ])

        return questionExist;

    } catch (error) {
        console.log(error, '--> Catch error');
        return next(error)
    }
}

exports.summery = async (reqQuery, sort_array, filter_value, status) => {
    try {
        let LIMIT = reqQuery.limit * 1;
        let SKIP = (reqQuery.page - 1) * reqQuery.limit;
        if (filter_value != "") {
            var regex = new RegExp(filter_value, "i");

            filter_value = {
                $or: [{ subject_name: regex }]
            };
        } else {
            filter_value = {};
        }

        if (status != "") {
            var regex = new RegExp(status, "i");
            status = {
                $or: [{ status: regex }]
            }
        } else {
            status = {};
        }
        let studentData = await subjectModel.find({ $and: [{ is_deleted: 0 }, filter_value, status] })
            .limit(LIMIT)
            .skip(SKIP)
            .sort([sort_array]);
        return studentData;
    } catch (error) {
        console.log(error, '--> Catch error');
        return next(error)
    }
}

exports.get = async (id) => {

    try {
        let getStudenyByID = await subjectModel.findOne({
            $and: [{ _id: id }, { is_deleted: 0 }]
        });
        return getStudenyByID;
    } catch (error) {
        console.log(error, '--> Catch error');
        return next(error)
    }
};