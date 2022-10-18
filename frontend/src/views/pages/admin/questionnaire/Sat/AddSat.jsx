import { Link } from 'react-router-dom';
import { useEffect, useState, Fragment, Component } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import BreadCrumbs from '@components/breadcrumbs';
import { Plus, Delete } from 'react-feather';
import Repeater from '@components/repeater';
import Select from 'react-select';
import {
	CreateQuestionnaireRequest,
	GetAllSatQuestionnaireRequest,
	GetAllSubjectNameRequest,
	handleResetQues,
} from '../../../../../redux/questionnaireSlice';
import '../../../../../assets/scss/plugins/editor.scss';
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
import { convertToRaw, EditorState, Modifier } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import PropTypes from 'prop-types';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../../../../../assets/scss/plugins/editor.scss';

class CustomOption extends Component {
	static propTypes = {
		onChange: PropTypes.func,
		editorState: PropTypes.object,
	};

	addStar = () => {
		const { editorState, onChange } = this.props;
		const contentState = Modifier.replaceText(
			editorState.getCurrentContent(),
			editorState.getSelection(),
			'⭐',
			editorState.getCurrentInlineStyle()
		);
		onChange(EditorState.push(editorState, contentState, 'insert-characters'));
	};

	render() {
		return <div onClick={this.addStar}>⭐</div>;
	}
}

const AddSat = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const [count, setCount] = useState(1);
	const [question_description, setQuestion_description] = useState(EditorState.createEmpty());
	const [values, setValues] = useState({
		is_type: 'SAT',
		subject: '',
		question: '',
		answer: '',
		question_marks: '',
	});
	const [optionValue, setOptionValue] = useState({});
	const onEditorStateChange = (editorState) => {
		setQuestion_description(editorState);
	};

	const { subjectData, createdQuesData, error } = useSelector((state) => {
		return state.questionnaire;
	});

	const increaseCount = () => {
		setCount((prev) => prev + 1);
	};
	useEffect(() => {
		dispatch(GetAllSubjectNameRequest());
	}, []);

	useEffect(() => {
		if (createdQuesData) {
			dispatch(GetAllSatQuestionnaireRequest);
			history.push('/admin/questionnaire/Sat/list');
		}
		return () => {
			dispatch(handleResetQues());
		};
	}, [createdQuesData]);

	const onSubmit = async (e) => {
		e.preventDefault();
		const options = [];
		// eslint-disable-next-line no-unused-vars
		for (const [key, value] of Object.entries(optionValue)) {
			options.push(value);
		}
		var htmlToDraft_string = draftToHtml(convertToRaw(question_description.getCurrentContent()));
		const createdData = {
			...values,
			question_description: htmlToDraft_string,
			options,
		};

		await dispatch(CreateQuestionnaireRequest(createdData));
	};

	const handleOptionDelete = (e, index) => {
		e.preventDefault();
		const removedIndex = Object.keys(optionValue)?.findIndex((item) => item == index);
		delete optionValue[removedIndex];
	};

	const deleteForm = (e) => {
		e.preventDefault();
		e.target.closest('form').remove();
	};

	return (
		<Fragment>
			<BreadCrumbs
				breadCrumbTitle="SAT"
				breadCrumbParent={<Link to="/admin/questionnaire/Sat/list">SAT List</Link>}
				breadCrumbActive="Create SAT Details"
			/>
			<Card>
				<Form>
					<CardBody>
						<Row>
							<Col md="6" sm="12">
								<FormGroup className="mb-2">
									<Label className="required" for="subject">
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
										isClearable={false}
										options={subjectData && subjectData}
										className={error && error.subject_name ? 'is-invalid' : ''}
										classNamePrefix="select"
										style={{ borderLeft: 'none' }}
										defaultValue={values.subject}
										onChange={(e) => setValues({ ...values, subject: e.value })}
									/>
									{error && error.subject_name ? (
										<small className="error">{error.subject_name}</small>
									) : null}
								</FormGroup>
							</Col>

							{/* <Col md="6" sm="12">
								<Label for="is_type" className="required d-block mb-2">
									Type
								</Label>
								<FormGroup className="mb-2">
									<CustomInput
										type="radio"
										id="act"
										name="act"
										inline
										defaultChecked
										label="ACT"
										checked={values.is_type === 'ACT' ? true : false}
										defaultValue="ACT"
										onChange={(e) => setValues({ ...values, is_type: e.target.value })}
									/>

									<CustomInput
										type="radio"
										id="sat"
										name="sat"
										inline
										label="SAT"
										checked={values.is_type === 'SAT' ? true : false}
										defaultValue="SAT"
										onChange={(e) => setValues({ ...values, is_type: e.target.value })}
									/>
								</FormGroup>
							</Col> */}

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
											defaultValue={values.question}
											onChange={(e) => setValues({ ...values, question: e.target.value })}
										/>
									</InputGroup>
									{error && error.question ? (
										<small className="error">{error.question}</small>
									) : null}
								</FormGroup>
							</Col>

							<Col md="12" sm="12">
								<FormGroup>
									<Label for="question_description" className="required">
										Question Description
									</Label>
									<Editor
										wrapperClassName="demo-wrapper"
										editorClassName="demo-editor"
										onEditorStateChange={onEditorStateChange}
										toolbarCustomButtons={[<CustomOption />]}
									/>
									<InputGroup
										className={
											error && error.question_description
												? 'is-invalid input-group-merge'
												: 'input-group-merge mb-1'
										}
									>
										{/* <Input
											className={error && error.question_description ? 'is-invalid' : ''}
											type="textarea"
											id="question_description"
											name="question_description"
											placeholder="Question Description"
											onChange={(e) =>
												setValues({ ...values, question_description: e.target.value })
											}
										/> */}
									</InputGroup>
									{error && error.question_description ? (
										<small className="error">{error.question_description}</small>
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
											defaultValue={values.answer}
											onChange={(e) => setValues({ ...values, answer: e.target.value })}
										/>
									</InputGroup>
									{error && error.answer ? <small className="error">{error.answer}</small> : null}
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
											defaultValue={values.question_marks}
											onChange={(e) => setValues({ ...values, question_marks: e.target.value })}
										/>
									</InputGroup>
									{error && error.question_marks ? (
										<small className="error">{error.question_marks}</small>
									) : null}
								</FormGroup>
							</Col>
						</Row>

						<Row>
							<Col md="8" sm="8">
								<Repeater count={count}>
									{(index) => (
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
															id={`item-name-${index}`}
															name={`${index}`}
															onChange={(e) =>
																setOptionValue({ ...optionValue, [e.target.name]: e.target.value })
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
															handleOptionDelete(e, index);
															deleteForm(e);
														}}
														outline
													>
														<Delete size={14} />
													</Button>
												</Col>
											</Row>
										</Form>
									)}
								</Repeater>
								<Button className="btn-icon mt-2 white-color-btn" color="" onClick={increaseCount}>
									<Plus size={14} /> Add Options
								</Button>
							</Col>
						</Row>

						<Col className="d-flex flex-sm-row flex-column mt-2 px-0" md="12" sm="12">
							<Button.Ripple className="mb-1 mb-sm-0 mr-0 mr-sm-1" color="primary">
								Save & New
							</Button.Ripple>
							<Button.Ripple
								className="mb-1 mb-sm-0 mr-0 mr-sm-1"
								color="primary"
								onClick={onSubmit}
							>
								Save & Exit
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

export default AddSat;
