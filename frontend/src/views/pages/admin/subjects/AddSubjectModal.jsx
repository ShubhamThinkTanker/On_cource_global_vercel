import React, { useEffect, useState } from 'react';
import {
	Row,
	Col,
	Modal,
	Label,
	Input,
	Button,
	ModalBody,
	ModalHeader,
	FormGroup,
	CustomInput,
	Form,
	Media,
	InputGroup,
} from 'reactstrap';
import { CreateSubjectRequest, handleResetSubjectData } from '../../../../redux/subjectSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toggleAddModal } from '../../../../redux/subjectSlice';
import { Link } from 'react-feather';

function AddSubjectModal() {
	const dispatch = useDispatch();
	const { error, isAddModalShow, createdSubject } = useSelector((state) => state?.subject);
	const [formValues, setFormsValues] = useState({
		subject_name: '',
		subject_image: null,
		status: 'active',
	});

	const [img, setImg] = useState(
		'https://grandimageinc.com/wp-content/uploads/2015/09/icon-user-default.png'
	);

	const onChange = (e) => {
		if (e.target.files && e.target.files.length > 0) {
			const reader = new FileReader();
			reader.addEventListener('load', () => {
				setImg(reader.result);

				setFormsValues({ ...formValues, subject_image: reader.result });
			});
			reader.readAsDataURL(e.target.files[0]);
		}
	};
	const handleChangeInput = (e) => {
		setFormsValues({ ...formValues, [e.target.name]: e.target.value });
	};

	const handleResetFormData = () => {
		setFormsValues({
			subject_image: null,
			subject_name: '',
			status: 'active',
		});
		setImg('https://grandimageinc.com/wp-content/uploads/2015/09/icon-user-default.png');
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		const { subject_image, subject_name, status } = formValues;
		const formData = new FormData();
		formData.append('subject_image', subject_image);
		formData.append('subject_name', subject_name);
		formData.append('status', status);
		await dispatch(CreateSubjectRequest(formData));
	};

	const handleModalClose = () => {
		dispatch(toggleAddModal(!isAddModalShow));
		handleResetFormData();
		dispatch(handleResetSubjectData());
	};

	useEffect(() => {
		if (createdSubject !== null) {
			handleResetFormData();
			dispatch(handleResetSubjectData());
		}
	}, [createdSubject, dispatch]);

	return (
		<Modal isOpen={isAddModalShow} toggle={handleModalClose} className="modal-dialog-centered">
			<ModalHeader className="modal-header" toggle={handleModalClose}>
				Add Subject
			</ModalHeader>

			<ModalBody className="px-sm-5 mx-50 pb-5">
				<h1 className="text-center mb-1"></h1>
				<Form onSubmit={handleSubmit}>
					<Row>
						<Col>
							<Label for="subject_image">Subject Icone</Label>
							<Media className="mb-2">
								<img
									className="user-avatar rounded mr-2 my-25 cursor-pointer"
									src={img}
									height="90"
									width="90"
								/>
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
												name="subject_image"
												onChange={onChange}
												accept="image/*"
											/>
										</Button.Ripple>
										<Button.Ripple
											color="danger"
											outline
											onClick={() =>
												setImg(
													'https://grandimageinc.com/wp-content/uploads/2015/09/icon-user-default.png'
												)
											}
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
										value={formValues.subject_name}
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
									defaultChecked
									label="ACTIVE"
									checked={formValues.status === 'active' ? true : false}
									defaultValue="active"
									onChange={handleChangeInput}
								/>

								<CustomInput
									type="radio"
									id="status_no"
									name="status"
									inline
									label="INACTIVE"
									checked={formValues.status === 'inactive' ? true : false}
									defaultValue="inactive"
									onChange={handleChangeInput}
								/>
							</FormGroup>
						</Col>

						<Col className="text-center mt-1" xs={12}>
							<Button.Ripple
								className="mb-1 mb-sm-0 mr-0 mr-sm-1"
								color="primary"
								onClick={handleSubmit}
							>
								Save & New
							</Button.Ripple>
							<Button.Ripple type="submit" className="mb-1 mb-sm-0 mr-0 mr-sm-1" color="primary">
								Save & Exit
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

export default AddSubjectModal;
