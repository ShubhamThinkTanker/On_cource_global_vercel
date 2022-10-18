// ** Third Party Components
import PropTypes from 'prop-types';
import { Card, CardBody, Button, ListGroup, ListGroupItem } from 'reactstrap';
import { MoreVertical, Trash } from 'react-feather';

const PracticeTestList = ({ icon, color, stats, statTitle, className, buttonName }) => {
	return (
		<Card className="practice-test-list">
			<CardBody className={className}>
				<div className="d-flex justify-content-between align-items-center">
					<div className="d-flex">
						<div
							className={`avatar avatar-stats p-50 m-0 mr-2 ${
								color ? `bg-light-${color}` : 'subject-test-icon'
							}`}
						>
							<div className="avatar-content">{icon}</div>
						</div>
						<div>
							<h5 className="font-weight-bold mb-0">{stats}</h5>
							<p className="card-text">{statTitle}</p>
						</div>
					</div>
					<div className="d-flex align-items-center">
						<Button.Ripple color="primary" outline>
							{buttonName}
						</Button.Ripple>
						<p className="more-option">
							<MoreVertical size={21} />
							<ListGroup vertical className="delete-btn">
								<ListGroupItem>
									<Trash size={20} /> Delete
								</ListGroupItem>
							</ListGroup>
						</p>
					</div>
				</div>
			</CardBody>
		</Card>
	);
};

export default PracticeTestList;

// ** PropTypes
PracticeTestList.propTypes = {
	icon: PropTypes.element.isRequired,
	color: PropTypes.string.isRequired,
	stats: PropTypes.string.isRequired,
	statTitle: PropTypes.string.isRequired,
	buttonName: PropTypes.string.isRequired,
	className: PropTypes.string,
};
