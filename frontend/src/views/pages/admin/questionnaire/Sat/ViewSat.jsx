import { Link, useParams } from 'react-router-dom';
import { useEffect, Fragment, useState } from 'react';
import BreadCrumbs from '@components/breadcrumbs';
import { useDispatch, useSelector } from 'react-redux';
import { GetQuestionnaireRequest } from '../../../../../redux/questionnaireSlice';
import { Row, Col, Card, FormGroup, CardBody, Label, Input, Button, InputGroup } from 'reactstrap';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../../../../../assets/scss/plugins/editor.scss';

const ViewSat = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const { getByIdQuesData } = useSelector((state) => state.questionnaire);
	const [question_description, setQuestion_description] = useState();

	const onEditorStateChange = (editorState) => {
		setQuestion_description(editorState);
	};
	useEffect(() => {
		dispatch(GetQuestionnaireRequest(id));
	}, [dispatch, id]);
	var optionsObj = [];
	useEffect(() => {
		if (getByIdQuesData) {
			for (const key in getByIdQuesData.options) {
				optionsObj.push(key);
			}
		}
	}, [getByIdQuesData]);

	return (
		<Fragment>
			<BreadCrumbs
				breadCrumbTitle="SAT"
				breadCrumbParent={<Link to="/admin/questionnaire/Set/list">SAT List</Link>}
				breadCrumbActive=" SAT Details"
			/>

			<Card>
				<CardBody>
					<Row>
						<Col md="6" sm="12">
							<FormGroup className="mb-2">
								<Label for="subject_name">Subject</Label>
								<Input
									type="text"
									id="subject_name"
									name="subject_name"
									placeholder="Subject"
									defaultValue={getByIdQuesData && getByIdQuesData.subject_name}
									disabled
								/>
							</FormGroup>
						</Col>
						{/* <Col md="6" sm="12">
							<FormGroup className="mb-2">
								<Label for="is_type">Type</Label>
								<Input
									type="text"
									id="is_type"
									name="is_type"
									placeholder="Type"
									defaultValue={getByIdQuesData && getByIdQuesData.is_type}
									disabled
								/>
							</FormGroup>
						</Col> */}
						<Col md="12" sm="12">
							<FormGroup className="mb-2">
								<Label for="question">Question</Label>
								<Input
									type="textarea"
									id="question"
									name="question"
									placeholder="Question"
									defaultValue={getByIdQuesData && getByIdQuesData.question}
									disabled
								/>
							</FormGroup>
						</Col>
						{getByIdQuesData && getByIdQuesData.question_description && (
							<Col md="12" sm="12">
								<FormGroup>
									<Label for="question_description">Question Description</Label>
									<Editor
										onEditorStateChange={onEditorStateChange}
										wrapperClassName="demo-wrapper"
										editorClassName="demo-editor"
										// onEditorStateChange={onEditorStateChange}
										editorState={EditorState.createWithContent(
											ContentState.createFromBlockArray(
												convertFromHTML(getByIdQuesData.question_description)
											)
										)}
										// contentState={getByIdQuesData && getByIdQuesData.question_description}
										// isDisabled={disabled}
										// readOnly={readOnly}contentState
										// disabled
									/>
								</FormGroup>
							</Col>
						)}
						<Col md="6" sm="12">
							<FormGroup className="mb-2">
								<Label for="answer">Answer</Label>
								<Input
									type="text"
									id="answer"
									name="answer"
									placeholder="Answer"
									defaultValue={getByIdQuesData && getByIdQuesData.answer}
									disabled
								/>
							</FormGroup>
						</Col>
						<Col md="6" sm="12">
							<FormGroup className="mb-2">
								<Label for="question_marks">Question Marks</Label>
								<Input
									type="text"
									id="question_marks"
									name="question_marks"
									placeholder="Question Marks"
									defaultValue={getByIdQuesData && getByIdQuesData.question_marks}
									disabled
								/>
							</FormGroup>
						</Col>
						{getByIdQuesData &&
							getByIdQuesData.options &&
							optionsObj.map((e) => (
								<>
									<Col md="12" sm="12">
										<FormGroup className="mb-2">
											<Label className="form-label">Options</Label>
											<Input
												type="text"
												id="options"
												placeholder="Options"
												defaultValue={getByIdQuesData && JSON.stringify(getByIdQuesData.options)}
												disabled
											/>
										</FormGroup>
									</Col>
								</>
							))}
						<Col md="12" sm="12">
							{getByIdQuesData &&
								getByIdQuesData.options &&
								Object.keys(getByIdQuesData.options[0]).map((key, index) => (
									<Col md="20" sm="20" key={key}>
										<FormGroup className="mb-2">
											<Label for="options">Options</Label>
											<InputGroup>
												<Input
													type="text"
													id="options"
													name="options"
													placeholder="Options"
													defaultValue={getByIdQuesData.options[0][key]}
													disabled
													// onChange={(e) => setValues({ ...values, options: e.target.value })}
												/>
											</InputGroup>
										</FormGroup>
									</Col>
								))}{' '}
						</Col>
					</Row>
					<Col className="d-flex flex-sm-row flex-column mt-2" md="12" sm="12">
						<Button.Ripple color="danger" tag={Link} to="/admin/questionnaire/Sat/list" outline>
							Cancel
						</Button.Ripple>
					</Col>
				</CardBody>
			</Card>
		</Fragment>
	);
};

export default ViewSat;
