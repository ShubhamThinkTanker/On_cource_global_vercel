import { Link, useHistory, useParams } from 'react-router-dom';
import { useEffect, useState, Fragment } from 'react';
import BreadCrumbs from '@components/breadcrumbs';
import { useDispatch, useSelector } from 'react-redux';

import {
	GetInstructionsRequest,
	GetAllInstrunctionsRequest,
	EditInstructionsRequest,
	GetAllSubjectNameRequest,
} from '../../../../redux/instructionsSlice';
import Select from 'react-select';
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

const EditInstructions = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const history = useHistory();

	const { subjectData, editedInstructData, getByIdInstructData, error } = useSelector(
		(state) => state.instructions
	);

	const [subject, setSubject] = useState('');

	const [values, setValues] = useState({
		subject_name: getByIdInstructData?.subject_name,
		total_marks: getByIdInstructData?.total_marks,
		time_duration: getByIdInstructData?.time_duration,
		isActive: getByIdInstructData?.isActive,
		description: getByIdInstructData?.description,
	});

	useEffect(() => {
		dispatch(GetInstructionsRequest(id));
	}, [dispatch]);
	useEffect(() => {
		dispatch(GetAllSubjectNameRequest());
	}, []);
	useEffect(() => {
		if (editedInstructData !== null) {
			history.push('/admin/instructions/list');
		}
	}, [editedInstructData]);

	useEffect(() => {
		{
			getByIdInstructData != null &&
				getByIdInstructData != undefined &&
				setValues({
					...values,
					subject_name: getByIdInstructData[0].subject_name,
					total_marks: getByIdInstructData[0].total_marks,
					time_duration: getByIdInstructData[0].time_duration,
					isActive: getByIdInstructData[0].isActive,
					description: getByIdInstructData[0].description,
				});
		}
		{
			getByIdInstructData != null &&
				getByIdInstructData != undefined &&
				setSubject(getByIdInstructData[0].subject_name);
		}
	}, [getByIdInstructData]);

	const onSubmit = async (e) => {
		e.preventDefault();

		await dispatch(EditInstructionsRequest({ id, updatedData: { ...values } }));
		dispatch(GetAllInstrunctionsRequest);
	};

	return (
		<Fragment>
			<BreadCrumbs
				breadCrumbTitle="Instructions"
				breadCrumbParent={<Link to="/admin/instructions/list">Instructions List</Link>}
				breadCrumbActive="Edit Instructions Details"
			/>

			<Card>
				<Form>
					<CardBody>
						<Row>
							<Col md="6" sm="12">
								<FormGroup className="mb-2">
									<Label className="required" for="subject-select">
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
										name="subject"
										options={subjectData && subjectData}
										value={
											getByIdInstructData && subjectData
												? subjectData.filter((x) => x.value === subject)
												: []
										}
										isClearable={false}
										className={error && error.subject_name ? 'is-invalid' : ''}
										classNamePrefix="select"
										onChange={(e) => {
											setSubject(e.value);
											setValues({ ...values, subject_name: e.value });
										}}
										style={{ borderLeft: 'none' }}
									/>
									{error && error.subject_name ? (
										<small className="error">{error.subject_name}</small>
									) : null}
								</FormGroup>
							</Col>

							<Col md="6" sm="12">
								<FormGroup className="mb-2">
									<Label for="total_marks" className="required d-block mb-2">
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
											defaultValue={values.total_marks}
											onChange={(e) => setValues({ ...values, total_marks: e.target.value })}
										/>
									</InputGroup>
									{error && error.total_marks ? (
										<div className="error">
											<small>{error.total_marks}</small>
										</div>
									) : null}
								</FormGroup>
							</Col>
							<Col md="6" sm="12">
								<FormGroup className="mb-2">
									<Label for="time_duration" className="required">
										Time Duration
									</Label>
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
											placeholder="Answer"
											defaultValue={values.time_duration}
											onChange={(e) => setValues({ ...values, time_duration: e.target.value })}
										/>
									</InputGroup>
									{error && error.time_duration ? (
										<div className="error">
											<small>{error.time_duration}</small>
										</div>
									) : null}
								</FormGroup>
							</Col>

							<Col md="6" sm="12">
								<FormGroup className="mb-2">
									<Label for="isActive" className="required d-block mb-2">
										Status
									</Label>
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
										name="is_type"
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
											defaultValue={
												getByIdInstructData != null &&
												getByIdInstructData != undefined &&
												getByIdInstructData[0].description
											}
											onChange={(e) =>
												setValues({ ...values, description: e.target.value.toString() })
											}
										/>
									</InputGroup>
									{error && error.description ? (
										<div className="error">
											<small>{error.description}</small>
										</div>
									) : null}
								</FormGroup>
							</Col>

							<Col className="d-flex flex-sm-row flex-column mt-2" md="12" sm="12">
								<Button.Ripple
									className="mb-1 mb-sm-0 mr-0 mr-sm-1"
									color="primary"
									onClick={onSubmit}
								>
									Submit
								</Button.Ripple>
								<Button.Ripple color="danger" tag={Link} to="/admin/instructions/list" outline>
									Cancel
								</Button.Ripple>
							</Col>
						</Row>
					</CardBody>
				</Form>
			</Card>
		</Fragment>
	);
};

export default EditInstructions;
