import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
	CreatePapermasterAPI,
	DeletePapermasterAPI,
	EditPapermasterAPI,
	GetAllPapermastersAPI,
	GetPapermasterAPI,
	MultipalDeletePapermasterAPI,
} from '../services/api';

const initialState = {
	isLoading: false,
	getByIdPapermasterData: null,
	createdPapermasterData: null,
	editedPapermasterData: null,
	deletedPapermasterData: null,
	deletedMultiPapermasterData: null,
	papermasterData: null,
	error: null,
};

const papermasterSlice = createSlice({
	name: 'papermaster',
	initialState,
	reducers: {
		setLoading: (state) => {
			state.isLoading = true;
		},
		handleCreatePapermasterData: (state, action) => {
			state.createdPapermasterData = action.payload;
			state.isLoading = false;
		},
		handleErrorCreatePapermasterData: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
		handleGetPapermasterData: (state, action) => {
			state.getByIdPapermasterData = action.payload;
			state.isLoading = false;
		},
		handleErrorGetPapermasterData: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
		handleAllGetPapermasterData: (state, action) => {
			state.papermasterData = action.payload;
			state.isLoading = false;
		},
		handleErrorAllGetPapermasterData: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
		handleEditPapermasterData: (state, action) => {
			state.editedPapermasterData = action.payload;
			state.isLoading = false;
		},
		handleErrorPapermasterData: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
		handleDeletePapermasterData: (state, action) => {
			state.deletedPapermasterData = action.payload;
			state.isLoading = false;
		},
		handleErrorDeletePapermasterData: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
		handleMultipalDeletePapermasterData: (state, action) => {
			state.deletedMultiPapermasterData = action.payload;
			state.isLoading = false;
		},
		handleErrorMultipalDeletePapermasterData: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},

		handleResetPapermaster: (state) => {
			state.isLoading = false;
			state.getByIdInstructData = null;
			state.createdPapermasterData = null;
			state.editedPapermasterData = null;
			state.deletedPapermasterData = null;
			state.papermasterData = null;
			state.deletedMultiPapermasterData = null;
			state.error = null;
		},
	},
});

export const {
	setLoading,
	handleCreatePapermasterData,
	handleErrorCreatePapermasterData,
	handleGetPapermasterData,
	handleErrorGetPapermasterData,
	handleAllGetPapermasterData,
	handleErrorAllGetPapermasterData,
	handleEditPapermasterData,
	handleErrorPapermasterData,
	handleDeletePapermasterData,
	handleErrorDeletePapermasterData,
	handleMultipalDeletePapermasterData,
	handleErrorMultipalDeletePapermasterData,
	handleResetPapermaster,
	handleAllGetSubjectData,
	handleErrorAllGetSubjectData,
} = papermasterSlice.actions;

export default papermasterSlice.reducer;

export const CreatePapermasterRequest = (reqData) => async (dispatch, getState) => {
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
		const { data } = await CreatePapermasterAPI(reqData, config);

		const { statusCode } = data;

		if (statusCode === 201) {
			dispatch(handleCreatePapermasterData(data.data));
			toast.success('New Paper Master Created Sucessfully!');
		}
	} catch (error) {
		if (error.response && error.response.data.errors) {
			return dispatch(handleErrorCreatePapermasterData(error.response.data.errors));
		} else {
			return dispatch(handleErrorCreatePapermasterData(error.message));
		}
	}
};

export const GetPapermasterRequest = (id) => async (dispatch, getState) => {
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
		const { data } = await GetPapermasterAPI(id, config);

		const { statusCode } = data;

		if (statusCode === 200) {
			dispatch(handleGetPapermasterData(data.data));
		}
	} catch (err) {
		dispatch(handleErrorGetPapermasterData(err));
	}
};

export const GetAllPapermasterRequest = (queryStr) => async (dispatch, getState) => {
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
		const { data } = await GetAllPapermastersAPI(config, queryStr);
		const { statusCode, data: QueData } = data;

		if (statusCode === 200) {
			dispatch(handleAllGetPapermasterData(QueData));
		}
	} catch (err) {
		dispatch(handleErrorAllGetPapermasterData(err));
	}
};

export const EditPapermasterRequest = (reqData) => async (dispatch, getState) => {
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
		const { data } = await EditPapermasterAPI(reqData, config);
		const { statusCode } = data;

		if (statusCode === 200) {
			dispatch(handleEditPapermasterData(data.data));
			toast.success('Updated Paper master Sucessfully!');
		}
	} catch (error) {
		if (error.response && error.response.data.errors) {
			return dispatch(handleErrorPapermasterData(error.response.data.errors));
		} else {
			return dispatch(handleErrorPapermasterData(error.message));
		}
	}
};

export const DeletePapermasterRequest = (id) => async (dispatch, getState) => {
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
		const { data } = await DeletePapermasterAPI(id, config);
		const { statusCode } = data;

		if (statusCode === 200) {
			dispatch(handleDeletePapermasterData());
		}
	} catch (err) {
		dispatch(handleErrorDeletePapermasterData(err));
	}
};

export const MultipalDeletePapermasterRequest = (MultiData) => async (dispatch, getState) => {
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
		const { data } = await MultipalDeletePapermasterAPI(MultiData, config);

		const { statusCode } = data;

		if (statusCode === 200) {
			dispatch(handleMultipalDeletePapermasterData(MultiData));
		}
	} catch (err) {
		dispatch(handleErrorMultipalDeletePapermasterData(err));
	}
};

// export const GetAllSubjectNameRequest = (subjectString) => async (dispatch, getState) => {
// 	dispatch(setLoading());
// 	try {
// 		const config = {
// 			headers: {
// 				'Content-Type': 'application/json',
// 				'Access-Control-Allow-Origin': '*',
// 				'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
// 				Authorization: getState()?.auth?.Token,
// 			},
// 		};
// 		const { data } = await GetAllSubjectNameAPI(subjectString, config);

// 		const { statusCode, error, errors, data: SubjectData } = data;

// 		if (error) {
// 			dispatch(handleErrorAllGetSubjectData(errors));
// 		}
// 		if (statusCode === 200) {
// 			dispatch(handleAllGetSubjectData(SubjectData));
// 		}
// 	} catch (err) {
// 		dispatch(handleErrorAllGetSubjectData(err));
// 	}
// };
