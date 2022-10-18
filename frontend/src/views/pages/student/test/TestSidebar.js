import React, { useState } from 'react';
import { Circle, Flag } from 'react-feather';
import { ListGroup, ListGroupItem, Collapse, Button, CardBody, Card } from 'reactstrap';

const TestSidebar = (args) => {
	const [isOpen, setIsOpen] = useState(true);

	const toggle = () => setIsOpen(!isOpen);
	return (
		<div className="test-sidebar">
			<ListGroup>
				<ListGroupItem className="text-left test-status-btn">Test Status</ListGroupItem>
				<ListGroupItem>
					<span>
						<Circle size={16} />
						Answered
					</span>
					<span>0/60</span>
				</ListGroupItem>
				<ListGroupItem>
					<span>
						<Circle size={16} />
						Unanswered
					</span>
					<span>60/60</span>
				</ListGroupItem>
				<ListGroupItem>
					<span>
						<Flag size={16} />
						Flagged
					</span>
					<span>0/60</span>
				</ListGroupItem>
			</ListGroup>

			<ListGroup className="test-options">
				<ListGroupItem>
					<span>All</span>
					<span>
						<Circle size={16} />
					</span>
					<span>
						<Flag size={16} />
					</span>
				</ListGroupItem>
			</ListGroup>
			<React.StrictMode>
				<Button color="primary" className="text-left test-status-btn" onClick={toggle}>
					Mathematics
				</Button>
				<Collapse isOpen={isOpen} {...args}>
					<Card>
						<CardBody>
							<ListGroup>
								<ListGroupItem>
									<span>
										<Circle size={16} />
										Item 1
									</span>
								</ListGroupItem>
								<ListGroupItem>
									<span>
										<Circle size={16} />
										Item 2
									</span>
								</ListGroupItem>
								<ListGroupItem>
									<span>
										<Circle size={16} />
										Item 3
									</span>
								</ListGroupItem>
								<ListGroupItem>
									<span>
										<Circle size={16} />
										Item 4
									</span>
								</ListGroupItem>
								<ListGroupItem>
									<span>
										<Circle size={16} />
										Item 5
									</span>
								</ListGroupItem>
							</ListGroup>
						</CardBody>
					</Card>
				</Collapse>
			</React.StrictMode>
		</div>
	);
};

export default TestSidebar;
