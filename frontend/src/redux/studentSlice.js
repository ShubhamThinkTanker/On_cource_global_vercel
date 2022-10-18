import { createSlice } from '@reduxjs/toolkit';
import { GetAllStudentListAPI, StudentChangePasswordAPI } from '../services/api';
import { toast } from 'react-toastify';
const initialState = {
	isLoading: false,
	studentList: null,
	changePasswordData: null,
	error: null,
};

const studentSlice = createSlice({
	name: 'studentList',
	initialState,
	reducers: {
		setLoading: (state) => {
			state.isLoading = true;
		},
		handleGetAllStudents: (state, action) => {
			state.studentList = action.payload;
			state.isLoading = false;
		},
		handleErrorGetAllStudentList: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
		handleResetStudent: (state) => {
			state.isLoading = false;
			state.studentList = null;
			state.error = null;
		},
		handelResetPassword: (state) => {
			state.isLoading = false;
		},
		handelChangePassword: (state, action) => {
			state.changePasswordData = action.payload;
			state.isLoading = false;
		},
		handelChangePasswordError: (state, action) => {
			state.error = action.payload;
		},
		handelResetData: (state) => {
			(state.changePasswordData = null), (state.error = null);
		},
	},
});
export const {
	setLoading,
	handleGetAllStudents,
	handleErrorGetAllStudentList,
	handleResetStudent,
	handelResetPassword,
	handelChangePassword,
	handelChangePasswordError,
	handelResetData,
} = studentSlice.actions;

export default studentSlice.reducer;

export const GetAllStudentListRequest = (queryStr) => async (dispatch, getState) => {
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
		const { data } = await GetAllStudentListAPI(config, queryStr);
		const { statusCode, data: QueData } = data;

		if (statusCode === 200) {
			dispatch(handleGetAllStudents(QueData));
		}
	} catch (err) {
		dispatch(handleErrorGetAllStudentList(err));
	}
};

export const studentChangePasswordRequest = (form) => async (dispatch, getState) => {
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
		const { data } = await StudentChangePasswordAPI(form, config);
		const { statusCode } = data;
		if (statusCode === 200) {
			dispatch(handelChangePassword(data));
			toast.success('Your password is successfully changed');
		}
	} catch (error) {
		if (error.response && error.response.data.errors.password) {
			dispatch(handelChangePasswordError(error.response.data.errors.password));
			toast.error(error.response.data.errors.password);
		} else {
			dispatch(handelChangePasswordError(error.response.data.errors));
			toast.error(error.response.data.errors);
		}
	}
};
