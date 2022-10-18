import { Link, useParams } from 'react-router-dom';
import { useEffect, Fragment, useState } from 'react';
import BreadCrumbs from '@components/breadcrumbs';
import { useDispatch, useSelector } from 'react-redux';
import { GetQuestionnaireRequest } from '../../../../../redux/questionnaireSlice';
import { Row, Col, Card, FormGroup, CardBody, Label, Input, Button, InputGroup } from 'reactstrap';

import { CKEditor } from '@ckeditor/ckeditor5-react';

import ClassicEditor from '@blowstack/ckeditor5-full-free-build';
const ViewAct = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const { getByIdQuesData } = useSelector((state) => state.questionnaire);

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
				breadCrumbTitle="ACT"
				breadCrumbParent={<Link to="/admin/questionnaire/Act/list">ACT List</Link>}
				breadCrumbActive=" ACT Details"
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

						<Col md="12" sm="12">
							<FormGroup className="mb-2" style={{ pointerEvents: 'none' }}>
								<Label for="question">Question</Label>

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
									data={getByIdQuesData && getByIdQuesData.question}
								/>
							</FormGroup>
						</Col>

						<Col md="12" sm="12">
							<FormGroup style={{ pointerEvents: 'none' }}>
								<Label for="question_description">Question Description</Label>

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
									data={getByIdQuesData && getByIdQuesData.question_description}
								/>
							</FormGroup>
						</Col>

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
						<Col md="12" sm="12">
							<FormGroup style={{ pointerEvents: 'none' }}>
								<Label for="answer_description">Answer Description</Label>

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
									data={getByIdQuesData && getByIdQuesData.answer_description}
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
										<FormGroup className="mb-2" style={{ pointerEvents: 'none' }}>
											<Label for="options">Options</Label>
											<InputGroup>
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
																'undo',
																'redo',
															],
														},
														removePlugins: ['Title'],
													}}
													data={getByIdQuesData.options[0][key]}
												/>
											</InputGroup>
										</FormGroup>
									</Col>
								))}{' '}
						</Col>
					</Row>
					<Col className="d-flex flex-sm-row flex-column mt-2" md="12" sm="12">
						<Button.Ripple color="danger" tag={Link} to="/admin/questionnaire/Act/list" outline>
							Cancel
						</Button.Ripple>
					</Col>
				</CardBody>
			</Card>
		</Fragment>
	);
};

export default ViewAct;
