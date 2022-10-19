import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
	CreateQuestionnaireAPI,
	GetQuestionnaireAPI,
	// GetAllQuestionnaireAPI,
	EditQuestionnaireAPI,
	DeleteQuestionnaireAPI,
	MultipalDeleteQuestionnaireAPI,
	GetAllSubjectNameAPI,
	GetAllPaperNameAPI,
	GetAllExcelQuestionnaireAPI,
	GetAllActQuestionnaireAPI,
	GetAllSatQuestionnaireAPI,
} from '../services/api';

const initialState = {
	isLoading: false,
	getByIdQuesData: null,
	createdQuesData: null,
	editedQuesData: null,
	deletedQuesData: null,
	deletedMultiQuesData: null,
	actquestionnaireData: null,
	satquestionnaireData: null,
	subjectData: null,
	paperData: null,
	error: null,
	questionnaireExcelData: null,
	isModalOpen: false,
	modalData: null,
};

const questionnaireSlice = createSlice({
	name: 'questionnaire',
	initialState,
	reducers: {
		setLoading: (state) => {
			state.isLoading = true;
		},
		handleCreateQuesData: (state, action) => {
			state.createdQuesData = action.payload;
			state.isLoading = false;
		},
		handleErrorCreateQuesData: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
		handleGetQuesData: (state, action) => {
			state.getByIdQuesData = action.payload;
			state.isLoading = false;
		},
		handleErrorGetQuesData: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
		handleAllActQuesData: (state, action) => {
			state.actquestionnaireData = action.payload;
			state.isLoading = false;
		},
		handleErrorAllActQuesData: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
		handleAllSatQuesData: (state, action) => {
			state.satquestionnaireData = action.payload;
			state.isLoading = false;
		},
		handleErrorAllSatQuesData: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
		handleEditQuesData: (state, action) => {
			state.editedQuesData = action.payload;
			state.isLoading = false;
		},
		handleErrorEditQuesData: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
		handleDeleteQuesData: (state, action) => {
			state.deletedQuesData = action.payload;
			state.isLoading = false;
		},
		handleErrorDeleteQuesData: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
		handleMultipalDeleteQuesData: (state, action) => {
			state.deletedMultiQuesData = action.payload;
			state.isLoading = false;
		},
		handleErrorMultipalDeleteQuesData: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
		handleAllGetSubjectData: (state, action) => {
			state.subjectData = action.payload;
			state.isLoading = false;
		},
		handleErrorAllGetSubjectData: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
		handleAllGetPaperData: (state, action) => {
			state.paperData = action.payload;
			state.isLoading = false;
		},
		handleErrorAllGetPaperData: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
		handleResetQues: (state) => {
			state.isLoading = false;
			state.getByIdQuesData = null;
			state.createdQuesData = null;
			state.editedQuesData = null;
			state.deletedQuesData = null;
			state.actquestionnaireData = null;
			state.satquestionnaireData = null;
			state.deletedMultiQuesData = null;
			state.subjectData = null;
			state.paperData = null;
			state.error = null;
			state.questionnaireExcelData = null;
		},
		handleAllExcelGetQuesData: (state, action) => {
			state.questionnaireExcelData = action.payload;
			state.isLoading = false;
		},
		handleErrorAllExcelGetQuesData: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
		handleModalOpen: (state, action) => {
			state.isModalOpen = true;
			state.modalData = action.payload;
		},
		handelModalClose: (state, action) => {
			state.isModalOpen = action.payload;
			state.modalData = null;
		},
	},
});

export const {
	setLoading,
	handleResetQues,
	handleCreateQuesData,
	handleErrorCreateQuesData,
	handleGetQuesData,
	handleErrorGetQuesData,
	handleAllActQuesData,
	handleErrorAllActQuesData,
	handleAllSatQuesData,
	handleErrorAllSatQuesData,
	handleEditQuesData,
	handleErrorEditQuesData,
	handleDeleteQuesData,
	handleErrorDeleteQuesData,
	handleMultipalDeleteQuesData,
	handleErrorMultipalDeleteQuesData,
	handleResetQuesData,
	handleAllGetSubjectData,
	handleErrorAllGetSubjectData,
	handleAllGetPaperData,
	handleErrorAllGetPaperData,
	handleAllExcelGetQuesData,
	handleErrorAllExcelGetQuesData,
	handleModalOpen,
	handelModalClose,
} = questionnaireSlice.actions;

export default questionnaireSlice.reducer;

export const CreateQuestionnaireRequest = (reqData) => async (dispatch, getState) => {
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
		const { data } = await CreateQuestionnaireAPI(reqData, config);
		const { statusCode } = data;

		if (statusCode === 201) {
			dispatch(handleCreateQuesData(data.data));
			toast.success('New Questionnaire Created Sucessfully!');
		}
	} catch (error) {
		if (error.response && error.response.data.errors) {
			return dispatch(handleErrorCreateQuesData(error.response.data.errors));
		} else {
			return dispatch(handleErrorCreateQuesData(error.message));
		}
	}
};

export const GetQuestionnaireRequest = (id) => async (dispatch, getState) => {
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
		const { data } = await GetQuestionnaireAPI(id, config);

		const { statusCode } = data;

		if (statusCode === 200) {
			dispatch(handleGetQuesData(data.data));
		}
	} catch (err) {
		dispatch(handleErrorGetQuesData(err));
	}
};

export const GetAllActQuestionnaireRequest = (queryString) => async (dispatch, getState) => {
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
		const { data } = await GetAllActQuestionnaireAPI(queryString, config);
		const { statusCode, data: QueData } = data;

		if (statusCode === 200) {
			dispatch(handleAllActQuesData(QueData));
		}
	} catch (err) {
		dispatch(handleErrorAllActQuesData(err));
	}
};

export const GetAllSatQuestionnaireRequest = (queryString) => async (dispatch, getState) => {
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
		const { data } = await GetAllSatQuestionnaireAPI(queryString, config);
		const { statusCode, data: QueData } = data;

		if (statusCode === 200) {
			dispatch(handleAllSatQuesData(QueData));
		}
	} catch (err) {
		dispatch(handleErrorAllSatQuesData(err));
	}
};

export const EditQuestionnaireRequest = (reqData) => async (dispatch, getState) => {
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
		const { data } = await EditQuestionnaireAPI(reqData, config);
		const { statusCode } = data;

		if (statusCode === 200) {
			dispatch(handleEditQuesData(data.data));
			toast.success('Updated Questionnaire Sucessfully!');
		}
	} catch (error) {
		if (error.response && error.response.data.errors) {
			return dispatch(handleErrorEditQuesData(error.response.data.errors));
		} else {
			return dispatch(handleErrorEditQuesData(error.message));
		}
	}
};
export const DeleteQuestionnaieRequest = (id) => async (dispatch, getState) => {
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
		const { data } = await DeleteQuestionnaireAPI(id, config);
		const { statusCode } = data;

		if (statusCode === 200) {
			dispatch(handleDeleteQuesData());
		}
	} catch (err) {
		dispatch(handleErrorDeleteQuesData(err));
	}
};
export const MultipalDeleteQuestionnaireRequest = (MultiData) => async (dispatch, getState) => {
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
		const { data } = await MultipalDeleteQuestionnaireAPI(MultiData, config);

		const { statusCode } = data;

		if (statusCode === 200) {
			dispatch(handleMultipalDeleteQuesData(MultiData));
		}
	} catch (err) {
		dispatch(handleErrorMultipalDeleteQuesData(err));
	}
};
export const GetAllSubjectNameRequest = (subjectString) => async (dispatch, getState) => {
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
		const { data } = await GetAllSubjectNameAPI(subjectString, config);

		const { statusCode, error, errors, data: SubjectData } = data;

		if (error) {
			dispatch(handleErrorAllGetSubjectData(errors));
		}
		if (statusCode === 200) {
			dispatch(handleAllGetSubjectData(SubjectData));
		}
	} catch (err) {
		dispatch(handleErrorAllGetSubjectData(err));
	}
};
export const GetAllPaperNameRequest = (paperString) => async (dispatch, getState) => {
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
		const { data } = await GetAllPaperNameAPI(paperString, config);

		const { statusCode, error, errors, data: PaperData } = data;

		if (error) {
			dispatch(handleErrorAllGetPaperData(errors));
		}
		if (statusCode === 200) {
			dispatch(handleAllGetPaperData(PaperData));
		}
	} catch (err) {
		dispatch(handleErrorAllGetPaperData(err));
	}
};
export const GetAllExcelQuestionnaireRequest = (excelData) => async (dispatch, getState) => {
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
		const { data } = await GetAllExcelQuestionnaireAPI(excelData, config);
		const { statusCode, data: QueData } = data;

		if (statusCode === 200) {
			dispatch(handleAllExcelGetQuesData(QueData));
			toast.success('Excel Import Sucessfully!');
		}
	} catch (err) {
		dispatch(handleErrorAllExcelGetQuesData(err));
		// toast.error(
		// 	() => (
		// 		<p className="mb-0">
		// 			You can only upload <span className="fw-bolder">.xlsx</span>,{' '}
		// 			<span className="fw-bolder">.xls</span> & <span className="fw-bolder">.csv</span> Files!.
		// 		</p>
		// 	),
		// 	{
		// 		style: {
		// 			minWidth: '380px',
		// 		},
		// 	}
		// );
	}
};
