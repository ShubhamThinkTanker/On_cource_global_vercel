import { Link, useParams } from 'react-router-dom';
import { useEffect, Fragment } from 'react';
import BreadCrumbs from '@components/breadcrumbs';
import { useDispatch, useSelector } from 'react-redux';
import { GetInstructionsRequest } from '../../../../redux/instructionsSlice';
import { Row, Col, Card, FormGroup, CardBody, Label, Input, Button } from 'reactstrap';

const ViewInstructions = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const { getByIdInstructData } = useSelector((state) => state.instructions);

	useEffect(() => {
		dispatch(GetInstructionsRequest(id));
	}, [dispatch, id]);

	return (
		<Fragment>
			<BreadCrumbs
				breadCrumbTitle="Instructions"
				breadCrumbParent={<Link to="/admin/instructions/list">Instructions List</Link>}
				breadCrumbActive=" Instructions Details"
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
									value={
										getByIdInstructData != null &&
										getByIdInstructData != undefined &&
										getByIdInstructData[0].subject_name
									}
									disabled
								/>
							</FormGroup>
						</Col>

						<Col md="6" sm="12">
							<FormGroup className="mb-2">
								<Label for="question_marks" className="required">
									Total Marks
								</Label>

								<Input
									type="text"
									id="total_marks"
									name="total_marks"
									value={
										getByIdInstructData != null &&
										getByIdInstructData != undefined &&
										getByIdInstructData[0]['total_marks']
									}
									disabled
								/>
							</FormGroup>
						</Col>
						<Col md="6" sm="12">
							<FormGroup>
								<Label className="form-label" id="time_duration">
									Time Duration
								</Label>

								<Input
									type="text"
									id="time_duration"
									name="time_duration"
									value={
										getByIdInstructData != null &&
										getByIdInstructData != undefined &&
										getByIdInstructData[0].time_duration
									}
									disabled
								/>
							</FormGroup>
						</Col>
						<Col md="6" sm="12">
							<FormGroup className="mb-2">
								<Label for="is_type">Status</Label>
								<Input
									type="text"
									id="isActive"
									name="isActive"
									placeholder="Status"
									value={
										getByIdInstructData != null &&
										getByIdInstructData != undefined &&
										getByIdInstructData[0].isActive
									}
									disabled
								/>
							</FormGroup>
						</Col>

						<Col md="12" sm="12">
							<FormGroup className="mb-2">
								<Label for="description" className="required">
									Description
								</Label>

								<Input
									type="textarea"
									id="description"
									name="description"
									value={
										getByIdInstructData != null &&
										getByIdInstructData != undefined &&
										getByIdInstructData[0].description
									}
									disabled
								/>
							</FormGroup>
						</Col>
					</Row>
					<Col className="d-flex flex-sm-row flex-column mt-2" md="12" sm="12">
						<Button.Ripple color="danger" tag={Link} to="/admin/instructions/list" outline>
							Cancel
						</Button.Ripple>
					</Col>
				</CardBody>
			</Card>
		</Fragment>
	);
};

export default ViewInstructions;
