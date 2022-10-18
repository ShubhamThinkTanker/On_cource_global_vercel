import { createSlice } from '@reduxjs/toolkit';
import { CloudLightning } from 'react-feather';
import { GetAllSubjectNameStudentAPI, StudentResultAPI } from '../services/api';

const initialState = {
	isLoading: false,
	subjectData: [],
	resultData: '',
	error: '',
};

export const subjectSlice = createSlice({
	name: 'result',
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
		handleStudentResultData: (state, action) => {
			state.resultData = action.payload;
			state.isLoading = false;
		},
		handleStudentResultDataError: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
	},
});

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
		const { data } = await GetAllSubjectNameStudentAPI(queryString, config);

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

export const GetStudentResultRequest = (queryString) => async (dispatch, getState) => {
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
		const { data } = await StudentResultAPI(queryString, config);
		const { statusCode } = data;
		if (statusCode === 200) {
			dispatch(handleStudentResultData(data.data.FindResultOfStudent));
		}
	} catch (error) {
		if (error.response && error.response.data.errors) {
			dispatch(handleStudentResultDataError(error.response.data.errors));
		} else {
			dispatch(handleStudentResultDataError(error.message));
		}
	}
};

export const {
	setLoading,
	handleAllGetSubjectData,
	handleErrorAllGetSubjectData,
	handleStudentResultData,
	handleStudentResultDataError,
} = subjectSlice.actions;

export default subjectSlice.reducer;
