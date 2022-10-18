import { Link } from 'react-router-dom';
import { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import BreadCrumbs from '@components/breadcrumbs';
import { Plus, Delete } from 'react-feather';
import Repeater from '@components/repeater';
import Select from 'react-select';
import {
	CreateQuestionnaireRequest,
	GetAllActQuestionnaireRequest,
	GetAllSubjectNameRequest,
	handleResetQues,
} from '../../../../../redux/questionnaireSlice';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@blowstack/ckeditor5-full-free-build';
// import ImageInsert from '@ckeditor/ckeditor5-image/src/imageinsert';
// import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage';
// import Image from '@ckeditor/ckeditor5-image/src/image';
// import Base64UploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter';
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

// class CustomOption extends Component {
// 	static propTypes = {
// 		onChange: PropTypes.func,
// 		editorState: PropTypes.object,
// 	};

// 	addStar = () => {
// 		const { editorState, onChange } = this.props;
// 		const contentState = Modifier.replaceText(
// 			editorState.getCurrentContent(),
// 			editorState.getSelection(),
// 			'⭐',
// 			editorState.getCurrentInlineStyle()
// 		);
// 		onChange(EditorState.push(editorState, contentState, 'insert-characters'));
// 	};

// 	render() {
// 		return <div onClick={this.addStar}>⭐</div>;
// 	}
// }

const AddAct = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const [count, setCount] = useState(1);
	const [editorValue, setEditorValue] = useState('');
	const [questionValue, setQuestionValue] = useState('');
	const [answerValue, setAnswerValue] = useState('');

	const [values, setValues] = useState({
		is_type: 'ACT',
		subject: '',
		answer: '',
		question_marks: '',
	});

	const [optionValue, setOptionValue] = useState({});

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
			dispatch(GetAllActQuestionnaireRequest);
			history.push('/admin/questionnaire/Act/list');
		}
		return () => {
			dispatch(handleResetQues());
		};
	}, [createdQuesData]);

	const onSubmit = async (e) => {
		e.preventDefault();
		const options = [];

		for (const [key, value] of Object.entries(optionValue)) {
			options.push(value);
		}

		const createdData = {
			...values,
			question: questionValue,
			question_description: editorValue,
			answer_description: answerValue,
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
	// function uploadAdapter(loader) {
	// 	return {
	// 		upload: () => {
	// 			return new Promise((resolve, reject) => {
	// 				const body = new FormData();
	// 				loader.file.then((file) => {
	// 					body.append('uploadImg', file);
	// 					// fetch(`API`),
	// 				});
	// 			});
	// 		},
	// 	};
	// }
	return (
		<Fragment>
			<BreadCrumbs
				breadCrumbTitle="ACT"
				breadCrumbParent={<Link to="/admin/questionnaire/Act/list">ACT List</Link>}
				breadCrumbActive="Create ACT Details"
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
										// defaultValue={values.subject}
										onChange={(e) => setValues({ ...values, subject: e.value })}
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
										editorplaceholder="Start typing here..."
										editor={ClassicEditor}
										config={{
											// Plugin: { ImageInsert },
											// plugins: { Base64UploadAdapter },
											// plugins: { EasyImage, Image },
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
												],
											},

											removePlugins: ['Title'],
										}}
										data={questionValue}
										onChange={(_, editor) => setQuestionValue(editor.getData())}
									/>
									<InputGroup
										className={
											error && error.question
												? 'is-invalid input-group-merge'
												: 'input-group-merge mb-1'
										}
									></InputGroup>
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

									<CKEditor
										editorplaceholder="Start typing here..."
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
												],
											},
											removePlugins: ['Title'],
										}}
										data={editorValue}
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
							<Col md="12" sm="12">
								<FormGroup className="mb-2">
									<Label for="answer_description" className="required">
										Answer Description
									</Label>

									<CKEditor
										editorplaceholder="Start typing here..."
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
												],
											},
											removePlugins: ['Title'],
										}}
										data={answerValue}
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
										<small className="error">{error.answer_description}</small>
									) : null}
								</FormGroup>
							</Col>
						</Row>

						<Row>
							<Col md="8" sm="8">
								<Repeater count={count}>
									{(index) => (
										<Form key={index}>
											<Row className="justify-content-between align-items-center option__wrapper">
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
																		'bulletedList',
																		'numberedList',
																		'imageUpload',
																		'insertTable',
																		'highlight',
																	],
																},
																removePlugins: ['Title'],
															}}
															data={optionValue[index + 1] != undefined && optionValue[index + 1]}
															onChange={(_, editor) =>
																setOptionValue({ ...optionValue, [index + 1]: editor.getData() })
															}
														/>
													</InputGroup>
													{error && error.options ? (
														<small className="error">{error.options}</small>
													) : null}
												</Col>
												<Col md={2} className="d-flex">
													<Select
														id="select-options"
														name="options"
														className=""
														isClearable={false}
														options={[
															{ value: 'A', label: 'A' },
															{ value: 'B', label: 'B' },
															{ value: 'C', label: 'C' },
															{ value: 'D', label: 'D' },
															{ value: 'E', label: 'E' },
															{ value: 'F', label: 'F' },
															{ value: 'G', label: 'G' },
															{ value: 'H', label: 'H' },
															{ value: 'I', label: 'I' },
															{ value: 'J', label: 'J' },
															{ value: 'K', label: 'K' },
															{ value: 'L', label: 'L' },
															{ value: 'M', label: 'M' },
															{ value: 'N', label: 'N' },
															{ value: 'O', label: 'O' },
															{ value: 'P', label: 'P' },
															{ value: 'Q', label: 'Q' },
															{ value: 'R', label: 'R' },
															{ value: 'S', label: 'S' },
															{ value: 'T', label: 'T' },
															{ value: 'U', label: 'U' },
															{ value: 'V', label: 'V' },
															{ value: 'W', label: 'W' },
															{ value: 'X', label: 'X' },
															{ value: 'Y', label: 'Y' },
															{ value: 'Z', label: 'Z' },
														]}
														classNamePrefix="select"
														style={{ borderLeft: 'none' }}
													/>
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
							<Button.Ripple className="mb-1 mb-sm-0 mr-0 mr-sm-1" color="primary" type="submit">
								Save & New
							</Button.Ripple>
							<Button.Ripple
								className="mb-1 mb-sm-0 mr-0 mr-sm-1"
								color="primary"
								onClick={onSubmit}
							>
								Save & Exit
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

export default AddAct;
