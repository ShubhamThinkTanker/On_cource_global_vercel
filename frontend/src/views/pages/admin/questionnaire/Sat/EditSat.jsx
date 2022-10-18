import { Link, useHistory, useParams } from 'react-router-dom';
import { useEffect, useState, Fragment } from 'react';
import BreadCrumbs from '@components/breadcrumbs';
import { useDispatch, useSelector } from 'react-redux';
import { Plus, Delete } from 'react-feather';
import Repeater from '@components/repeater';
import draftToHtml from 'draftjs-to-html';
import {
	GetQuestionnaireRequest,
	EditQuestionnaireRequest,
	GetAllSubjectNameRequest,
	GetAllSatQuestionnaireRequest,
} from '../../../../../redux/questionnaireSlice';
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
} from 'reactstrap';
import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../../../../../assets/scss/plugins/editor.scss';

const EditSat = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const history = useHistory();

	const { subjectData, editedQuesData, getByIdQuesData, error } = useSelector(
		(state) => state.questionnaire
	);

	const [count, setCount] = useState(1);
	const [subject, setSubject] = useState('');
	const [optionValue, setOptionValue] = useState({});
	const [question_description, setQuestion_description] = useState('');

	const onEditorStateChange = (editorState) => {
		setQuestion_description(editorState);
	};
	const [values, setValues] = useState({
		subject_name: getByIdQuesData?.subject_name,
		is_type: getByIdQuesData?.is_type,
		question: getByIdQuesData?.question,
		question_description: getByIdQuesData?.question_description,
		answer: getByIdQuesData?.answer,
		question_marks: getByIdQuesData?.question_marks,
	});
	const increaseCount = () => {
		setCount((prev) => prev + 1);
	};

	const handleOptionDelete = (e, index) => {
		setOptionValue((current) => {
			// 👇️ create copy of state object
			const copy = { ...current };
			// 👇️ remove salary key from object
			delete copy[index];

			return copy;
		});
		e.preventDefault();
		e.target.closest('form').remove();
	};
	useEffect(() => {
		dispatch(GetQuestionnaireRequest(id));
	}, [dispatch]);
	useEffect(() => {
		dispatch(GetAllSubjectNameRequest());
	}, []);
	useEffect(() => {
		if (editedQuesData !== null) {
			history.push('/admin/questionnaire/Sat/list');
		}
	}, [editedQuesData]);

	useEffect(() => {
		setValues({
			...values,
			subject_name: getByIdQuesData?.subject_name,
			question: getByIdQuesData?.question,
			is_type: getByIdQuesData?.is_type,
			question_description: getByIdQuesData?.question_description,
			answer: getByIdQuesData?.answer,
			question_marks: getByIdQuesData?.question_marks,
		});
		{
			getByIdQuesData && setSubject(getByIdQuesData.subject_name);
		}
		{
			getByIdQuesData &&
				getByIdQuesData.options &&
				setCount(Object.keys(getByIdQuesData.options[0]).length);
		}
		{
			getByIdQuesData && getByIdQuesData.options && setOptionValue(getByIdQuesData.options[0]);
		}
	}, [getByIdQuesData]);

	const onSubmit = async (e) => {
		e.preventDefault();
		const options = [];

		for (const [key, value] of Object.entries(optionValue)) {
			options.push(value);
		}
		var htmlToDraft_string = draftToHtml(convertToRaw(question_description.getCurrentContent()));

		await dispatch(
			EditQuestionnaireRequest({
				id,
				updatedData: { ...values, question_description: htmlToDraft_string, options },
			})
		);
		dispatch(GetAllSatQuestionnaireRequest);
	};
	return (
		<Fragment>
			<BreadCrumbs
				breadCrumbTitle="SAT"
				breadCrumbParent={<Link to="/admin/questionnaire/Sat/list">SAT List</Link>}
				breadCrumbActive="Edit SAT Details"
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
											getByIdQuesData && subjectData
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

							<Col md="12" sm="12">
								<FormGroup className="mb-2">
									<Label for="question" className="required">
										Question
									</Label>
									<InputGroup
										className={
											error && error.question
												? 'is-invalid input-group-merge'
												: 'input-group-merge mb-1'
										}
									>
										<Input
											className={error && error.question ? 'is-invalid' : ''}
											type="text"
											id="question"
											name="question"
											placeholder="Question"
											defaultValue={getByIdQuesData?.question}
											onChange={(e) => setValues({ ...values, question: e.target.value })}
										/>
									</InputGroup>
									{error && error.question ? (
										<div className="error">
											<small>{error.question}</small>
										</div>
									) : null}
								</FormGroup>
							</Col>

							{getByIdQuesData && getByIdQuesData.question_description && (
								<Col md="12" sm="12">
									<FormGroup>
										<Label for="question_description" className="required">
											Question Description
										</Label>
										<Editor
											wrapperClassName="demo-wrapper"
											editorClassName="demo-editor"
											onEditorStateChange={onEditorStateChange}
											defaultEditorState={EditorState.createWithContent(
												ContentState.createFromBlockArray(
													convertFromHTML(getByIdQuesData.question_description)
												)
											)}
										/>
										<InputGroup
											className={
												error && error.question_description
													? 'is-invalid input-group-merge'
													: 'input-group-merge mb-1'
											}
										></InputGroup>
										{error && error.question_description ? (
											<div className="error">
												<small>{error.question_description}</small>
											</div>
										) : null}
									</FormGroup>
								</Col>
							)}

							<Col md="6" sm="12">
								<FormGroup className="mb-2">
									<Label for="answer" className="required">
										Answer
									</Label>
									<InputGroup
										className={
											error && error.answer
												? 'is-invalid input-group-merge'
												: 'input-group-merge mb-1'
										}
									>
										<Input
											className={error && error.answer ? 'is-invalid' : ''}
											type="text"
											id="answer"
											name="answer"
											placeholder="Answer"
											defaultValue={getByIdQuesData?.answer}
											onChange={(e) => setValues({ ...values, answer: e.target.value })}
										/>
									</InputGroup>
									{error && error.answer ? (
										<div className="error">
											<small>{error.answer}</small>
										</div>
									) : null}
								</FormGroup>
							</Col>

							<Col md="6" sm="12">
								<FormGroup className="mb-2">
									<Label for="question_marks" className="required">
										Question Marks
									</Label>
									<InputGroup
										className={
											error && error.question_marks
												? 'is-invalid input-group-merge'
												: 'input-group-merge mb-1'
										}
									>
										<Input
											className={error && error.question_marks ? 'is-invalid' : ''}
											type="number"
											id="question_marks"
											name="question_marks"
											placeholder="Question Marks"
											defaultValue={getByIdQuesData?.question_marks}
											onChange={(e) => setValues({ ...values, question_marks: e.target.value })}
										/>
									</InputGroup>
									{error && error.question_marks ? (
										<div className="error">
											<small>{error.question_marks}</small>
										</div>
									) : null}
								</FormGroup>
							</Col>
						</Row>
						<Row>
							<Col md="8" sm="8">
								<Repeater count={count}>
									{(index) => {
										return (
											<Form key={index}>
												<Row className="justify-content-between align-items-center">
													<Col md={9} className="mb-md-0 ">
														<Label className="form-label required" for={`item-name-${index}`}>
															Options
														</Label>
														<InputGroup
															className={
																error && error.options
																	? 'is-invalid input-group-merge'
																	: 'input-group-merge mb-1'
															}
														>
															<Input
																type="text"
																id={`item-name-${index + 1}`}
																name={`${index + 1}`}
																defaultValue={
																	getByIdQuesData &&
																	getByIdQuesData?.options &&
																	getByIdQuesData?.options[0][index + 1]
																}
																onChange={(e) =>
																	setOptionValue({
																		...optionValue,
																		[e.target.name]: e.target.value,
																	})
																}
																placeholder="Options"
															/>
														</InputGroup>
														{error && error.options ? (
															<small className="error">{error.options}</small>
														) : null}
													</Col>

													<Col>
														<Button
															color="danger"
															className="text-nowrap px-1 mt-2"
															onClick={(e) => {
																handleOptionDelete(e, index + 1);
															}}
															outline
														>
															<Delete size={14} />
														</Button>
													</Col>
												</Row>
											</Form>
										);
									}}
								</Repeater>

								<Button className="btn-icon mt-2 white-color-btn" color="" onClick={increaseCount}>
									<Plus size={14} /> Add Options
								</Button>
							</Col>
						</Row>

						<Col className="d-flex flex-sm-row flex-column mt-2" md="12" sm="12">
							<Button.Ripple
								className="mb-1 mb-sm-0 mr-0 mr-sm-1"
								color="primary"
								onClick={onSubmit}
							>
								Submit
							</Button.Ripple>
							<Button.Ripple color="danger" tag={Link} to="/admin/questionnaire/Sat/list" outline>
								Cancel
							</Button.Ripple>
						</Col>
					</CardBody>
				</Form>
			</Card>
		</Fragment>
	);
};

export default EditSat;
