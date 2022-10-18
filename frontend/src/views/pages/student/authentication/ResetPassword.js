import { useSkin } from '@hooks/useSkin';
import { Link, useHistory } from 'react-router-dom';
import { ChevronLeft } from 'react-feather';
import InputPasswordToggle from '@components/input-password-toggle';
import {
	Row,
	Col,
	CardTitle,
	CardText,
	Form,
	FormGroup,
	Label,
	Button,
	InputGroup,
} from 'reactstrap';
import '@styles/base/pages/page-auth.scss';
import logoOncourse from '@src/assets/images/logo/logo-oncourse_.png';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { StudentResetPasswordRequest, handleResetAuth } from '../../../../redux/authSlice';

const ResetPassword = () => {
	const { resetPassData, error } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const history = useHistory();
	const [skin, setSkin] = useSkin();
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const illustration = skin === 'dark' ? 'reset-password-2.jpg' : 'reset-password-2.jpg',
		source = require(`@src/assets/images/pages/${illustration}`).default;

	let token = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1];

	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(StudentResetPasswordRequest({ token, password, confirmPassword }));
	};

	useEffect(() => {
		if (error !== null) {
			toast.error(error?.error);
		}
		if (resetPassData !== null) {
			toast.success('Your password is successfully changed');
			history.push('/login');
			dispatch(handleResetAuth());
		}
	}, [error, resetPassData]);
	return (
		<div className="auth-wrapper auth-v2">
			<Row className="auth-inner m-0">
				<Link className="brand-logo" to="/" onClick={(e) => e.preventDefault()}>
					<img src={logoOncourse} alt="logo" />
				</Link>
				<Col className="d-none d-lg-flex align-items-center p-5 bg-image-main" lg="8" sm="12">
					<div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
						<img className="img-fluid img__fuild" src={source} alt="Login V2" />
					</div>
				</Col>
				<Col className="d-flex align-items-center auth-bg px-2 p-lg-5" lg="4" sm="12">
					<Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
						<CardTitle tag="h2" className="font-weight-bold mb-1">
							Reset Password 🔒
						</CardTitle>
						<CardText className="mb-2">
							Your new password must be different from previously used passwords
						</CardText>
						<Form className="auth-reset-password-form mt-2" onSubmit={onSubmit}>
							<FormGroup>
								<Label className="form-label" for="password">
									New Password
								</Label>
								<InputGroup
									className={error?.password ? 'is-invalid input-group-merge' : 'input-group-merge'}
								>
									<InputPasswordToggle
										className={error && error.password ? 'is-invalid' : ''}
										value={password}
										id="password"
										name="password"
										onChange={(e) => setPassword(e.target.value)}
									/>
								</InputGroup>
								{error?.password ? <small className="error">{error?.password}</small> : null}
							</FormGroup>
							<FormGroup>
								<Label className="form-label" for="confirmpassword">
									Confirm Password
								</Label>
								<InputGroup
									className={
										error?.confirmPassword ? 'is-invalid input-group-merge' : 'input-group-merge'
									}
								>
									<InputPasswordToggle
										className={error && error.confirmPassword ? 'is-invalid' : ''}
										value={confirmPassword}
										id="confirmPassword"
										name="confirmPassword"
										onChange={(e) => setConfirmPassword(e.target.value)}
									/>
								</InputGroup>
								{error?.confirmPassword ? (
									<small className="error">{error?.confirmPassword}</small>
								) : null}
							</FormGroup>
							<Button.Ripple type="submit" color="primary" className="main-color-btn" block>
								Set New Password
							</Button.Ripple>
						</Form>
						<p className="text-center mt-2">
							<Link to="/login">
								<ChevronLeft className="mr-25 link-text" size={14} />
								<span className="align-middle link-text">Back to login</span>
							</Link>
						</p>
					</Col>
				</Col>
			</Row>
		</div>
	);
};

export default ResetPassword;
