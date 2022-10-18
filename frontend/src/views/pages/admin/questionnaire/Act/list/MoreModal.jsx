import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { handelModalClose } from '../../../../../../redux/questionnaireSlice';
const MoreModal = () => {
	const { isModalOpen, modalData } = useSelector((store) => store.questionnaire);
	const dispatch = useDispatch();
	const onHandelModalClose = () => {
		dispatch(handelModalClose(!isModalOpen));
	};
	return (
		<Modal isOpen={isModalOpen} toggle={onHandelModalClose} className="modal-dialog-centered">
			<ModalHeader className="modal-header" toggle={onHandelModalClose}>
				Question
			</ModalHeader>
			<ModalBody className="px-sm-5 mx-50 pb-5">
				<p>{modalData}</p>
			</ModalBody>
		</Modal>
	);
};

export default MoreModal;
