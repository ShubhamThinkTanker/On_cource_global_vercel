import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import BreadCrumbs from '@components/breadcrumbs';
import { toast } from 'react-toastify';
import Select from 'react-select';
import '@styles/react/libs/flatpickr/flatpickr.scss';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@blowstack/ckeditor5-full-free-build';
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
import {
	CreatePapermasterRequest,
	GetAllPapermasterRequest,
	handleResetPapermaster,
} from '../../../../redux/papermasterSlice';

const AddPapermaster = () => {
	const history = useHistory();
	const [editorValue, setEditorValue] = useState('');
	const dispatch = useDispatch();
	const [savenew, setSavenew] = useState('');
	const [values, setValues] = useState({
		paper_name: '',
		year: '',
		paper_description: '',
		status: 'active',
	});

	const { createdPapermasterData, error } = useSelector((state) => state.papermaster);

	useEffect(() => {
		if (error !== null) {
			toast.error(error);
		}
	}, [error]);

	useEffect(() => {
		if (createdPapermasterData) {
			dispatch(GetAllPapermasterRequest);

			history.push('/admin/papermaster/list');
		}
		return () => {
			dispatch(handleResetPapermaster());
		};
	}, [createdPapermasterData]);

	const onSubmit = async (e) => {
		e.preventDefault();

		const createdData = {
			...values,
			paper_description: editorValue,
		};
		await dispatch(CreatePapermasterRequest(createdData));
	};

	return (
		<Fragment>
			<BreadCrumbs
				breadCrumbTitle="Paper Master"
				breadCrumbParent={<Link to="/admin/papermaster/list">Paper Master List</Link>}
				breadCrumbActive="Create Paper Master Details"
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
											defaultValue={values.paper_name}
											onChange={(e) => setValues({ ...values, paper_name: e.target.value })}
										/>
									</InputGroup>
									{error && error.paper_name ? (
										<small className="error">{error.paper_name}</small>
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
											defaultValue={values.year}
											onChange={(e) => setValues({ ...values, year: e.target.value })}
										/>
									</InputGroup>
									{error && error.year ? <small className="error">{error.year}</small> : null}
								</FormGroup>
							</Col>

							<Col md="12" sm="12">
								<FormGroup className="mb-2">
									<Label for="paper_description" className="required mb-2">
										Paper Description
									</Label>
									<CKEditor
										editorplaceholder="Start typing here..."
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
												],
											},
											removePlugins: ['Title'],
										}}
										data={editorValue}
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
										<small className="error">{error.paper_description}</small>
									) : null}{' '}
								</FormGroup>
							</Col>

							<Col md="6" sm="12">
								<Label for="status" className="required d-block mb-1">
									Status
								</Label>
								<FormGroup className="mb-2">
									<CustomInput
										type="radio"
										id="active"
										name="active"
										inline
										defaultChecked
										label="Active"
										checked={values.status === 'active' ? true : false}
										defaultValue="active"
										onChange={(e) => setValues({ ...values, status: e.target.value })}
									/>

									<CustomInput
										type="radio"
										id="inactive"
										name="inactive"
										inline
										label="InActive"
										checked={values.status === 'inactive' ? true : false}
										defaultValue="inactive"
										onChange={(e) => setValues({ ...values, status: e.target.value })}
									/>
								</FormGroup>
							</Col>
						</Row>

						<Col className="d-flex flex-sm-row flex-column mt-2 px-0" md="12" sm="12">
							<Button.Ripple
								className="mb-1 mb-sm-0 mr-0 mr-sm-1"
								color="primary"
								onClick={onSubmit}
								type="submit"
								tag={Link}
								to="/admin/papermaster/add"
							>
								Save & New
							</Button.Ripple>
							<Button.Ripple
								className="mb-1 mb-sm-0 mr-0 mr-sm-1"
								color="primary"
								onClick={onSubmit}
							>
								Save & Exit
							</Button.Ripple>
							<Button.Ripple color="danger" tag={Link} to="/admin/papermaster/list" outline>
								Cancel
							</Button.Ripple>
						</Col>
					</CardBody>
				</Form>
			</Card>
		</Fragment>
	);
};

export default AddPapermaster;
