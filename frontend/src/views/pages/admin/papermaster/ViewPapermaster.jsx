import { Link, useParams } from 'react-router-dom';
import { useEffect, Fragment } from 'react';
import BreadCrumbs from '@components/breadcrumbs';
import { useDispatch, useSelector } from 'react-redux';
import { GetInstructionsRequest } from '../../../../redux/instructionsSlice';
import { Row, Col, Card, FormGroup, CardBody, Label, Input, Button } from 'reactstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@blowstack/ckeditor5-full-free-build';
import { GetPapermasterRequest } from '../../../../redux/papermasterSlice';
const ViewInstructions = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const { getByIdPapermasterData } = useSelector((state) => state.papermaster);

	useEffect(() => {
		dispatch(GetPapermasterRequest(id));
	}, [dispatch, id]);

	return (
		<Fragment>
			<BreadCrumbs
				breadCrumbTitle="Paper Master"
				breadCrumbParent={<Link to="/admin/papermaster/list">Paper Master List</Link>}
				breadCrumbActive=" Paper Master Details"
			/>

			<Card>
				<CardBody>
					<Row>
						<Col md="6" sm="12">
							<FormGroup className="mb-2">
								<Label for="question_marks">Paper Name</Label>

								<Input
									type="text"
									id="paper_name"
									name="paper_name"
									defaultValue={getByIdPapermasterData && getByIdPapermasterData.paper_name}
									disabled
								/>
							</FormGroup>
						</Col>

						<Col md="6" sm="12">
							<FormGroup className="mb-2">
								<Label for="year">Year</Label>

								<Input
									type="text"
									id="year"
									name="year"
									defaultValue={getByIdPapermasterData && getByIdPapermasterData.year}
									disabled
								/>
							</FormGroup>
						</Col>
						<Col md="12" sm="12">
							<FormGroup className="mb-2">
								<Label for="paper_description">Paper Description</Label>

								<CKEditor
									editor={ClassicEditor}
									config={{
										toolbar: {
											items: [
												'heading',
												// 'MathType',
												// 'ChemType',
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
									data={getByIdPapermasterData && getByIdPapermasterData?.paper_description}
								/>
							</FormGroup>
						</Col>
						<Col md="6" sm="12">
							<FormGroup className="mb-2">
								<Label for="is_type">Status</Label>
								<Input
									type="text"
									id="isActive"
									name="status"
									defaultValue={getByIdPapermasterData && getByIdPapermasterData.status}
									disabled
								/>
							</FormGroup>
						</Col>
					</Row>
					<Col className="d-flex flex-sm-row flex-column mt-2" md="12" sm="12">
						<Button.Ripple color="danger" tag={Link} to="/admin/papermaster/list" outline>
							Cancel
						</Button.Ripple>
					</Col>
				</CardBody>
			</Card>
		</Fragment>
	);
};

export default ViewInstructions;
