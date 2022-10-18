import { Button, Card, CardTitle, CardBody, CardText, Row, Col, CardImg } from 'reactstrap';
import img1 from '@src/assets/images/slider/logo-act-blue.png';
import { Link } from 'react-router-dom';
import StudentDashboardBg from '@src/assets/images/backgrounds/bg-image2.jpg';

const CardOption = () => {
	return (
		<>
			<div
				className="student-dashboard-bg dark-overlay"
				style={{ backgroundImage: `url(${StudentDashboardBg})` }}
			></div>
			<div className="student-dashboard container">
				<Row className="match-height justify-content-center">
					<Col lg="4" md="6" className="col-card-options">
						<Card>
							<div className="card-image">
								<CardImg top src={img1} alt="Card cap" />
							</div>
							<CardBody>
								<CardTitle tag="h4">ACT</CardTitle>
								<CardText>
									Some quick example text to build on the card title and make up the bulk of the
									card's content.
								</CardText>
								<Link to="/student/subjects">
									<Button.Ripple color="primary" outline>
										Click for ACT Online Tests
									</Button.Ripple>
								</Link>
							</CardBody>
						</Card>
					</Col>
					<Col lg="4" md="6" className="col-card-options">
						<Card>
							<div className="card-image">
								<CardImg top src={img1} alt="Card cap" />
							</div>
							<CardBody>
								<CardTitle tag="h4" className="text-center">
									SAT
								</CardTitle>
								<CardText>
									Some quick example text to build on the card title and make up the bulk of the
									card's content.
								</CardText>
								<Link to="/student/subjects">
									<Button.Ripple color="primary" outline>
										Click for SAT Online Tests
									</Button.Ripple>
								</Link>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</div>
		</>
	);
};
export default CardOption;
