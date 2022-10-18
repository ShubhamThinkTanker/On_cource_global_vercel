import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
	CreateInstructionsAPI,
	GetInstructionsAPI,
	GetAllInstructionsAPI,
	EditInstructionsAPI,
	DeleteInstructionsAPI,
	MultipalDeleteInstructionsAPI,
	GetAllSubjectNameAPI,
	GetAllInstructionsByStudentAPI,
} from '../services/api';

const initialState = {
	isLoading: false,
	getByIdInstructData: null,
	createdInstructData: null,
	editedInstructData: null,
	deletedInstructData: null,
	deletedMultiInstructData: null,
	instructionsData: null,
	subjectData: null,
	error: null,
};

const instructionsSlice = createSlice({
	name: 'instructions',
	initialState,
	reducers: {
		setLoading: (state) => {
			state.isLoading = true;
		},
		handleCreateInstructData: (state, action) => {
			state.createdInstructData = action.payload;
			state.isLoading = false;
		},
		handleErrorCreateInstructData: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
		handleGetInstructData: (state, action) => {
			state.getByIdInstructData = action.payload;
			state.isLoading = false;
		},
		handleErrorGetInstructData: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
		handleAllGetInstructData: (state, action) => {
			state.instructionsData = action.payload;
			state.isLoading = false;
		},
		handleErrorAllGetInstructData: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
		handleEditInstructData: (state, action) => {
			state.editedInstructData = action.payload;
			state.isLoading = false;
		},
		handleErrorEditInstructData: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
		handleDeleteInstructData: (state, action) => {
			state.deletedInstructData = action.payload;
			state.isLoading = false;
		},
		handleErrorDeleteInstructData: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
		handleMultipalDeleteInstructData: (state, action) => {
			state.deletedMultiInstructData = action.payload;
			state.isLoading = false;
		},
		handleErrorMultipalDeleteInstructData: (state, action) => {
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
		handleResetInstruct: (state) => {
			state.isLoading = false;
			state.getByIdInstructData = null;
			state.createdInstructData = null;
			state.editedInstructData = null;
			state.deletedInstructData = null;
			state.instructionsData = null;
			state.deletedMultiInstructData = null;
			state.subjectData = null;
			state.error = null;
		},
	},
});

export const {
	setLoading,
	handleCreateInstructData,
	handleErrorCreateInstructData,
	handleGetInstructData,
	handleErrorGetInstructData,
	handleAllGetInstructData,
	handleErrorAllGetInstructData,
	handleEditInstructData,
	handleErrorEditInstructData,
	handleDeleteInstructData,
	handleErrorDeleteInstructData,
	handleMultipalDeleteInstructData,
	handleErrorMultipalDeleteInstructData,
	handleResetInstruct,
	handleAllGetSubjectData,
	handleErrorAllGetSubjectData,
} = instructionsSlice.actions;

export default instructionsSlice.reducer;

export const CreateInstructionsRequest = (reqData) => async (dispatch, getState) => {
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
		const { data } = await CreateInstructionsAPI(reqData, config);

		const { statusCode } = data;

		if (statusCode === 201) {
			dispatch(handleCreateInstructData(data.data));
			toast.success('New Instructions Created Sucessfully!');
		}
	} catch (error) {
		if (error.response && error.response.data.errors) {
			return dispatch(handleErrorCreateInstructData(error.response.data.errors));
		} else {
			return dispatch(handleErrorCreateInstructData(error.message));
		}
	}
};

export const GetInstructionsRequest = (id) => async (dispatch, getState) => {
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
		const { data } = await GetInstructionsAPI(id, config);

		const { statusCode } = data;

		if (statusCode === 200) {
			dispatch(handleGetInstructData(data.data));
		}
	} catch (err) {
		dispatch(handleErrorGetInstructData(err));
	}
};

export const GetAllInstrunctionsRequest = (queryStr) => async (dispatch, getState) => {
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
		const { data } = await GetAllInstructionsAPI(config, queryStr);
		const { statusCode, data: QueData } = data;

		if (statusCode === 200) {
			dispatch(handleAllGetInstructData(QueData));
		}
	} catch (err) {
		dispatch(handleErrorAllGetInstructData(err));
	}
};

export const GetAllInstrunctionsByStudentRequest = () => async (dispatch, getState) => {
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
		const { data } = await GetAllInstructionsByStudentAPI(config);
		const { statusCode } = data;

		if (statusCode === 200) {
			dispatch(handleAllGetInstructData(data.data));
		}
	} catch (err) {
		dispatch(handleErrorAllGetInstructData(err));
	}
};

export const EditInstructionsRequest = (reqData) => async (dispatch, getState) => {
	dispatch(setLoading());
	console.log(reqData, 'reqData');
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
				Authorization: getState()?.auth?.Token,
			},
		};
		const { data } = await EditInstructionsAPI(reqData, config);

		const { statusCode } = data;

		if (statusCode === 200) {
			dispatch(handleEditInstructData(data.data));
			toast.success('Updated Instructions Sucessfully!');
		}
	} catch (error) {
		if (error.response && error.response.data.errors) {
			return dispatch(handleErrorEditInstructData(error.response.data.errors));
		} else {
			return dispatch(handleErrorEditInstructData(error.message));
		}
	}
};

export const DeleteInstructionsRequest = (id) => async (dispatch, getState) => {
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
		const { data } = await DeleteInstructionsAPI(id, config);
		const { statusCode } = data;

		if (statusCode === 200) {
			dispatch(handleDeleteInstructData());
		}
	} catch (err) {
		dispatch(handleErrorDeleteInstructData(err));
	}
};

export const MultipalDeleteInstructionsRequest = (MultiData) => async (dispatch, getState) => {
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
		const { data } = await MultipalDeleteInstructionsAPI(MultiData, config);

		const { statusCode } = data;

		if (statusCode === 200) {
			dispatch(handleMultipalDeleteInstructData(MultiData));
		}
	} catch (err) {
		dispatch(handleErrorMultipalDeleteInstructData(err));
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
