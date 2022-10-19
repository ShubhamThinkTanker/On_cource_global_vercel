import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { handleLogin } from '@store/actions/auth';
import Select from 'react-select';
import { Link, useHistory, useParams } from 'react-router-dom';

import {
	Row,
	Col,
	CardTitle,
	Label,
	Button,
	Form,
	Input,
	CustomInput,
	Media,
	Card,
	CardHeader,
	CardBody,
	Nav,
	NavItem,
	NavLink,
	TabContent,
	TabPane,
	InputGroup,
} from 'reactstrap';
import '@styles/base/pages/page-auth.scss';
import BreadCrumbs from '@components/breadcrumbs';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { selectThemeColors } from '@utils';
import {
	GetAllCityNameRequest,
	GetAllCountryNameRequest,
	GetAllStateNameRequest,
	GetStudentProfileByIdRequest,
	handleResetAuth,
	StudentProfileUpdateRequest,
} from '../../../../redux/authSlice';

import InputPasswordToggle from '@components/input-password-toggle';
import { studentChangePasswordRequest, handelResetData } from '../../../../redux/studentSlice';
import { User, Lock } from 'react-feather';

const Profile = () => {
	const { id } = useParams();
	const history = useHistory();
	const dispatch = useDispatch();
	const [activeTab, setActiveTab] = useState('1');
	const { isLoading: getStudentData, getStudent } = useSelector((state) => state.auth);
	const { changePasswordData } = useSelector((state) => state.student);
	const { profileUpdateData, countryData, stateData, cityData, error } = useSelector(
		(state) => state.auth
	);

	// ** Function to toggle tabs
	const toggle = (tab) => setActiveTab(tab);

	const [img, setImg] = useState(null);
	const [country, setCountry] = useState({});
	const [state, setState] = useState({});
	const [city, setCity] = useState({});
	console.log(values?.profile_image, 'profile_image');
	const [values, setValues] = useState({
		profile_image: getStudent?.profile_image,
		username: getStudent?.username,
		name: getStudent?.name,
		email: getStudent?.email,
		mobile_no: getStudent?.mobile_no,
		gender: getStudent?.gender,
		status: getStudent?.state,
		birth_date: getStudent?.birth_date,
		street_add1: getStudent?.street_add1,
		street_add2: getStudent?.street_add2,
		city: getStudent?.city,
		state: getStudent?.state,
		zip: getStudent?.zip,
		country: getStudent?.country,
	});

	const [form, setForm] = useState({
		current_password: '',
		new_password: '',
		confirm_password: '',
	});
	useEffect(() => {
		if (changePasswordData !== null) {
			setForm({
				current_password: '',
				new_password: '',
				confirm_password: '',
			});
			setTimeout(() => {
				history.push('/student/dashboard');
				dispatch(handelResetData());
			}, 2000);
		}
	}, [changePasswordData]);

	useEffect(() => {
		dispatch(GetStudentProfileByIdRequest(id));
	}, [dispatch]);

	useEffect(() => {
		dispatch(GetAllCountryNameRequest());
	}, []);

	useEffect(() => {
		if (profileUpdateData !== null) {
			// handleResetData();
			history.push('/student/dashboard');

			dispatch(handleResetAuth());
		}
	}, [profileUpdateData]);

	useEffect(() => {
		{
			getStudent != null &&
				getStudent != undefined &&
				setValues({
					...values,
					profile_image: getStudent && getStudent.profile_image,
					username: getStudent && getStudent.username,
					name: getStudent && getStudent.name,
					email: getStudent && getStudent.email,
					mobile_no: getStudent && getStudent.mobile_no,
					gender: getStudent && getStudent.gender,
					status: getStudent && getStudent.status,
					birth_date: getStudent && getStudent.birth_date,
					street_add1: getStudent && getStudent.street_add1,
					street_add2: getStudent && getStudent.street_add2,
					city: getStudent && getStudent.city,
					state: getStudent && getStudent.state,
					zip: getStudent && getStudent.zip,
					country: getStudent && getStudent.country,
				});
		}
		{
			getStudent != null && getStudent != undefined && setCountry(getStudent.country);
		}
		{
			getStudent != null &&
				getStudent != undefined &&
				dispatch(GetAllStateNameRequest(getStudent.country));
		}

		{
			getStudent != null && getStudent != undefined && setState(getStudent.state);
		}
		{
			getStudent != null &&
				getStudent != undefined &&
				dispatch(GetAllCityNameRequest(getStudent.state));
		}

		{
			getStudent != null && getStudent != undefined && setCity(getStudent.city);
		}
	}, [getStudent]);

	const onSubmit = async (e) => {
		e.preventDefault();
		await dispatch(StudentProfileUpdateRequest(values));
		dispatch(GetStudentProfileByIdRequest);
		history.push('/student/dashboard');
	};

	const onHandelSubmit = (e) => {
		e.preventDefault();
		dispatch(studentChangePasswordRequest(form));
	};

	const onChange = (e) => {
		const reader = new FileReader(),
			files = e.target.files;
		reader.onload = function () {
			setImg(reader.result);
			setValues({ ...values, profile_image: reader.result });
		};
		reader.readAsDataURL(files[0]);
	};

	const renderimagefun = () => {
		return (
			<img
				className="user-avatar rounded mr-2 my-25 cursor-pointer"
				src={
					img !== null
						? `${img}`
						: `http://localhost:5000/admin/upload/profileImage/${values.profile_image}`
				}
				height="90"
				width="90"
			/>
		);
	};

	return (
		<>
			<Header />
			<div className="ml-3 mt-2">
				<BreadCrumbs
					breadCrumbTitle="Account Settings"
					breadCrumbParent={<Link to="/student/dashboard">Dashboard</Link>}
				/>

				<Nav pills>
					<NavItem>
						<NavLink active={activeTab === '1'} onClick={() => toggle('1')} className="account-btn">
							<User size={14} />
							<span className="align-middle d-none d-sm-block " color="primary">
								Account
							</span>
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink active={activeTab === '2'} onClick={() => toggle('2')} className="account-btn">
							<Lock size={14} />
							<span className="align-middle d-none d-sm-block">Security</span>
						</NavLink>
					</NavItem>
				</Nav>
			</div>
			<Card className=" container">
				<CardBody className="pt-2">
					<TabContent activeTab={activeTab}>
						<TabPane tabId="1">
							<Card className="container">
								<CardHeader className="border-bottom">
									<CardTitle tag="h4">Profile Details</CardTitle>
								</CardHeader>
								<CardBody className="py-2 my-25">
									<Form className="mt-2 pt-50">
										<Col>
											<Label for="profile_image">Profile Image</Label>
											<Media className="mb-2">
												{renderimagefun()}

												<Media className="mt-50" body>
													<div className="d-flex flex-wrap mt-1 px-0">
														<Button.Ripple
															id="change-img"
															tag={Label}
															className="mr-75 mb-0"
															color="primary"
														>
															Upload
															<Input
																type="file"
																hidden
																id="change-img"
																onChange={(e) => onChange(e)}
																accept="image/*"
															/>
														</Button.Ripple>
														<Button.Ripple
															color="danger"
															outline
															onClick={() => {
																setImg(
																	'https://grandimageinc.com/wp-content/uploads/2015/09/icon-user-default.png'
																);
																setValues({
																	...values,
																	profile_image:
																		'https://grandimageinc.com/wp-content/uploads/2015/09/icon-user-default.png',
																});
															}}
														>
															Remove
														</Button.Ripple>
													</div>
													<p className="mb-0">Allowed JPG, GIF or PNG. Max size of 800kB</p>
												</Media>
											</Media>
										</Col>
										<Row>
											<Col md="6" className="mb-1">
												<Label className="form-label required" for="username">
													Username
												</Label>
												<InputGroup
													className={
														error && error.username
															? 'is-invalid input-group-merge'
															: 'input-group-merge mb-1'
													}
												>
													<Input
														className={error && error.username ? 'is-invalid' : ''}
														id="username"
														name="username"
														defaultValue={values.username}
														placeholder="username"
														onChange={(e) => {
															setValues({ ...values, username: e.target.value });
														}}
													/>
												</InputGroup>
												{error && error.username ? (
													<div className="error">
														<small>{error.username}</small>
													</div>
												) : null}
											</Col>
											<Col sm="6" className="mb-1 ">
												<Label className="form-label required" for="address">
													Address
												</Label>
												<InputGroup
													className={
														error && error.street_add1
															? 'is-invalid input-group-merge'
															: 'input-group-merge mb-1'
													}
												></InputGroup>
												<Input
													id="street_add1"
													name="street_add1"
													defaultValue={values.street_add1}
													placeholder=" Address"
													onChange={(e) => {
														setValues({ ...values, street_add1: e.target.value });
													}}
												/>
												{error && error.street_add1 ? (
													<small className="error">{error.street_add1}</small>
												) : null}
											</Col>
											<Col md="6" className="mb-1">
												<Label className="form-label required" for="Name">
													Name
												</Label>
												<InputGroup
													className={
														error && error.name
															? 'is-invalid input-group-merge'
															: 'input-group-merge mb-1'
													}
												></InputGroup>
												<Input
													id="name"
													name="name"
													placeholder="Name"
													defaultValue={values.name}
													onChange={(e) => {
														setValues({ ...values, name: e.target.value });
													}}
												/>
												{error && error.name ? <small className="error">{error.name}</small> : null}
											</Col>

											<Col md="6" className="mb-1">
												<Label className="form-label required" for="email">
													E-mail
												</Label>
												<InputGroup
													className={
														error && error.email
															? 'is-invalid input-group-merge'
															: 'input-group-merge mb-1'
													}
												></InputGroup>
												<Input
													id="emailInput"
													type="email"
													name="email"
													defaultValue={values.email}
													placeholder="Email"
													onChange={(e) => {
														setValues({ ...values, email: e.target.value });
													}}
												/>
												{error && error.email ? (
													<small className="error">{error.email}</small>
												) : null}
											</Col>
											<Col md="6" className="mb-1">
												<Label className="form-label required" for="country">
													Country
												</Label>
												<InputGroup
													className={
														error && error.country
															? 'is-invalid input-group-merge'
															: 'input-group-merge mb-1'
													}
												></InputGroup>
												<Select
													id="country"
													options={countryData && countryData}
													value={
														getStudent && countryData
															? countryData.filter((x) => x.value === country)
															: []
													}
													isClearable={false}
													name="country"
													className="react-select"
													classNamePrefix="select"
													style={{ borderLeft: 'none' }}
													theme={selectThemeColors}
													onChange={(e) => {
														setCountry(e.value);
														setValues({ ...values, country: e.value });
														dispatch(GetAllStateNameRequest(e.value));
													}}
												/>
												{error && error.country ? (
													<small className="error">{error.country}</small>
												) : null}
											</Col>

											<Col sm="6" className="mb-1 ">
												<Label className="form-label required" for="mobilename">
													Mobile Number
												</Label>
												<InputGroup
													className={
														error && error.mobile_no
															? 'is-invalid input-group-merge'
															: 'input-group-merge mb-1'
													}
												></InputGroup>
												<Input
													id="mobile_no"
													name="mobile_no"
													defaultValue={values.mobile_no}
													className="form-control"
													placeholder="1 234 567 8900"
													onChange={(e) => {
														setValues({ ...values, mobile_no: e.target.value });
													}}
												/>
												{error && error.mobile_no ? (
													<small className="error">{error.mobile_no}</small>
												) : null}
											</Col>

											<Col md="6" className="mb-1">
												<Label className="form-label required" for="state">
													State
												</Label>
												<InputGroup
													className={
														error && error.state
															? 'is-invalid input-group-merge'
															: 'input-group-merge mb-1'
													}
												></InputGroup>
												<Select
													id="state"
													name="state"
													options={stateData && stateData}
													value={
														getStudent && stateData
															? stateData.filter((x) => x.value === state)
															: []
													}
													isClearable={false}
													className="react-select"
													classNamePrefix="select"
													style={{ borderLeft: 'none' }}
													theme={selectThemeColors}
													onChange={(e) => {
														setState(e.value);
														setValues({ ...values, state: e.value });
														dispatch(GetAllCityNameRequest(e.value));
													}}
												/>
												{error && error.state ? (
													<small className="error">{error.state}</small>
												) : null}
											</Col>

											<Col sm="6" className="mb-1 ">
												<Label className="form-label required" for="dob">
													Birth Date
												</Label>
												<InputGroup
													className={
														error && error.birth_date
															? 'is-invalid input-group-merge'
															: 'input-group-merge mb-1'
													}
												></InputGroup>
												<Input
													id="birth_date"
													name="birth_date"
													defaultValue={values.birth_date}
													placeholder="Date Of Birth"
													onChange={(e) => {
														setValues({ ...values, birth_date: e.target.value });
													}}
												/>
												{error && error.birth_date ? (
													<small className="error">{error.birth_date}</small>
												) : null}
											</Col>
											<Col md="6" className="mb-1">
												<Label className="form-label required" for="service">
													City
												</Label>
												<InputGroup
													className={
														error && error.city
															? 'is-invalid input-group-merge'
															: 'input-group-merge mb-1'
													}
												></InputGroup>
												<Select
													id="city"
													name="city"
													isClearable={false}
													value={
														getStudent && cityData ? cityData.filter((x) => x.value === city) : []
													}
													className="react-select"
													classNamePrefix="select"
													style={{ borderLeft: 'none' }}
													options={cityData && cityData}
													theme={selectThemeColors}
													onChange={(e) => {
														setCity(e.value);
														setValues({ ...values, city: e.value });
													}}
												/>
												{error && error.city ? <small className="error">{error.city}</small> : null}
											</Col>
											<Col md="6" className="mb-1 ">
												<Label for="gender" className="d-block mb-1">
													Gender
												</Label>

												<CustomInput
													type="radio"
													id="male"
													defaultValue="male"
													name="gender"
													inline
													label="Male"
													// defaultChecked
													checked={values.gender === 'male' ? true : false}
													onChange={(e) => setValues({ ...values, gender: e.target.value })}
												/>
												<CustomInput
													type="radio"
													id="female"
													defaultValue="female"
													name="gender"
													inline
													label="Female"
													checked={values.gender === 'female' ? true : false}
													onChange={(e) => setValues({ ...values, gender: e.target.value })}
												/>
											</Col>

											<Col sm="6" className="mb-1">
												<Label className="form-label required" for="zipCode">
													Zip Code
												</Label>
												<InputGroup
													className={
														error && error.zip
															? 'is-invalid input-group-merge'
															: 'input-group-merge mb-1'
													}
												></InputGroup>
												<Input
													id="zipCode"
													name="zipCode"
													defaultValue={values.zip}
													placeholder="123456"
													maxLength="6"
													onChange={(e) => {
														setValues({ ...values, zip: e.target.value });
													}}
												/>
												{error && error.zip ? <small className="error">{error.zip}</small> : null}
											</Col>

											<Col className="d-flex flex-sm-row flex-column mt-2" md="12" sm="12">
												<Button.Ripple
													className="mb-1 mb-sm-0 mr-0 mr-sm-1"
													color="primary"
													onClick={onSubmit}
												>
													Updated
												</Button.Ripple>
												<Button.Ripple color="danger" tag={Link} to="/student/dashboard" outline>
													Cancel
												</Button.Ripple>
											</Col>
										</Row>
									</Form>
								</CardBody>
							</Card>
						</TabPane>
						<TabPane tabId="2">
							<Card className="container">
								<CardHeader className="border-bottom">
									<CardTitle tag="h4">Change Password</CardTitle>
								</CardHeader>
								<CardBody className="py-2 my-25">
									<Form className="mt-2 pt-50">
										<Row>
											<Col md="6" className="mb-1">
												<Label className="form-label" for="login-password">
													Current Password
												</Label>

												<InputPasswordToggle
													value={form.current_password}
													placeholder="Enter Current Password"
													name="password"
													onChange={(e) => {
														setForm({ ...form, current_password: e.target.value });
													}}
												/>
												<Col md="6" className="mb-1"></Col>
												<Label className="form-label" for="login-password">
													New Password
												</Label>

												<InputPasswordToggle
													value={form.new_password}
													placeholder="Enter New Password"
													name="password"
													onChange={(e) => {
														setForm({ ...form, new_password: e.target.value });
													}}
												/>
											</Col>

											<Col md="6" className="mb-1">
												<Label className="form-label" for="login-password">
													Retype New Password
												</Label>

												<InputPasswordToggle
													value={form.confirm_password}
													placeholder="Retype New Password"
													name="password"
													onChange={(e) => {
														setForm({ ...form, confirm_password: e.target.value });
													}}
												/>
											</Col>
											<Col className="mt-2" sm="12">
												<Button.Ripple
													type="submit"
													onClick={onHandelSubmit}
													className="mr-1"
													color="primary"
												>
													Save changes
												</Button.Ripple>
												<Button color="danger" tag={Link} to="/student/dashboard" outline>
													Cancel
												</Button>
											</Col>
										</Row>
									</Form>
								</CardBody>
							</Card>
						</TabPane>
					</TabContent>
				</CardBody>
			</Card>

			<Footer />
		</>
	);
};
export default Profile;
