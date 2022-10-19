import { Link } from 'react-router-dom';
import { useEffect, useState, Fragment, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import BreadCrumbs from '@components/breadcrumbs';
import { toast } from 'react-toastify';
import Select from 'react-select';
import '@styles/react/libs/flatpickr/flatpickr.scss';
import {
	CreateInstructionsRequest,
	GetAllInstrunctionsRequest,
	GetAllSubjectNameRequest,
	handleResetInstruct,
} from '../../../../redux/instructionsSlice';
import {
	Row,
	Col,
	Card,
	FormGroup,
	CardBody,
	Form,
	Label,
	Input,
	Button,
	InputGroup,
	CustomInput,
} from 'reactstrap';

const AddInstructions = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const selectInputRef = useRef();
	const [exit, setExit] = useState(false);
	const [values, setValues] = useState({
		subject_name: '',
		total_marks: '',
		time_duration: '',
		isActive: 'active',
		description: '',
	});

	const { subjectData, createdInstructData, error } = useSelector((state) => state.instructions);

	useEffect(() => {
		dispatch(GetAllSubjectNameRequest());
		return () => {
			dispatch(handleResetInstruct());
		};
	}, [dispatch]);

	useEffect(() => {
		if (createdInstructData) {
			dispatch(GetAllInstrunctionsRequest);
			handleResetData();
		}
		if (createdInstructData && exit) {
			history.push('/admin/instructions/list');
			setExit(false);
		}
	}, [createdInstructData, exit]);

	const handleSaveAndExit = async (e) => {
		e.preventDefault();

		const createdData = {
			...values,
		};
		await dispatch(CreateInstructionsRequest(createdData));
		setExit(true);
	};

	const handleResetData = () => {
		setValues({
			subject_name: '',
			total_marks: '',
			time_duration: '',
			isActive: 'active',
			description: '',
		});
	};

	const handleSaveAndNew = async (e) => {
		e.preventDefault();
		const createdData = {
			...values,
		};
		await dispatch(CreateInstructionsRequest(createdData));
		selectInputRef.current.select.clearValue();
	};

	return (
		<Fragment>
			<BreadCrumbs
				breadCrumbTitle="Instructions"
				breadCrumbParent={<Link to="/admin/instructions/list">Instructions List</Link>}
				breadCrumbActive="Create Instructions Details"
			/>
			<Card>
				<Form>
					<CardBody>
						<Row>
							<Col md="6" sm="12">
								<FormGroup className="mb-2">
									<Label className="required" for="subject_name">
										Subject
									</Label>
									<InputGroup
										className={
											error && error.subject_name
												? 'is-invalid input-group-merge'
												: 'input-group-merge mb-1'
										}
									></InputGroup>
									<Select
										id="subject-select"
										name="subject_name"
										ref={selectInputRef}
										isClearable={false}
										options={subjectData}
										className={error && error.subject_name ? 'is-invalid' : ''}
										classNamePrefix="select"
										style={{ borderLeft: 'none' }}
										defaultValue={values.subject_name}
										onChange={(e) => setValues({ ...values, subject_name: e?.value })}
									/>
									{error && error.subject_name ? (
										<small className="error">{error.subject_name}</small>
									) : null}
								</FormGroup>
							</Col>

							<Col md="6" sm="12">
								<FormGroup className="mb-2">
									<Label for="question_marks" className="required d-block mb-2">
										Total Marks
									</Label>
									<InputGroup
										className={
											error && error.total_marks
												? 'is-invalid input-group-merge'
												: 'input-group-merge mb-1'
										}
									>
										<Input
											className={error && error.total_marks ? 'is-invalid' : ''}
											type="text"
											id="total_marks"
											name="total_marks"
											placeholder="Total Marks"
											value={values.total_marks}
											onChange={(e) => setValues({ ...values, total_marks: e.target.value })}
										/>
									</InputGroup>
									{error && error.total_marks ? (
										<small className="error">{error.total_marks}</small>
									) : null}
								</FormGroup>
							</Col>

							<Col md="6" sm="12">
								<FormGroup>
									<Label className="required">Time Duration</Label>
									<InputGroup
										className={
											error && error.time_duration
												? 'is-invalid input-group-merge'
												: 'input-group-merge mb-1'
										}
									>
										<Input
											className={error && error.time_duration ? 'is-invalid' : ''}
											type="text"
											id="time_duration"
											name="time_duration"
											placeholder="Time Duration"
											value={values.time_duration}
											onChange={(e) => setValues({ ...values, time_duration: e.target.value })}
										/>
									</InputGroup>
									{error && error.time_duration ? (
										<small className="error">{error.time_duration}</small>
									) : null}
								</FormGroup>
							</Col>

							<Col md="6" sm="12">
								<Label for="isActive" className="required d-block mb-1">
									Status
								</Label>
								<FormGroup className="mb-2">
									<CustomInput
										type="radio"
										id="active"
										name="isActive"
										inline
										defaultChecked
										label="Active"
										checked={values.isActive === 'active' ? true : false}
										defaultValue="active"
										onChange={(e) => setValues({ ...values, isActive: e.target.value })}
									/>

									<CustomInput
										type="radio"
										id="inactive"
										name="isActive"
										inline
										label="In active"
										checked={values.isActive === 'inactive' ? true : false}
										defaultValue="inactive"
										onChange={(e) => setValues({ ...values, isActive: e.target.value })}
									/>
								</FormGroup>
							</Col>

							<Col md="12" sm="12">
								<FormGroup className="mb-2">
									<Label for="description" className="required">
										Description
									</Label>

									<InputGroup
										className={
											error && error.description
												? 'is-invalid input-group-merge'
												: 'input-group-merge mb-1'
										}
									>
										<Input
											className={error && error.description ? 'is-invalid' : ''}
											type="textarea"
											id="description"
											name="description"
											placeholder=" Description"
											value={values.description}
											onChange={(e) => setValues({ ...values, description: e.target.value })}
										/>
									</InputGroup>
									{error && error.description ? (
										<small className="error">{error.description}</small>
									) : null}
								</FormGroup>
							</Col>
						</Row>

						<Col className="d-flex flex-sm-row flex-column mt-2 px-0" md="12" sm="12">
							<Button.Ripple
								className="mb-1 mb-sm-0 mr-0 mr-sm-1"
								color="primary"
								type="submit"
								onClick={handleSaveAndNew}
							>
								Save & New
							</Button.Ripple>
							<Button.Ripple
								className="mb-1 mb-sm-0 mr-0 mr-sm-1"
								color="primary"
								type="submit"
								onClick={handleSaveAndExit}
							>
								Save & Exit
							</Button.Ripple>
							<Button.Ripple color="danger" tag={Link} to="/admin/instructions/list" outline>
								Cancel
							</Button.Ripple>
						</Col>
					</CardBody>
				</Form>
			</Card>
		</Fragment>
	);
};

export default AddInstructions;
