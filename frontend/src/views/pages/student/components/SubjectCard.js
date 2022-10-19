// ** Third Party Components
import PropTypes from 'prop-types';

import {
	Card,
	CardBody,
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	ListGroup,
	ListGroupItem,
} from 'reactstrap';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SubjectCard = ({
	icon,
	color,
	stats,
	isSubjectRowVisible,
	isRowVisible,
	statTitle,
	className,
	args,
	...rest
}) => {
	const [modal, setModal] = useState(false);

	const toggle = () => setModal(!modal);

	const onClick = (stats) => {
		setModal(!modal);
		console.log('stats', stats);
	};
	return (
		<Card className="text-center subject-card">
			<CardBody className={className}>
				<div
					className={`avatar p-50 m-0 mb-1 ${color ? `bg-light-${color}` : 'subject-test-icon'}`}
				>
					<div className="avatar-content">
						<img
							src={`http://localhost:5000/admin/upload/subjectImage/${icon}`}
							height={45}
							width={45}
						/>
					</div>
				</div>
				<h3 className="font-weight-bold">{stats}</h3>
				<p className="card-text line-ellipsis">{statTitle}</p>
				<Button.Ripple color="primary" outline onClick={() => onClick(stats)}>
					Resume Practice Test
				</Button.Ripple>
				{/* <Button.Ripple color="primary" outline tag={Link} to="/student/progress">
					Resume Practice Test
				</Button.Ripple> */}
				<Modal isOpen={modal && isRowVisible} toggle={toggle} className="modal-dialog-centered">
					<ModalHeader toggle={toggle}>
						Rules to follow during all online proctored exams:
					</ModalHeader>
					<ModalBody className="instruction-modal-body">
						<ListGroup>
							<ListGroupItem>You must use a functioning webcam and microphone</ListGroupItem>
							<ListGroupItem>
								No cell phones or other secondary devices in the room or test area
							</ListGroupItem>
							<ListGroupItem>
								Your desk/table must be clear or any materials except your test-taking device
							</ListGroupItem>
							<ListGroupItem>No one else can be in the room with you</ListGroupItem>
							<ListGroupItem>No talking</ListGroupItem>
							<ListGroupItem>
								The testing room must be well-lit and you must be clearly visible
							</ListGroupItem>
							<ListGroupItem>No dual screens/monitors</ListGroupItem>
							<ListGroupItem>Do not leave the camera </ListGroupItem>
							<ListGroupItem>No use of additional applications or internet</ListGroupItem>
						</ListGroup>
					</ModalBody>
					<ModalFooter>
						<>
							<Link to="/student/test">
								<Button color="primary">Accept</Button>
							</Link>
						</>
						<Button color="secondary" onClick={toggle}>
							Cancel
						</Button>
					</ModalFooter>
				</Modal>

				<Modal
					isOpen={modal && isSubjectRowVisible}
					toggle={toggle}
					className="modal-dialog-centered"
				>
					<ModalHeader toggle={toggle}>
						Rules to follow during all online proctored exams:
					</ModalHeader>
					<ModalBody className="instruction-modal-body">
						{/* <h4>Work is under Progress</h4> */}
						<ListGroup>
							<ListGroupItem>You must use a functioning webcam and microphone</ListGroupItem>
							<ListGroupItem>
								No cell phones or other secondary devices in the room or test area
							</ListGroupItem>
							<ListGroupItem>
								Your desk/table must be clear or any materials except your test-taking device
							</ListGroupItem>
							<ListGroupItem>No one else can be in the room with you</ListGroupItem>
							<ListGroupItem>No talking</ListGroupItem>
							<ListGroupItem>
								The testing room must be well-lit and you must be clearly visible
							</ListGroupItem>
							<ListGroupItem>No dual screens/monitors</ListGroupItem>
							<ListGroupItem>Do not leave the camera </ListGroupItem>
							<ListGroupItem>No use of additional applications or internet</ListGroupItem>
						</ListGroup>
					</ModalBody>
					<ModalFooter>
						<>
							{/* <Link to="/student/progress">
								<Button color="primary">Accept</Button>
							</Link> */}
							<Link to="/student/test/subject">
								<Button color="primary">Accept</Button>
							</Link>
						</>
						<Button color="secondary" onClick={toggle}>
							Cancel
						</Button>
					</ModalFooter>
				</Modal>
			</CardBody>
		</Card>
	);
};

export default SubjectCard;

// ** PropTypes
SubjectCard.propTypes = {
	icon: PropTypes.element.isRequired,
	color: PropTypes.string.isRequired,
	stats: PropTypes.string.isRequired,
	statTitle: PropTypes.string.isRequired,
	className: PropTypes.string,
};
