import { Fragment, useEffect, useState } from 'react';
import { Trash2 } from 'react-feather';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Lock, User, Share2 } from 'react-feather';
import {
	Button,
	Label,
	Row,
	Col,
	Card,
	CardBody,
	Input,
	FormGroup,
	Form,
	InputGroup,
	InputGroupText,
	InputGroupAddon,
} from 'reactstrap';

import 'react-toastify/dist/ReactToastify.css';

import BreadCrumbs from '@components/breadcrumbs';

// import BreadCrumbs from '../../../@core/components/breadcrumbs';

const ChangePassword = () => {
	const [activeTab, setActiveTab] = useState('1');
	// ** Function to toggle tabs
	const toggle = (tab) => setActiveTab(tab);
	return (
		<>
			<div>
				<BreadCrumbs breadCrumbTitle="Account Setting " breadCrumbActive="Account Setting" />
			</div>

			<Card>
				<CardBody>
					<h3>Change Password</h3>
					<hr />

					<Form>
						<Row>
							<Col sm="6">
								<FormGroup>
									<Label className="form-label" for="login-password">
										Current Password
									</Label>
									<InputGroup className="input-group-merge">
										<InputGroupAddon addonType="prepend">
											<InputGroupText>
												<Lock size={15} />
											</InputGroupText>
										</InputGroupAddon>
										<Input
											className="input-group-merge form-control"
											id="login-password"
											placeholder="Enter Current Password"
										/>
										<InputGroupAddon addonType="append">
											<InputGroupText className="cursor-pointer"></InputGroupText>
										</InputGroupAddon>
									</InputGroup>
								</FormGroup>
							</Col>

							<Col sm="6">
								<FormGroup>
									<Label className="form-label" for="login-password">
										New Password
									</Label>
									<InputGroup className="input-group-merge">
										<InputGroupAddon addonType="prepend">
											<InputGroupText>
												<Lock size={15} />
											</InputGroupText>
										</InputGroupAddon>
										<Input
											className="input-group-merge form-control"
											id="login-password"
											placeholder="Enter New Password"
										/>
										<InputGroupAddon addonType="append">
											<InputGroupText className="cursor-pointer"></InputGroupText>
										</InputGroupAddon>
									</InputGroup>
								</FormGroup>
							</Col>

							<Col sm="6">
								<FormGroup>
									<Label className="form-label" for="login-password">
										Retype New Password
									</Label>
									<InputGroup className="input-group-merge">
										<InputGroupAddon addonType="prepend">
											<InputGroupText>
												<Lock size={15} />
											</InputGroupText>
										</InputGroupAddon>
										<Input
											className="input-group-merge form-control"
											id="login-password"
											placeholder="Enter Retype New Password"
										/>
										<InputGroupAddon addonType="append">
											<InputGroupText className="cursor-pointer"></InputGroupText>
										</InputGroupAddon>
									</InputGroup>
								</FormGroup>
							</Col>

							<p>
								<b>Password requirements</b>
							</p>

							<ul>
								<li>Minimum 8 characters long - the more, the better</li>
								<li>At least one lowercase character</li>
								<li> At least one number, symbol, or whitespace character</li>
							</ul>

							<Col className="mt-2" sm="12">
								<Button.Ripple type="submit" className="mr-1" color="primary">
									Save changes
								</Button.Ripple>
							</Col>
						</Row>
					</Form>
				</CardBody>
			</Card>
		</>
	);
};
export default ChangePassword;
