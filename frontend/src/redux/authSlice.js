import { createSlice } from '@reduxjs/toolkit';
import jwt from 'jsonwebtoken';

import { toast } from 'react-toastify';
// import useJwt from '@src/auth/jwt/useJwt';
import {
	AdminLoginAPI,
	StudentLoginAPI,
	StudentLogoutAPI,
	StudentForgotPasswordAPI,
	StudentResetPasswordAPI,
	StudentRegisterAPI,
	StudentProfileUpdateAPI,
	StudentGetProfileAPI,
	GetAllCountryNameAPI,
	GetAllStateNameAPI,
	GetAllCityNameAPI,
} from '../services/api';

// const config = useJwt.jwtConfig;

const accessToken = JSON.parse(localStorage.getItem('accessToken'));

export const authSlice = createSlice({
	name: 'auth',
	initialState: {
		isLoading: false,
		userData: null,
		Token: accessToken ? accessToken : null,
		abilityData: null,
		error: null,
		resetPassData: null,
		forgotPassData: null,
		registerData: null,
		profileUpdateData: null,
		getStudent: null,
		countryData: null,
		stateData: null,
		cityData: null,
	},
	reducers: {
		setLoading: (state) => {
			state.isLoading = true;
		},
		handleSuccessLogin: (state, action) => {
			const userData = action.payload?.Admin_Details
				? action.payload.Admin_Details
				: action.payload.Student_Details;
			state.isLoading = false;
			state.userData = userData;
			state.Token = action.payload?.Token;
			state.abilityData = action.payload?.ability;
			localStorage.setItem('abilityData', JSON.stringify(action.payload?.ability));
			localStorage.setItem('userData', JSON.stringify(userData));
			localStorage.setItem('accessToken', JSON.stringify(action.payload?.Token));
		},
		handleErrorLogin: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
		handleLogout: (state) => {
			state.isLoading = false;
			state.error = null;
			state.userData = null;
			state.Token = null;
			localStorage.clear();
		},

		handleStudentLogout: (state) => {
			state.isLoading = false;
			state.error = null;
			state.userData = null;
			state.Token = null;
			localStorage.clear();
		},
		handleResetAuth: (state) => {
			state.isLoading = false;
			state.error = null;
			state.userData = null;
			state.resetPassData = null;
			state.forgotPassData = null;
			state.registerData = null;
			state.profileUpdateData = null;
			state.getStudent = null;
			state.stateData = null;
			state.countryData = null;
			state.cityData = null;
		},
		handleForgotPassword: (state, action) => {
			state.isLoading = false;
			state.forgotPassData = action.payload;
		},
		handleResetPassword: (state, action) => {
			state.isLoading = false;
			state.resetPassData = action.payload;
		},
		handleStudentRegister: (state, action) => {
			state.isLoading = false;
			state.registerData = action.payload;
		},
		handleErrorRegister: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
		handleStudentProfileUpdateData: (state, action) => {
			state.isLoading = false;
			state.profileUpdateData = action.payload;
			localStorage.setItem('userData', JSON.stringify(action.payload));
		},
		handleErrorStudentProfileUpdateData: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
		handleGetStudentByIdData: (state, action) => {
			state.getStudent = action.payload;
			state.isLoading = false;
		},
		handleErrorGetStudentByIdData: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
		handleAllGetCountryData: (state, action) => {
			state.countryData = action.payload;
			state.isLoading = false;
		},
		handleErrorAllGetCountryData: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
		handleAllGetStateData: (state, action) => {
			state.stateData = action.payload;
			state.isLoading = false;
		},
		handleErrorAllGetStateData: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
		handleAllGetCityData: (state, action) => {
			state.cityData = action.payload;
			state.isLoading = false;
		},
		handleErrorAllGetCityData: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
	},
});

export const {
	handleSuccessLogin,
	handleErrorLogin,
	setLoading,
	handleLogout,
	handleResetAuth,
	handleStudentLogout,
	handleForgotPassword,
	handleResetPassword,
	handleErrorRegister,
	handleStudentRegister,
	handleStudentProfileUpdateData,
	handleErrorStudentProfileUpdateData,
	// handleGetStudentByIdData,
	// // handleErrorGetSubjectByIdData,
	// handleErrorGetStudentByIdData,
	handleGetStudentData,
	handleErrorGetStudentData,
	handleEditStudentData,
	handleErrorEditStudentData,
	handleGetStudentByIdData,
	handleErrorGetStudentByIdData,
	handleAllGetCountryData,
	handleErrorAllGetCountryData,
	handleAllGetStateData,
	handleErrorAllGetStateData,
	handleAllGetCityData,
	handleErrorAllGetCityData,
} = authSlice.actions;

export default authSlice.reducer;

export const AdminLoginRequest = (userData) => async (dispatch) => {
	dispatch(setLoading());
	try {
		const { data } = await AdminLoginAPI(userData);
		const { statusCode } = data;
		if (statusCode === 200) {
			dispatch(handleSuccessLogin(data.data));
		}
	} catch (error) {
		if (error.response && error.response.data.errors) {
			return dispatch(handleErrorLogin(error.response.data.errors));
		} else {
			return dispatch(handleErrorLogin(error.message));
		}
	}
};

export const StudentLoginRequest = (userData) => async (dispatch) => {
	dispatch(setLoading());
	try {
		const { data } = await StudentLoginAPI(userData);

		const { statusCode } = data;
		if (statusCode === 200) {
			dispatch(handleSuccessLogin(data.data));
		}
	} catch (error) {
		if (error.response && error.response.data.errors) {
			return dispatch(handleErrorLogin(error.response.data.errors));
		} else {
			return dispatch(handleErrorLogin(error.message));
		}
	}
};

export const StudentLogoutRequest = () => async (dispatch, getState) => {
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
		const { data } = await StudentLogoutAPI({ logout: true }, config);
		const { statusCode } = data;
		if (statusCode === 200) {
			toast.success('You have successfully logged out.');
			dispatch(handleStudentLogout());
			window.location.reload();
		}
	} catch (error) {
		if (error.response && error.response.data.errors) {
			return dispatch(handleErrorLogin(error.response.data.errors));
		} else {
			return dispatch(handleErrorLogin(error.message));
		}
	}
};

export const StudentForgotPasswordRequest = (userData) => async (dispatch) => {
	dispatch(setLoading());
	try {
		const { data } = await StudentForgotPasswordAPI(userData);
		const { statusCode } = data;
		if (statusCode === 200) {
			toast.success('Check your email for new password');
			dispatch(handleForgotPassword(data));
		}
	} catch (error) {
		if (error.response && error.response.data.errors) {
			return dispatch(handleErrorLogin(error.response.data.errors));
		} else {
			return dispatch(handleErrorLogin(error.message));
		}
	}
};

export const StudentResetPasswordRequest = (userData) => async (dispatch) => {
	dispatch(setLoading());
	try {
		const { data } = await StudentResetPasswordAPI(userData);

		const { statusCode } = data;
		if (statusCode === 200) {
			dispatch(handleResetPassword(data));
		}
	} catch (error) {
		if (error.response && error.response.data.errors) {
			return dispatch(handleErrorLogin(error.response.data.errors));
		} else {
			return dispatch(handleErrorLogin(error.message));
		}
	}
};

export const StudentRegisterRequest = (userData) => async (dispatch) => {
	dispatch(setLoading());
	try {
		const { data } = await StudentRegisterAPI(userData);

		const { statusCode } = data;
		if (statusCode === 201) {
			toast.success('Your registration is successfully ');
			dispatch(handleStudentRegister(data));
		}
	} catch (error) {
		if (error.response && error.response.data.errors) {
			return dispatch(handleErrorRegister(error.response.data.errors));
		} else {
			return dispatch(handleErrorRegister(error.message));
		}
	}
};

export const StudentProfileUpdateRequest = (updatedData) => async (dispatch, getState) => {
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
		// var token = config.headers.Authorization.split(' ')[1];
		// const decoded = jwt.verify(token, 'thisistheshubhamprojectdontdoenythinginthisproject');
		// updatedData['_id'] = decoded['id'];
		// console.log(decoded, 'decoded');

		const { data } = await StudentProfileUpdateAPI(updatedData, config);
		const { statusCode } = data;
		if (statusCode === 200) {
			toast.success('Your Profile is successfully Updated ');
			dispatch(handleStudentProfileUpdateData(data.data));
		}
	} catch (error) {
		if (error.response && error.response.data.errors) {
			return dispatch(handleErrorStudentProfileUpdateData(error.response.data.errors));
		} else {
			return dispatch(handleErrorStudentProfileUpdateData(error.message));
		}
	}
};

export const GetStudentProfileByIdRequest = () => async (dispatch, getState) => {
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

		var token = config.headers.Authorization.split(' ')[1];
		const decoded = jwt.verify(token, 'thisistheshubhamprojectdontdoenythinginthisproject');
		// reqData['_id'] = decoded['id'];

		const { data } = await StudentGetProfileAPI(decoded.id, config);
		// console.log(id, ':data');
		const { statusCode } = data;

		if (statusCode === 200) {
			dispatch(handleGetStudentByIdData(data.data));
		}
	} catch (error) {
		if (error.response && error.response.data.errors) {
			return dispatch(handleErrorGetStudentByIdData(error.response.data.errors));
		} else {
			return dispatch(handleErrorGetStudentByIdData(error.message));
		}
	}
};
export const GetAllCountryNameRequest = () => async (dispatch, getState) => {
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
		const { data } = await GetAllCountryNameAPI(config);

		const { statusCode, error, errors, data: CountryData } = data;

		if (error) {
			dispatch(handleErrorAllGetCountryData(errors));
		}
		if (statusCode === 200) {
			dispatch(handleAllGetCountryData(CountryData));
		}
	} catch (err) {
		dispatch(handleErrorAllGetCountryData(err));
	}
};

export const GetAllStateNameRequest = (countryname) => async (dispatch, getState) => {
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
		const { data } = await GetAllStateNameAPI(countryname, config);

		const { statusCode, error, errors, data: StateData } = data;

		if (error) {
			dispatch(handleErrorAllGetStateData(errors));
		}
		if (statusCode === 200) {
			dispatch(handleAllGetStateData(StateData));
		}
	} catch (err) {
		dispatch(handleErrorAllGetStateData(err));
	}
};
export const GetAllCityNameRequest = (statename) => async (dispatch, getState) => {
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
		const { data } = await GetAllCityNameAPI(statename, config);

		const { statusCode, error, errors, data: CityData } = data;

		if (error) {
			dispatch(handleErrorAllGetCityData(errors));
		}
		if (statusCode === 200) {
			dispatch(handleAllGetCityData(CityData));
		}
	} catch (err) {
		dispatch(handleErrorAllGetCityData(err));
	}
};
