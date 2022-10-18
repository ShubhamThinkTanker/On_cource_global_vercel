import axios from 'axios';

const BASE_URL_API = process.env.REACT_APP_BASE_URL;

export const AdminLoginAPI = async (reqData) => {
	return await axios.post(`${BASE_URL_API}/admin/login`, reqData, {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
	});
};

export const StudentLoginAPI = async (reqData) => {
	return await axios.post(`${BASE_URL_API}/student/login`, reqData, {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
	});
};

export const StudentForgotPasswordAPI = async (reqData) => {
	return await axios.post(`${BASE_URL_API}/student/forgotpassword`, reqData, {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
	});
};

export const StudentResetPasswordAPI = async (reqData) => {
	return await axios.post(`${BASE_URL_API}/student/resetPassword/${reqData.token}`, reqData, {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
	});
};

export const StudentChangePasswordAPI = async (form, config) => {
	return await axios.post(`${BASE_URL_API}/student/changepassword`, form, config);
};

export const StudentRegisterAPI = async (reqData) => {
	return await axios.post(`${BASE_URL_API}/student/register`, reqData, {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
	});
};

export const StudentProfileUpdateAPI = async (updatedData, config) => {
	return await axios.post(`${BASE_URL_API}/student/profile`, updatedData, config);
};
export const StudentGetProfileAPI = async (id, config) => {
	return await axios.get(`${BASE_URL_API}/student/profile/${id}`, config);
};
export const GetAllCountryNameAPI = async (config) => {
	return await axios.get(`${BASE_URL_API}/get_all_country`, config);
};
export const GetAllStateNameAPI = async (countryname, config) => {
	return await axios.get(`${BASE_URL_API}/get_all_state?countryname=${countryname}`, config);
};
export const GetAllCityNameAPI = async (statename, config) => {
	return await axios.get(`${BASE_URL_API}/get_all_city?statename=${statename}`, config);
};

export const StudentLogoutAPI = async (reqData, config) => {
	return await axios.post(`${BASE_URL_API}/student/logout`, reqData, config);
};

export const CreateQuestionnaireAPI = async (createdData, config) => {
	return await axios.post(`${BASE_URL_API}/admin/questionnaire/create`, createdData, config);
};
export const GetQuestionnaireAPI = async (id, config) => {
	return await axios.get(`${BASE_URL_API}/admin/questionnaire/get_questionnaire/${id}`, config);
};
export const GetAllStudentListAPI = async (config, queryString) => {
	return await axios.get(`${BASE_URL_API}/student/getallstudent?${queryString}`, config);
};

// export const GetAllQuestionnaireAPI = async (queryString, config) => {
// 	return await axios.get(
// 		`${BASE_URL_API}/admin/questionnaire/getallquestionnaire?${queryString}`,
// 		config
// 	);
// };

export const GetAllActQuestionnaireAPI = async (queryString, config) => {
	return await axios.get(
		`${BASE_URL_API}/admin/questionnaire/getallACTquestionnaire?${queryString}`,
		config
	);
};

export const GetAllSatQuestionnaireAPI = async (queryString, config) => {
	return await axios.get(
		`${BASE_URL_API}/admin/questionnaire/getallSATquestionnaire?${queryString}`,
		config
	);
};
export const EditQuestionnaireAPI = async ({ id, updatedData }, config) => {
	return await axios.put(`${BASE_URL_API}/admin/questionnaire/update/${id}`, updatedData, config);
};
export const DeleteQuestionnaireAPI = async (id, config) => {
	return await axios.delete(`${BASE_URL_API}/admin/questionnaire/delete/${id}`, config);
};
export const MultipalDeleteQuestionnaireAPI = async (deletedData, config) => {
	return await axios.post(`${BASE_URL_API}/admin/questionnaire/delete_many`, deletedData, config);
};

// Excel Sheet
export const GetAllExcelQuestionnaireAPI = async (excelData, config) => {
	return await axios.post(
		`${BASE_URL_API}/admin/questionnaire/excel-upload`,
		{ excelData: excelData },
		config
	);
};
export const GetAllSubjectAPI = async (queryString, config) => {
	return await axios.get(`${BASE_URL_API}/admin/subject/getallsubject?${queryString}`, config);
};

export const GetAllSubjectNameAPI = async (subjectString, config) => {
	return await axios.get(
		`${BASE_URL_API}/admin/subject/getallsubjectname?${subjectString}`,
		config
	);
};

export const GetAllSubjectNameStudentAPI = async (subjectString, config) => {
	return await axios.get(
		`${BASE_URL_API}/admin/subject/getallsubjectname_student?${subjectString}`,
		config
	);
};
export const CreateSubjectAPI = async (createdData, config) => {
	return await axios.post(`${BASE_URL_API}/admin/subject/create`, createdData, config);
};
export const SubjectGetByIdAPI = async (id, config) => {
	return await axios.get(`${BASE_URL_API}/admin/subject/get_subject/${id}`, config);
};
export const SubjectEditByIdAPI = async ({ id, editedData }, config) => {
	return await axios.put(`${BASE_URL_API}/admin/subject/update/${id}`, editedData, config);
};
export const SubjectDeleteAPI = async (id, config) => {
	return await axios.delete(`${BASE_URL_API}/admin/subject/delete/${id}`, config);
};
export const SubjectMultipleDeleteAPI = async (deletedData, config) => {
	return await axios.post(`${BASE_URL_API}/admin/subject/delete_many`, deletedData, config);
};

export const CreateInstructionsAPI = async (createdData, config) => {
	return await axios.post(`${BASE_URL_API}/admin/instruction/create`, createdData, config);
};
export const GetInstructionsAPI = async (id, config) => {
	return await axios.get(`${BASE_URL_API}/admin/instruction/get_instruction/${id}`, config);
};

export const GetAllInstructionsAPI = async (config, queryStr) => {
	return await axios.get(`${BASE_URL_API}/admin/instruction/getallinstruction?${queryStr}`, config);
};

export const GetAllInstructionsByStudentAPI = async (config) => {
	return await axios.get(`${BASE_URL_API}/student/getallinstruction`, config);
};

export const EditInstructionsAPI = async ({ id, updatedData }, config) => {
	return await axios.put(`${BASE_URL_API}/admin/instruction/update/${id}`, updatedData, config);
};
export const DeleteInstructionsAPI = async (id, config) => {
	return await axios.delete(`${BASE_URL_API}/admin/instruction/delete/${id}`, config);
};
export const MultipalDeleteInstructionsAPI = async (deletedData, config) => {
	return await axios.post(`${BASE_URL_API}/admin/instruction/delete_many`, deletedData, config);
};

//papermaster API
export const CreatePapermasterAPI = async (createdData, config) => {
	return await axios.post(`${BASE_URL_API}/admin/paper_master/create`, createdData, config);
};
export const GetPapermasterAPI = async (id, config) => {
	return await axios.get(`${BASE_URL_API}/admin/paper_master/get_papermaster/${id}`, config);
};

export const GetAllPapermastersAPI = async (config, queryStr) => {
	return await axios.get(
		`${BASE_URL_API}/admin/paper_master/getallpaperMaster?${queryStr}`,
		config
	);
};

export const EditPapermasterAPI = async ({ id, updatedData }, config) => {
	console.log(updatedData, 'updatedData');

	return await axios.put(`${BASE_URL_API}/admin/paper_master/update/${id}`, updatedData, config);
};
export const DeletePapermasterAPI = async (id, config) => {
	return await axios.delete(`${BASE_URL_API}/admin/paper_master/delete/${id}`, config);
};
export const MultipalDeletePapermasterAPI = async (deletedData, config) => {
	return await axios.post(`${BASE_URL_API}/admin/paper_master/delete_many`, deletedData, config);
};

// STUDENT EXAM API
export const GetAllQuestionsByStudentAPI = async (queryString, config) => {
	return await axios.get(
		`${BASE_URL_API}/student/getallquestionnairebystudent?${queryString}`,
		config
	);
};

export const GetQuestionByParamsStudentAPI = async (queryString, config) => {
	return await axios.get(
		`${BASE_URL_API}/student/getallquestionnairebystudent?${queryString}`,
		config
	);
};

export const GetQuestionByStudentAPI = async (id, config) => {
	return await axios.get(`${BASE_URL_API}/student/get_questionnaire/${id}`, config);
};

export const FlagQuestionByStudentAPI = async (reqData, config) => {
	return await axios.post(`${BASE_URL_API}/student/flagQuestion`, reqData, config);
};

export const StudentResultAPI = async (reqData, config) => {
	return await axios.post(`${BASE_URL_API}/student/result`, { subject_name: reqData }, config);
};

export const TemporyResultAPI = async (reqData, config) => {
	console.log(reqData, 'reqData reqData');
	return await axios.post(`${BASE_URL_API}/student/quiz-result/quiz`, reqData, config);
};
