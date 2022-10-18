import React, { useEffect, useState } from 'react';
import {
	Row,
	Col,
	Modal,
	Label,
	Input,
	Button,
	ModalBody,
	InputGroup,
	ModalHeader,
	FormGroup,
	CustomInput,
	Media,
	Form,
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
	handleResetSubjectData,
	SubjectEditRequest,
	toggleEditModal,
} from '../../../../redux/subjectSlice';

function EditSubjectModal() {
	const dispatch = useDispatch();

	const { isEditModalShow, getSubject, error, editSubject } = useSelector((state) => state.subject);
	const [formValues, setFormsValues] = useState({
		subject_name: '',
		subject_image: null,
		status: 'active',
	});
	const [img, setImg] = useState(null);

	const renderimagefun = () => {
		return (
			<img
				className="user-avatar rounded mr-2 my-25 cursor-pointer"
				src={
					img !== null
						? `${img}`
						: `http://localhost:5000/admin/upload/subjectImage/${formValues.subject_image}`
				}
				height="90"
				width="90"
			/>
		);
	};

	useEffect(() => {
		setFormsValues({
			subject_name: getSubject?.subject_name,
			subject_image: getSubject?.subject_image,
			status: getSubject?.status,
		});
	}, [getSubject]);

	const handleChangeInput = (e) => {
		setFormsValues({ ...formValues, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { subject_name, status, subject_image } = formValues;

		await dispatch(
			SubjectEditRequest({
				id: getSubject._id,
				editedData: formValues,
			})
		);
	};

	const onChange = (e) => {
		const reader = new FileReader(),
			files = e.target.files;
		reader.onload = function () {
			setImg(reader.result);
			setFormsValues({ ...formValues, subject_image: reader.result });
		};
		reader.readAsDataURL(files[0]);
	};

	const handleResetFormData = () => {
		setFormsValues({
			subject_name: '',
			subject_image: null,
			status: 'active',
		});
	};

	const handleModalClose = () => {
		dispatch(toggleEditModal(!isEditModalShow));
		handleResetFormData();
		dispatch(handleResetSubjectData());
	};

	useEffect(() => {
		if (editSubject !== null) {
			handleResetFormData();
			dispatch(handleResetSubjectData());
		}
	}, [editSubject, dispatch]);
	return (
		<Modal isOpen={isEditModalShow} toggle={handleModalClose} className="modal-dialog-centered">
			<ModalHeader className="modal-header" toggle={handleModalClose}>
				Edit Subject
			</ModalHeader>
			<ModalBody className="px-sm-5 mx-50 pb-5">
				<h1 className="text-center mb-1"></h1>
				<Form onSubmit={handleSubmit}>
					<Row className="gy-1 gx-2 mt-75">
						<Col sm="12">
							<Label for="image">Subject Icone</Label>
							<Media className="mb-2">
								{renderimagefun()}
								<Media className="mt-50" body>
									<div className="d-flex flex-wrap mt-1 px-0">
										<Button.Ripple
											id="change-img"
											tag={Label}
											className="mr-75 mb-0"
											color="primary"
										>
											Upload
											<Input
												type="file"
												hidden
												id="change-img"
												accept="image/*"
												onChange={(e) => onChange(e)}
											/>
										</Button.Ripple>
										<Button.Ripple
											color="danger"
											outline
											onClick={() => {
												setImg(
													'https://grandimageinc.com/wp-content/uploads/2015/09/icon-user-default.png'
												);
												setFormsValues({
													...formValues,
													subject_image:
														'https://grandimageinc.com/wp-content/uploads/2015/09/icon-user-default.png',
												});
											}}
										>
											Remove
										</Button.Ripple>
									</div>
								</Media>
							</Media>
						</Col>
						<Col sm="12">
							<FormGroup className="mb-2">
								<Label className="form-label required" for="subject_name">
									Subject Name
								</Label>
								<InputGroup
									className={
										error && error.subject_name
											? 'is-invalid input-group-merge'
											: 'input-group-merge'
									}
								>
									<Input
										className={error && error.subject_name ? 'is-invalid' : ''}
										type="text"
										name="subject_name"
										placeholder="Subject Name"
										defaultValue={getSubject?.subject_name}
										onChange={handleChangeInput}
									/>
								</InputGroup>
								{error && error.subject_name ? (
									<small className="error">{error.subject_name}</small>
								) : null}
							</FormGroup>
						</Col>

						<Col md="6" sm="12">
							<Label for="status" className="required">
								Status
							</Label>
							<FormGroup className="d-flex">
								<CustomInput
									type="radio"
									id="status_yes"
									name="status"
									inline
									label="ACTIVE"
									defaultValue="active"
									checked={formValues?.status === 'active' ? true : false}
									onChange={handleChangeInput}
								/>

								<CustomInput
									type="radio"
									id="status_no"
									name="status"
									inline
									label="INACTIVE"
									defaultValue="inactive"
									checked={formValues?.status === 'inactive' ? true : false}
									onChange={handleChangeInput}
								/>
							</FormGroup>
						</Col>

						<Col className="text-center mt-1" xs={12}>
							<Button.Ripple type="submit" className="mb-1 mb-sm-0 mr-0 mr-sm-1" color="primary">
								Submit
							</Button.Ripple>
							<Button.Ripple type="reset" color="danger" outline onClick={handleModalClose}>
								Cancel
							</Button.Ripple>
						</Col>
					</Row>
				</Form>
			</ModalBody>
		</Modal>
	);
}

export default EditSubjectModal;
