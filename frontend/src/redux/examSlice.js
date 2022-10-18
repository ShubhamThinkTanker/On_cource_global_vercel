import { createSlice } from '@reduxjs/toolkit';
import {
	GetAllQuestionsByStudentAPI,
	GetQuestionByStudentAPI,
	FlagQuestionByStudentAPI,
	GetQuestionByParamsStudentAPI,
	TemporyResultAPI,
} from '../services/api';

const LocalQuestions = JSON.parse(localStorage.getItem('QuestionsList'));

const initialState = {
	isLoading: false,
	error: null,
	currentSelectedQuestion: 0,
	currentSelectedSubject: 'English',
	currentActiveSection: 'English',
	examData: null,
	questionByID: null,
	sectionList: ['English', 'Maths', 'Break-15min', 'Reading', 'Science'],
	flaggedQuestion: null,
	deadLineExam: 0,
	startedTimer: false,
	selectedAnswerByStudent: '',
	selectedAnswerKeyByStudent: '',
	localiazedQuestions: LocalQuestions ? LocalQuestions : null,
	tempResultData: null,
};

const examSlice = createSlice({
	name: 'exam',
	initialState,
	reducers: {
		setLoading: (state) => {
			state.isLoading = true;
		},
		handleExamSuccess: (state, action) => {
			state.isLoading = false;
			state.examData = action.payload.Questionnaire_Details;
		},
		handleErrorResponse: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
		handleSelectQuestion: (state, action) => {
			state.currentSelectedQuestion = action.payload;
		},
		handleSelectQuestionNext: (state) => {
			state.currentSelectedQuestion = state.currentSelectedQuestion + 1;
		},
		handleSelectQuestionPrev: (state) => {
			state.currentSelectedQuestion = state.currentSelectedQuestion - 1;
		},
		handleSelectSubject: (state, action) => {
			state.currentSelectedSubject = action.payload;
		},
		handleActiveExamSection: (state, action) => {
			state.currentActiveSection = action.payload;
			state.currentSelectedSubject = action.payload;
			state.currentSelectedQuestion = 0;
		},
		handleGetQuestionByID: (state, action) => {
			state.isLoading = false;
			if (typeof action.payload === 'string') {
				state.questionByID = state.examData.questionnaire?.filter(
					(question) => question._id === action.payload
				)[0];
			} else {
				state.questionByID = action.payload;
			}
		},
		handleSuccessFlagedQuestion: (state, action) => {
			state.isLoading = false;
			state.flaggedQuestion = action.payload;
		},
		handleSuccessTempResult: (state, action) => {
			state.isLoading = false;
			state.tempResultData = action.payload;
		},
		handleEndSectionClick: (state, action) => {
			const findIndex = state.sectionList.findIndex((section) => section === action.payload);
			if (findIndex < state.sectionList.length) {
				state.currentActiveSection = state.sectionList[findIndex + 1];
				state.currentSelectedSubject = state.sectionList[findIndex + 1];
				state.currentSelectedQuestion = 0;
				state.questionByID = null;
				state.startedTimer = false;
				state.deadLineExam = 0;
			}
		},
		handleSetDeadLineExam: (state, action) => {
			state.deadLineExam = action.payload;
		},
		resetExamSlice: (state) => {
			state.currentActiveSection = 'English';
			state.currentSelectedSubject = 'English';
			state.currentSelectedQuestion = 0;
			state.questionByID = null;
			state.localiazedQuestions = null;
			localStorage.removeItem('QuestionsList');
		},
		handleStartedTimer: (state, action) => {
			state.startedTimer = action.payload;
		},
		handleSelectAnswerByStudent: (state, action) => {
			state.selectedAnswerByStudent = action.payload.value;
			state.selectedAnswerKeyByStudent = action.payload.key;
		},
		handleLocalizedQuestion: (state, action) => {
			const findIndex = state.localiazedQuestions.findIndex(
				(question) => question.questionnaire_id === action.payload
			);
			state.localiazedQuestions[findIndex].submited_ans = state.selectedAnswerByStudent;
			state.localiazedQuestions[findIndex].submited_answered = state.selectedAnswerKeyByStudent;
			localStorage.setItem('QuestionsList', JSON.stringify(state.localiazedQuestions));
			state.selectedAnswerByStudent = '';
			state.selectedAnswerKeyByStudent = '';
		},
		storedLocaliazedQuestions: (state, action) => {
			state.localiazedQuestions = action.payload;
			localStorage.setItem('QuestionsList', JSON.stringify(action.payload));
		},
	},
});

export const {
	setLoading,
	handleExamSuccess,
	handleErrorResponse,
	handleSelectQuestion,
	handleSelectQuestionNext,
	handleSelectQuestionPrev,
	handleSelectSubject,
	handleActiveExamSection,
	handleGetQuestionByID,
	handleErrorGetQuestionByID,
	handleEndSectionClick,
	handleSuccessFlagedQuestion,
	handleSetDeadLineExam,
	resetExamSlice,
	handleStartedTimer,
	handleLocalizedQuestion,
	handleSelectAnswerByStudent,
	storedLocaliazedQuestions,
	handleSuccessTempResult,
} = examSlice.actions;

export default examSlice.reducer;

export const GetAllQuestionsBySubjectRequest = (queryString) => async (dispatch, getState) => {
	dispatch(setLoading());
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
				Authorization: getState()?.auth?.Token,
			},
		};
		const { data } = await GetAllQuestionsByStudentAPI(queryString, config);
		const { statusCode } = data;
		if (statusCode === 200) {
			dispatch(handleExamSuccess(data.data));
		}
	} catch (error) {
		if (error.response && error.response.data.errors) {
			return dispatch(handleErrorResponse(error.response.data.errors));
		} else {
			return dispatch(handleErrorResponse(error.message));
		}
	}
};

export const GetQuestionByParamsStudentRequest = (queryString) => async (dispatch, getState) => {
	dispatch(setLoading());
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
				Authorization: getState()?.auth?.Token,
			},
		};
		const { data } = await GetQuestionByParamsStudentAPI(queryString, config);
		const { statusCode } = data;
		if (statusCode === 200) {
			dispatch(handleGetQuestionByID(data.data.Questionnaire_Details.questionnaire[0]));
		}
	} catch (error) {
		if (error.response && error.response.data.errors) {
			return dispatch(handleErrorResponse(error.response.data.errors));
		} else {
			return dispatch(handleErrorResponse(error.message));
		}
	}
};

export const GetQuestionBySubjectRequest = (id) => async (dispatch, getState) => {
	dispatch(setLoading());
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
				Authorization: getState()?.auth?.Token,
			},
		};
		const { data } = await GetQuestionByStudentAPI(id, config);
		const { statusCode } = data;
		if (statusCode === 200) {
			dispatch(handleGetQuestionByID(data.data));
		}
	} catch (error) {
		if (error.response && error.response.data.errors) {
			return dispatch(handleErrorResponse(error.response.data.errors));
		} else {
			return dispatch(handleErrorResponse(error.message));
		}
	}
};

export const FlagQuestionBySubjectRequest = (reqData) => async (dispatch, getState) => {
	dispatch(setLoading());
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
				Authorization: getState()?.auth?.Token,
			},
		};
		const { data } = await FlagQuestionByStudentAPI(reqData, config);
		const { statusCode } = data;
		if (statusCode === 200) {
			// eslint-disable-next-line no-console

			dispatch(handleSuccessFlagedQuestion(data.data));
		}
	} catch (error) {
		if (error.response && error.response.data.errors) {
			return dispatch(handleErrorResponse(error.response.data.errors));
		} else {
			return dispatch(handleErrorResponse(error.message));
		}
	}
};

export const TemporyResultRequest = (reqData) => async (dispatch, getState) => {
	dispatch(setLoading());
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
				Authorization: getState()?.auth?.Token,
			},
		};
		const { data } = await TemporyResultAPI(reqData, config);
		console.log(reqData, 'reqData');
		const { statusCode } = data;
		if (statusCode === 200) {
			// eslint-disable-next-line no-console
			console.log('RESULT REQUESTED SUCCESSFULLY');
			dispatch(handleSuccessTempResult(data.data));
		}
	} catch (error) {
		if (error.response && error.response.data.errors) {
			return dispatch(handleErrorResponse(error.response.data.errors));
		} else {
			return dispatch(handleErrorResponse(error.message));
		}
	}
};
