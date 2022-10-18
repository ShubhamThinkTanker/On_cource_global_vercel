import { useState, useContext, Fragment, useEffect } from 'react';
import Cookie from 'cookie-universal';
import Avatar from '@components/avatar';
import { useSkin } from '@hooks/useSkin';
import { useDispatch, useSelector } from 'react-redux';
import { toast, Slide } from 'react-toastify';
import { AbilityContext } from '@src/utility/context/Can';
import { Link, useHistory } from 'react-router-dom';
import InputPasswordToggle from '@components/input-password-toggle';
import { getHomeRouteForLoggedInUser } from '@utils';
import { Coffee } from 'react-feather';
import {
	Row,
	Col,
	CardTitle,
	CardText,
	Form,
	Input,
	FormGroup,
	Label,
	CustomInput,
	Button,
	InputGroup,
} from 'reactstrap';

import '@styles/base/pages/page-auth.scss';
import { AdminLoginRequest, handleResetAuth } from '../../../../redux/authSlice';
import logoOncourse from '@src/assets/images/logo/logo-oncourse_.png';
const ToastContent = ({ name, role }) => (
	<Fragment>
		<div className="toastify-header">
			<div className="title-wrapper">
				<Avatar size="sm" color="success" icon={<Coffee size={12} />} />
				<h6 className="toast-title font-weight-bold">Welcome, {name}</h6>
			</div>
		</div>
		<div className="toastify-body">
			<span>
				You have successfully logged in as an {role} user to Vuexy. Now you can start to explore.
				Enjoy!
			</span>
		</div>
	</Fragment>
);

const Login = () => {
	const { userData, error, abilityData } = useSelector((state) => state.auth);

	const [skin, setSkin] = useSkin();
	const ability = useContext(AbilityContext);
	const dispatch = useDispatch();
	const history = useHistory();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isRemember, setIsRemember] = useState(false);
	const cookies = Cookie();
	// const { register, errors, handleSubmit } = useForm();
	// const illustration = skin === 'dark' ? 'login-v2-dark.svg' : 'login-v2.svg',
	// 	source = require(`@src/assets/images/pages/${illustration}`).default;

	const illustration = skin === 'dark' ? 'login-2.jpg' : 'login-2.jpg',
		source = require(`@src/assets/images/pages/${illustration}`).default;

	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(AdminLoginRequest({ username: email, password }));
		if (isRemember) {
			cookies.set(
				'adminData',
				{ email: email, password: password },
				{
					path: '/',
					secure: true,
					httpOnly: false,
				}
			);
		} else if (cookies.get('adminData')) {
			cookies.remove('adminData');
		}
	};

	useEffect(() => {
		if (cookies.get('adminData')) {
			setIsRemember(true);
			const cookieValue = cookies.get('adminData');
			setEmail(cookieValue.email);
			setPassword(cookieValue.password);
		}
	}, []);

	useEffect(() => {
		if (userData !== null) {
			toast.success(
				<ToastContent
					name={userData.name || userData.username || 'John Doe'}
					role={userData.role || 'admin'}
				/>,
				{
					transition: Slide,
					hideProgressBar: true,
					autoClose: 2000,
				}
			);
			ability.update(abilityData);
			setTimeout(() => {
				history.push(getHomeRouteForLoggedInUser(userData.role));
			}, 300);
		}
		return () => {
			dispatch(handleResetAuth());
		};
	}, [userData]);
	return (
		<div className="auth-wrapper auth-v2">
			<Row className="auth-inner m-0">
				<Link className="brand-logo" to="/" onClick={(e) => e.preventDefault()}>
					<img src={logoOncourse} alt="logo" />
				</Link>
				<Col className="d-none d-lg-flex align-items-center p-5 bg-image-main" lg="8" sm="12">
					<div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
						<img className="img-fluid" src={source} alt="Login V2" />
					</div>
				</Col>
				<Col className="d-flex align-items-center auth-bg px-2 p-lg-5" lg="4" sm="12">
					<Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
						<CardTitle tag="h2" className="font-weight-bold mb-1">
							Welcome to Uprep! 👋
						</CardTitle>
						<CardText className="mb-2">
							Please sign-in to your account and start the adventure
						</CardText>
						<Form className="auth-login-form mt-2" onSubmit={onSubmit}>
							<FormGroup>
								<Label className="form-label" for="email">
									Email
								</Label>
								<InputGroup
									className={
										error?.error || error?.username
											? 'is-invalid input-group-merge'
											: 'input-group-merge'
									}
								>
									<Input
										className={error?.error || error?.username ? 'is-invalid' : ''}
										autoFocus
										type="email"
										value={email}
										id="username"
										name="username"
										placeholder="john@example.com"
										onChange={(e) => setEmail(e.target.value)}
									/>
								</InputGroup>
								{error?.error || error?.username ? (
									<small className="error">{error?.error || error?.username}</small>
								) : null}
							</FormGroup>
							<FormGroup>
								<div className="d-flex justify-content-between">
									<Label className="form-label" for="password">
										Password
									</Label>
								</div>
								<InputGroup
									className={
										error && error.password ? 'is-invalid input-group-merge' : 'input-group-merge'
									}
								>
									<InputPasswordToggle
										className={error && error.password ? 'is-invalid' : ''}
										value={password}
										id="password"
										name="password"
										onChange={(e) => setPassword(e.target.value)}
									/>
								</InputGroup>
								{error && error.password ? <small className="error">{error.password}</small> : null}
							</FormGroup>
							<FormGroup>
								<CustomInput
									type="checkbox"
									className="custom-control-Primary"
									checked={isRemember}
									onChange={() => setIsRemember(!isRemember)}
									id="remember-me"
									label="Remember Me"
								/>
							</FormGroup>
							<Button.Ripple type="submit" color="primary" className="main-color-btn" block>
								Sign in
							</Button.Ripple>
						</Form>
					</Col>
				</Col>
			</Row>
		</div>
	);
};

export default Login;
