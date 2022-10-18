import React from 'react';
import { ChevronLeft, ArrowLeftCircle, ArrowRightCircle, Tool, Edit3, X } from 'react-feather';
import { ListGroup, ListGroupItem } from 'reactstrap';

function TestFooter() {
	return (
		<div className="main-test-footer">
			<div className="bg-dark text-light test-footer-bar">
				<ListGroup horizontal>
					<ListGroupItem>
						<ChevronLeft size={16} />
						Hide Reviews
					</ListGroupItem>
					<ListGroupItem>
						<Tool size={16} />
						Tools
					</ListGroupItem>
					<ListGroupItem>
						<Edit3 size={18} />
					</ListGroupItem>
					<ListGroupItem>
						<X size={16} />
						Clear Highlight
					</ListGroupItem>
				</ListGroup>
				<ListGroup horizontal>
					<ListGroupItem>
						<ArrowLeftCircle size={16} />
						Previous
					</ListGroupItem>
					<ListGroupItem>
						<ArrowRightCircle size={16} />
						Next
					</ListGroupItem>
				</ListGroup>
			</div>
			<div className="main-footer test-footer">
				<ListGroup horizontal>
					<ListGroupItem>© 2022 by OnCourse, Inc. All rights reserved.</ListGroupItem>
				</ListGroup>
			</div>
		</div>
	);
}
export default TestFooter;
