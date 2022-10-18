import { isUserLoggedIn } from '@utils';
import { useState, useContext } from 'react';
import { useSkin } from '@hooks/useSkin';
import { ChevronLeft } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
import {
	Row,
	Col,
	CardTitle,
	CardText,
	Form,
	FormGroup,
	Label,
	Input,
	Button,
	InputGroup,
} from 'reactstrap';
import '@styles/base/pages/page-auth.scss';
import { StudentForgotPasswordRequest } from '../../../../redux/authSlice';
import logoOncourse from '@src/assets/images/logo/logo-oncourse_.png';
import { AbilityContext } from '@src/utility/context/Can';

const ForgotPassword = () => {
	const [skin, setSkin] = useSkin();
	const { error } = useSelector((state) => state.auth);
	const ability = useContext(AbilityContext);
	const dispatch = useDispatch();
	const history = useHistory();
	const [email, setEmail] = useState('');
	const illustration = skin === 'dark' ? 'forgot-password-2.jpg' : 'forgot-password-2.jpg',
		source = require(`@src/assets/images/pages/${illustration}`).default;

	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(StudentForgotPasswordRequest({ username: email }));
	};

	if (!isUserLoggedIn()) {
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
								Forgot Password? 🔒
							</CardTitle>
							<CardText className="mb-2">
								Enter your email and we'll send you instructions to reset your password
							</CardText>
							<Form className="auth-forgot-password-form mt-2" onSubmit={onSubmit}>
								<FormGroup>
									<Label className="form-label" for="login-email">
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
											type="email"
											id="email"
											placeholder="john@example.com"
											onChange={(e) => setEmail(e.target.value)}
											autoFocus
										/>
									</InputGroup>
									{error?.error || error?.username ? (
										<small className="error">{error?.error || error?.username}</small>
									) : null}
								</FormGroup>
								<Button.Ripple type="submit" color="primary" className="main-color-btn" block>
									Send reset link
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
	} else {
		return <Redirect to="/" />;
	}
};

export default ForgotPassword;
