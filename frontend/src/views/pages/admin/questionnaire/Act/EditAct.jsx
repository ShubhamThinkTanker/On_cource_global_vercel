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
	GetAllPaperNameRequest,
	GetAllActQuestionnaireRequest,
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
import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from 'ckeditor5-classic-with-mathtype';
import ClassicEditor from '@blowstack/ckeditor5-full-free-build';

const EditAct = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const history = useHistory();

	const { paperData, subjectData, editedQuesData, getByIdQuesData, error } = useSelector(
		(state) => state.questionnaire
	);
	console.log(editedQuesData, 'editedQuesData');
	const [count, setCount] = useState(1);
	const [subject, setSubject] = useState('');
	const [paper, setPaper] = useState('');
	const [statusOption, setStatusOption] = useState(0);

	const [optionValue, setOptionValue] = useState({});

	const [editorValue, setEditorValue] = useState(undefined);
	const [questionValue, setQuestionValue] = useState('');
	const [answerValue, setAnswerValue] = useState('');

	const [values, setValues] = useState({
		paper_name: getByIdQuesData?.paper_name,
		subject_name: getByIdQuesData?.subject_name,
		is_type: getByIdQuesData?.is_type,
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
		dispatch(GetAllPaperNameRequest());
	}, []);
	useEffect(() => {
		if (editedQuesData !== null) {
			history.push('/admin/questionnaire/Act/list');
		}
	}, [editedQuesData]);

	useEffect(() => {
		setValues({
			...values,
			paper_name: getByIdQuesData?.paper_name,
			subject_name: getByIdQuesData?.subject_name,
			question: questionValue,
			is_type: getByIdQuesData?.is_type,
			question_description: editorValue,
			answer_description: answerValue,
			answer: getByIdQuesData?.answer,
			question_marks: getByIdQuesData?.question_marks,
		});
		{
			getByIdQuesData && setSubject(getByIdQuesData.subject_name);
		}
		{
			getByIdQuesData && setPaper(getByIdQuesData.paper_name);
		}

		{
			getByIdQuesData &&
				getByIdQuesData.options &&
				setCount(Object.keys(getByIdQuesData.options[0]).length);
		}
		{
			getByIdQuesData && setOptionValue(getByIdQuesData.options[0]);
		}
	}, [getByIdQuesData]);

	const editorChange = (index, editData) => {
		setStatusOption(true);
		setOptionValue((current) => {
			// 👇️ create copy of state object
			const copy = { ...current };
			// 👇️ remove salary key from object
			copy[index] = editData;

			return copy;
		});
		// setOptionValue({ ...optionValue, index: editData.getData() });
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		const options = [];

		for (const [key, value] of Object.entries(optionValue)) {
			options.push(value);
		}

		await dispatch(
			EditQuestionnaireRequest({
				id,
				updatedData: {
					...values,
					question: questionValue,
					question_description: editorValue,
					answer_description: answerValue,
					options,
				},
			})
		);
		dispatch(GetAllActQuestionnaireRequest);
	};

	return (
		<Fragment>
			<BreadCrumbs
				breadCrumbTitle="ACT"
				breadCrumbParent={<Link to="/admin/questionnaire/Act/list">ACT List</Link>}
				breadCrumbActive="Edit ACT Details"
			/>

			<Card>
				<Form>
					<CardBody>
						<Row>
							<Col md="6" sm="12">
								<FormGroup className="mb-2">
									<Label className="required" for="paper-select">
										Paper
									</Label>
									<InputGroup
										className={
											error && error.paper_name
												? 'is-invalid input-group-merge'
												: 'input-group-merge mb-1'
										}
									></InputGroup>
									<Select
										id="paper-select"
										name="paper"
										options={paperData && paperData}
										value={
											getByIdQuesData && paperData ? paperData.filter((x) => x.value === paper) : []
										}
										isClearable={false}
										className={error && error.paper_name ? 'is-invalid' : ''}
										classNamePrefix="select"
										onChange={(e) => {
											setSubject(e.value);
											setValues({ ...values, paper_name: e.value });
										}}
										style={{ borderLeft: 'none' }}
									/>
									{error && error.paper_name ? (
										<small className="error">{error.paper_name}</small>
									) : null}
								</FormGroup>
							</Col>
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
									<CKEditor
										editor={ClassicEditor}
										config={{
											toolbar: {
												items: [
													'heading',
													'MathType',
													'ChemType',
													'|',
													'bold',
													'italic',
													'underline',
													'bulletedList',
													'numberedList',
													'imageUpload',
													'insertTable',
													'highlight',
													'undo',
													'redo',
												],
											},
											removePlugins: ['Title'],
										}}
										data={getByIdQuesData?.question}
										onChange={(_, editor) => setQuestionValue(editor.getData())}
									/>
									<InputGroup
										className={
											error && error.question
												? 'is-invalid input-group-merge'
												: 'input-group-merge mb-1'
										}
									>
										{/* <Input
											className={error && error.question ? 'is-invalid' : ''}
											type="text"
											id="question"
											name="question"
											placeholder="Question"
											defaultValue={getByIdQuesData?.question}
											onChange={(e) => setValues({ ...values, question: e.target.value })}
										/> */}
									</InputGroup>
									{error && error.question ? (
										<div className="error">
											<small>{error.question}</small>
										</div>
									) : null}
								</FormGroup>
							</Col>

							<Col md="12" sm="12">
								<FormGroup>
									<Label for="question_description" className="required">
										Question Description
									</Label>

									<CKEditor
										editor={ClassicEditor}
										config={{
											toolbar: {
												items: [
													'heading',
													'MathType',
													'ChemType',
													'|',
													'bold',
													'italic',
													'underline',
													'bulletedList',
													'numberedList',
													'imageUpload',
													'insertTable',
													'highlight',
													'undo',
													'redo',
												],
											},
											removePlugins: ['Title'],
										}}
										data={getByIdQuesData?.question_description}
										onChange={(_, editor) => setEditorValue(editor.getData())}
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
							<Col md="12" sm="12">
								<FormGroup>
									<Label for="answer_description" className="required">
										Answer Description
									</Label>

									<CKEditor
										editor={ClassicEditor}
										config={{
											toolbar: {
												items: [
													'heading',
													'MathType',
													'ChemType',
													'|',
													'bold',
													'italic',
													'underline',
													'bulletedList',
													'numberedList',
													'imageUpload',
													'insertTable',
													'highlight',
													'undo',
													'redo',
												],
											},
											removePlugins: ['Title'],
										}}
										data={getByIdQuesData?.answer_description}
										onChange={(_, editor) => setAnswerValue(editor.getData())}
									/>
									<InputGroup
										className={
											error && error.answer_description
												? 'is-invalid input-group-merge'
												: 'input-group-merge mb-1'
										}
									></InputGroup>
									{error && error.answer_description ? (
										<div className="error">
											<small>{error.answer_description}</small>
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
												<Row className="justify-content-between align-items-center option__wrapper">
													<Col md={10} className="mb-md-0 ">
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
															{/* <Input
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
															/> */}
															<CKEditor
																// id={`item-name-${index}`}
																editor={ClassicEditor}
																config={{
																	toolbar: {
																		items: [
																			'heading',
																			'MathType',
																			'ChemType',
																			'|',
																			'bold',
																			'italic',
																			'bulletedList',
																			'numberedList',
																			'imageUpload',
																			'insertTable',
																			'highlight',
																			'undo',
																			'redo',
																		],
																	},
																	removePlugins: ['Title'],
																}}
																data={optionValue[index + 1] != undefined && optionValue[index + 1]}
																onChange={(_, editor) => editorChange(index + 1, editor.getData())}
															/>
														</InputGroup>
														{error && error.options ? (
															<small className="error">{error.options}</small>
														) : null}
													</Col>

													<Col md={2}>
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
							<Button.Ripple color="danger" tag={Link} to="/admin/questionnaire/Act/list" outline>
								Cancel
							</Button.Ripple>
						</Col>
					</CardBody>
				</Form>
			</Card>
		</Fragment>
	);
};

export default EditAct;
