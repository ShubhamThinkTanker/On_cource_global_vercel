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
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@blowstack/ckeditor5-full-free-build';
import {
	EditPapermasterRequest,
	GetAllPapermasterRequest,
	GetPapermasterRequest,
} from '../../../../redux/papermasterSlice';

const EditPapermaster = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const history = useHistory();
	const [editorValue, setEditorValue] = useState(undefined);

	const { editedPapermasterData, getByIdPapermasterData, error } = useSelector(
		(state) => state.papermaster
	);

	const [values, setValues] = useState({
		paper_name: getByIdPapermasterData?.paper_name,
		year: getByIdPapermasterData?.year,
		status: getByIdPapermasterData?.status,
		// paper_description: getByIdPapermasterData?.editorValue,
	});

	useEffect(() => {
		dispatch(GetPapermasterRequest(id));
	}, [dispatch]);

	useEffect(() => {
		if (editedPapermasterData !== null) {
			history.push('/admin/papermaster/list');
		}
	}, [editedPapermasterData]);

	useEffect(() => {
		{
			getByIdPapermasterData != null &&
				getByIdPapermasterData != undefined &&
				setValues({
					...values,
					paper_name: getByIdPapermasterData?.paper_name,
					year: getByIdPapermasterData?.year,
					paper_description: editorValue,
					// paper_description: getByIdPapermasterData[0].paper_description,
					status: getByIdPapermasterData?.status,
				});
		}
	}, [getByIdPapermasterData]);

	const onSubmit = async (e) => {
		e.preventDefault();
		await dispatch(
			EditPapermasterRequest({ id, updatedData: { ...values, paper_description: editorValue } })
		);
		dispatch(GetAllPapermasterRequest);
	};

	return (
		<Fragment>
			<BreadCrumbs
				breadCrumbTitle="Paper Master"
				breadCrumbParent={<Link to="/admin/papermaster/list">Paper Master List</Link>}
				breadCrumbActive="Edit Paper Master Details"
			/>

			<Card>
				<Form>
					<CardBody>
						<Row>
							<Col md="6" sm="12">
								<FormGroup className="mb-2">
									<Label for="paper_name" className="required d-block mb-2">
										Paper Name
									</Label>
									<InputGroup
										className={
											error && error.paper_name
												? 'is-invalid input-group-merge'
												: 'input-group-merge mb-1'
										}
									>
										<Input
											className={error && error.paper_name ? 'is-invalid' : ''}
											type="text"
											id="paper_name"
											name="paper_name"
											placeholder="Paper Name"
											defaultValue={getByIdPapermasterData?.paper_name}
											onChange={(e) => setValues({ ...values, paper_name: e.target.value })}
										/>
									</InputGroup>
									{error && error.paper_name ? (
										<div className="error">
											<small>{error.paper_name}</small>
										</div>
									) : null}
								</FormGroup>
							</Col>

							<Col md="6" sm="12">
								<FormGroup className="mb-2">
									<Label for="year" className="required d-block mb-2">
										Year
									</Label>
									<InputGroup
										className={
											error && error.year
												? 'is-invalid input-group-merge'
												: 'input-group-merge mb-1'
										}
									>
										<Input
											className={error && error.year ? 'is-invalid' : ''}
											type="text"
											id="year"
											name="year"
											placeholder="Year"
											defaultValue={getByIdPapermasterData?.year}
											onChange={(e) => setValues({ ...values, year: e.target.value })}
										/>
									</InputGroup>
									{error && error.year ? (
										<div className="error">
											<small>{error.year}</small>
										</div>
									) : null}
								</FormGroup>
							</Col>
							<Col md="12" sm="12">
								<FormGroup className="mb-2">
									<Label for="paper_description" className="required mb-2">
										Paper Description
									</Label>
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
										data={getByIdPapermasterData?.paper_description}
										onChange={(_, editor) => setEditorValue(editor.getData())}
									/>
									<InputGroup
										className={
											error && error.paper_description
												? 'is-invalid input-group-merge'
												: 'input-group-merge mb-1'
										}
									></InputGroup>
									{error && error.paper_description ? (
										<div className="error">
											<small>{error.paper_description}</small>
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
										name="active"
										inline
										defaultChecked
										label="Active"
										checked={getByIdPapermasterData?.status === 'active' ? true : false}
										defaultValue="active"
										onChange={(e) => setValues({ ...values, status: e.target.value })}
									/>

									<CustomInput
										type="radio"
										id="inactive"
										name="inactive"
										inline
										label="InActive"
										checked={getByIdPapermasterData?.status === 'inactive' ? true : false}
										defaultValue="inactive"
										onChange={(e) => setValues({ ...values, status: e.target.value })}
									/>
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
								<Button.Ripple color="danger" tag={Link} to="/admin/papermaster/list" outline>
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

export default EditPapermaster;
