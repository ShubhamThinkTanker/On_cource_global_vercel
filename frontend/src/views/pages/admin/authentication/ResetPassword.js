import { useSkin } from '@hooks/useSkin';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'react-feather';
import InputPassword from '@components/input-password-toggle';
import { Row, Col, CardTitle, CardText, Form, FormGroup, Label, Button } from 'reactstrap';
import '@styles/base/pages/page-auth.scss';
import logoOncourse from '@src/assets/images/logo/logo-oncourse_.png';

const ResetPassword = () => {
	const [skin, setSkin] = useSkin();

	const illustration = skin === 'dark' ? 'reset-password-2.jpg' : 'reset-password-2.jpg',
		source = require(`@src/assets/images/pages/${illustration}`).default;

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
							Reset Password 🔒
						</CardTitle>
						<CardText className="mb-2">
							Your new password must be different from previously used passwords
						</CardText>
						<Form className="auth-reset-password-form mt-2" onSubmit={(e) => e.preventDefault()}>
							<FormGroup>
								<Label className="form-label" for="new-password">
									New Password
								</Label>
								<InputPassword className="input-group-merge" id="new-password" autoFocus />
							</FormGroup>
							<FormGroup>
								<Label className="form-label" for="confirm-password">
									Confirm Password
								</Label>

								<InputPassword className="input-group-merge" id="confirm-password" />
							</FormGroup>
							<Button.Ripple color="primary" className="main-color-btn" block>
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
