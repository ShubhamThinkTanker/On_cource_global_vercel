import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
	GetAllSubjectAPI,
	CreateSubjectAPI,
	SubjectDeleteAPI,
	SubjectGetByIdAPI,
	SubjectMultipleDeleteAPI,
	SubjectEditByIdAPI,
} from '../services/api';

const initialState = {
	isLoading: false,
	subjectData: null,
	createdSubject: null,
	deletedSubject: null,
	deletedAllSubject: null,
	editSubject: null,
	getSubject: null,
	error: null,
	isAddModalShow: false,
	isEditModalShow: false,
	isSubjectCardOpen: false,
};

export const subjectSlice = createSlice({
	name: 'subject',
	initialState,
	reducers: {
		setLoading: (state) => {
			state.isLoading = true;
		},
		handleAllGetSubjectData: (state, action) => {
			state.subjectData = action.payload;
			state.isLoading = false;
		},
		handleErrorAllGetSubjectData: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
		handleCreateSubjectData: (state, action) => {
			state.createdSubject = action.payload;
			state.isLoading = false;
		},
		handleErrorCreateSubjectData: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
		handleEditSubjectData: (state, action) => {
			state.editSubject = action.payload;
			state.isLoading = false;
		},
		handleErrorEditSubjectData: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
		handleGetSubjectByIdData: (state, action) => {
			state.getSubject = action.payload;
			state.isLoading = false;
		},
		handleErrorGetSubjectByIdData: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
		handleDeleteSubjectData: (state, action) => {
			state.isLoading = false;
			state.deletedSubject = action.payload;
		},
		handleErrorDeleteSubjectData: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
		handleDeleteAllSubjectData: (state, action) => {
			state.isLoading = false;
			state.deletedAllSubject = action.payload;
		},
		handleErrorDeleteAllSubjectData: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
		handleResetSubjectData: (state) => {
			state.isLoading = false;
			state.error = null;
			state.createdSubject = null;
			state.deletedSubject = null;
			state.deletedAllSubject = null;
			state.editSubject = null;
			state.getSubject = null;
		},
		toggleAddModal: (state, action) => {
			state.isAddModalShow = action.payload;
		},
		toggleEditModal: (state, action) => {
			state.isEditModalShow = action.payload;
		},
		toggleSubjectCard: (state, action) => {
			state.isSubjectCardOpen = action.payload;
		},
	},
});

export const {
	setLoading,
	handleAllGetSubjectData,
	handleErrorAllGetSubjectData,
	handleCreateSubjectData,
	handleErrorCreateSubjectData,
	handleDeleteSubjectData,
	handleErrorDeleteSubjectData,
	handleErrorGetSubjectByIdData,
	handleGetSubjectByIdData,
	handleEditSubjectData,
	handleErrorEditSubjectData,
	handleDeleteAllSubjectData,
	handleErrorDeleteAllSubjectData,
	handleResetSubjectData,
	toggleAddModal,
	toggleEditModal,
	toggleSubjectCard,
} = subjectSlice.actions;

export default subjectSlice.reducer;

export const GetAllSubjectRequest = (queryString) => async (dispatch, getState) => {
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
		const { data } = await GetAllSubjectAPI(queryString, config);

		const { statusCode } = data;
		if (statusCode === 200) {
			dispatch(handleAllGetSubjectData(data.data));
		}
	} catch (error) {
		if (error.response && error.response.data.errors) {
			return dispatch(handleErrorAllGetSubjectData(error.response.data.errors));
		} else {
			return dispatch(handleErrorAllGetSubjectData(error.message));
		}
	}
};

export const CreateSubjectRequest = (createdData) => async (dispatch, getState) => {
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
		const { data } = await CreateSubjectAPI(createdData, config);
		const { statusCode } = data;

		if (statusCode === 201) {
			dispatch(toggleAddModal(false));
			dispatch(handleCreateSubjectData(data.data));
			toast.success('New Subject Created Sucessfully!');
		}
	} catch (error) {
		if (error.response && error.response.data.errors) {
			return dispatch(handleErrorCreateSubjectData(error.response.data.errors));
		} else {
			return dispatch(handleErrorCreateSubjectData(error.message));
		}
	}
};

export const GetSubjectByIdRequest = (id) => async (dispatch, getState) => {
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
		const { data } = await SubjectGetByIdAPI(id, config);
		const { statusCode } = data;

		if (statusCode === 200) {
			dispatch(handleGetSubjectByIdData(data.data));
		}
	} catch (error) {
		if (error.response && error.response.data.errors) {
			return dispatch(handleErrorGetSubjectByIdData(error.response.data.errors));
		} else {
			return dispatch(handleErrorGetSubjectByIdData(error.message));
		}
	}
};

export const SubjectEditRequest = (editedData) => async (dispatch, getState) => {
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
		const { data } = await SubjectEditByIdAPI(editedData, config);
		const { statusCode } = data;

		if (statusCode === 200) {
			dispatch(toggleEditModal(false));
			dispatch(handleEditSubjectData(data.data));
			toast.success('Subject Updated Sucessfully!');
		}
	} catch (error) {
		if (error.response && error.response.data.errors) {
			return dispatch(handleErrorEditSubjectData(error.response.data.errors));
		} else {
			return dispatch(handleErrorEditSubjectData(error.message));
		}
	}
};

export const DeleteSubjectRequest = (deletedData) => async (dispatch, getState) => {
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
		const { data } = await SubjectDeleteAPI(deletedData, config);
		const { statusCode } = data;

		if (statusCode === 200) {
			dispatch(handleDeleteSubjectData(data.data));
		}
	} catch (error) {
		if (error.response && error.response.data.errors) {
			return dispatch(handleErrorDeleteSubjectData(error.response.data.errors));
		} else {
			return dispatch(handleErrorDeleteSubjectData(error.message));
		}
	}
};

export const DeleteAllSubjectRequest = (deletedMultiData) => async (dispatch, getState) => {
	dispatch(setLoading());
	console.log(deletedMultiData, ':deletedMultiData');
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
				Authorization: getState()?.auth?.Token,
			},
		};
		const { data } = await SubjectMultipleDeleteAPI(deletedMultiData, config);
		const { statusCode } = data;

		if (statusCode === 200) {
			dispatch(handleDeleteAllSubjectData(data.data));
		}
	} catch (error) {
		if (error.response && error.response.data.errors) {
			return dispatch(handleErrorDeleteAllSubjectData(error.response.data.errors));
		} else {
			return dispatch(handleErrorDeleteAllSubjectData(error.message));
		}
	}
};
