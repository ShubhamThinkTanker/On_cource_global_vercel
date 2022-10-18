import { Fragment, useEffect, useState } from 'react';
import { useSkin } from '@hooks/useSkin';
import { useDispatch, useSelector } from 'react-redux';
import {
	Row,
	Col,
	CardTitle,
	CardText,
	FormGroup,
	Label,
	Button,
	Form,
	Input,
	CustomInput,
	InputGroup,
} from 'reactstrap';

import '@styles/base/pages/page-auth.scss';
import logoOncourse from '@src/assets/images/logo/logo-oncourse_.png';
import logoUprep from '@src/assets/images/logo/logo-uprep.png';
import { Link, useHistory } from 'react-router-dom';
import { handleResetAuth, StudentRegisterRequest } from '../../../../redux/authSlice';

const Register = () => {
	const { error, registerData } = useSelector((state) => state.auth);
	const [skin, setSkin] = useSkin();
	const history = useHistory();
	const dispatch = useDispatch();
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [terms, setTerms] = useState(false);

	const illustration = skin === 'dark' ? 'register-2.jpg' : 'register-2.jpg',
		source = require(`@src/assets/images/pages/${illustration}`).default;

	const Terms = () => {
		return (
			<Fragment>
				I agree to
				<a className="ml-25" href="/" onClick={(e) => e.preventDefault()}>
					privacy policy & terms
				</a>
			</Fragment>
		);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(StudentRegisterRequest({ username, email }));
	};
	useEffect(() => {
		if (registerData !== null) {
			history.push('/login');
			dispatch(handleResetAuth());
		}
	}, [registerData]);

	return (
		<div className="auth-wrapper auth-v2">
			<Row className="auth-inner m-0">
				<Link className="brand-logo" to="/" onClick={(e) => e.preventDefault()}>
					<img src={logoUprep} alt="logo" />
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
							Welcome to Uprep! 👋
						</CardTitle>
						<CardText className="mb-2">Please register your account and start !!</CardText>
						<Form className="auth-register-form mt-2" onSubmit={onSubmit}>
							<FormGroup>
								<Label className="form-label" for="username">
									Full Name
								</Label>
								<InputGroup
									className={
										error && error.username ? 'is-invalid input-group-merge' : 'input-group-merge'
									}
								>
									<Input
										autoFocus
										type="text"
										value={username}
										className={error?.error || error?.username ? 'is-invalid' : ''}
										placeholder="johndoe"
										id="register-username"
										name="username"
										onChange={(e) => setUsername(e.target.value)}
									/>
								</InputGroup>
								{error && error.username ? <small className="error">{error.username}</small> : null}
							</FormGroup>
							<FormGroup>
								<Label className="form-label" for="email">
									Email
								</Label>
								<InputGroup
									className={
										error && error.email ? 'is-invalid input-group-merge' : 'input-group-merge'
									}
								>
									<Input
										className={error?.error || error?.email ? 'is-invalid' : ''}
										type="email"
										value={email}
										id="register-email"
										name="email"
										onChange={(e) => setEmail(e.target.value)}
										placeholder="john@example.com"
									/>
								</InputGroup>
								{error && error.email ? <small className="error">{error.email}</small> : null}
							</FormGroup>
							<FormGroup>
								<CustomInput
									type="checkbox"
									id="terms"
									name="terms"
									value="terms"
									label={<Terms />}
									className="custom-control-Primary"
									onChange={(e) => setTerms(e.target.checked)}
								/>
							</FormGroup>
							<Button.Ripple type="submit" block className="main-color-btn" color="primary">
								Sign up
							</Button.Ripple>
						</Form>
						<p className="text-center mt-2">
							<span className="mr-25">Already have an account?</span>
							<Link to="/login">
								<span className="link-text">Sign in</span>
							</Link>
						</p>
					</Col>
				</Col>
			</Row>
		</div>
	);
};

export default Register;
