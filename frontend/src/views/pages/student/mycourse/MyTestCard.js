// ** Third Party Components
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
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
	Col,
	CardHeader,
} from 'reactstrap';

import { Link } from 'react-router-dom';
import logoOncourse from '@src/assets/images/logo/favicon.ico';
import { useDispatch } from 'react-redux';
import { toggleSubjectCard } from '../../../../redux/subjectSlice';
const MyTestCard = ({
	testProgress,
	stats,
	statTitle,
	buttonReport,
	className,
	args,
	isRowVisible,
	...rest
}) => {
	// const Button = () => {
	// 	return <button onClick={() => console.log('button clicked')}>Go to</button>;
	// };
	const dispatch = useDispatch();
	return (
		<Col md="3">
			<Card className="text-center subject-card mytest-card-main">
				<CardHeader>
					<div className="test-overlay"></div>
					<div className="mytest-card-header">
						{/* <Button.Ripple color="primary" className="my-test-button" outline>
							{buttonReport}
						</Button.Ripple> */}

						<span className="my-test-progress">{testProgress}</span>
						<Button.Ripple
							color="primary"
							className="my-test-button"
							outline
							onClick={() => dispatch(toggleSubjectCard(true))}
						>
							Go to Test
						</Button.Ripple>
					</div>
				</CardHeader>
				<CardBody className={className}>
					<h4 className="my-test-heading">{stats}</h4>
					<p className="card-text line-ellipsis">
						{statTitle}
						<img src={logoOncourse} />
					</p>
				</CardBody>
			</Card>
		</Col>
	);
};

export default MyTestCard;

// ** PropTypes
MyTestCard.propTypes = {
	icon: PropTypes.element.isRequired,
	color: PropTypes.string.isRequired,
	stats: PropTypes.string.isRequired,
	statTitle: PropTypes.string.isRequired,
	className: PropTypes.string,
};
