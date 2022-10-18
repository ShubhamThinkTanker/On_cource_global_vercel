import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

function Footer() {
	return (
		<div className="main-footer">
			<div className="container">
				<ListGroup horizontal>
					<ListGroup vertical>
						<ListGroupItem tag="h4">Contact Infromation</ListGroupItem>
						<ListGroupItem href="mailto:info@oncourseglobal.com" tag="a">
							info@oncourseglobal.com
						</ListGroupItem>
						<ListGroup horizontal className="footer-social-icons">
							<ListGroupItem href="https://www.facebook.com/OnCourseVantage/" tag="a">
								<svg
									fill="#ffffff"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									width="24px"
									height="24px"
								>
									{' '}
									<path d="M17.525,9H14V7c0-1.032,0.084-1.682,1.563-1.682h1.868v-3.18C16.522,2.044,15.608,1.998,14.693,2 C11.98,2,10,3.657,10,6.699V9H7v4l3-0.001V22h4v-9.003l3.066-0.001L17.525,9z" />
								</svg>
							</ListGroupItem>
							<ListGroupItem href="https://www.facebook.com/OnCourseVantage/" tag="a">
								<svg
									fill="#ffffff"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									width="24px"
									height="24px"
								>
									<path d="M 24 4.300781 C 23.101563 4.699219 22.199219 5 21.199219 5.101563 C 22.199219 4.5 23 3.5 23.398438 2.398438 C 22.398438 3 21.398438 3.398438 20.300781 3.601563 C 19.300781 2.601563 18 2 16.601563 2 C 13.898438 2 11.699219 4.199219 11.699219 6.898438 C 11.699219 7.300781 11.699219 7.699219 11.800781 8 C 7.699219 7.800781 4.101563 5.898438 1.699219 2.898438 C 1.199219 3.601563 1 4.5 1 5.398438 C 1 7.101563 1.898438 8.601563 3.199219 9.5 C 2.398438 9.398438 1.601563 9.199219 1 8.898438 C 1 8.898438 1 8.898438 1 9 C 1 11.398438 2.699219 13.398438 4.898438 13.800781 C 4.5 13.898438 4.101563 14 3.601563 14 C 3.300781 14 3 14 2.699219 13.898438 C 3.300781 15.898438 5.101563 17.300781 7.300781 17.300781 C 5.601563 18.601563 3.5 19.398438 1.199219 19.398438 C 0.800781 19.398438 0.398438 19.398438 0 19.300781 C 2.199219 20.699219 4.800781 21.5 7.5 21.5 C 16.601563 21.5 21.5 14 21.5 7.5 C 21.5 7.300781 21.5 7.101563 21.5 6.898438 C 22.5 6.199219 23.300781 5.300781 24 4.300781" />
								</svg>
							</ListGroupItem>
							<ListGroupItem href="https://www.facebook.com/OnCourseVantage/" tag="a">
								<svg
									fill="#ffffff"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 50 50"
									width="50px"
									height="50px"
								>
									{' '}
									<path d="M 8 3.0097656 C 4.53 3.0097656 2.0097656 5.0892187 2.0097656 7.9492188 C 2.0097656 10.819219 4.59 12.990234 8 12.990234 C 11.47 12.990234 13.990234 10.870625 13.990234 7.890625 C 13.830234 5.020625 11.36 3.0097656 8 3.0097656 z M 3 15 C 2.45 15 2 15.45 2 16 L 2 45 C 2 45.55 2.45 46 3 46 L 13 46 C 13.55 46 14 45.55 14 45 L 14 16 C 14 15.45 13.55 15 13 15 L 3 15 z M 18 15 C 17.45 15 17 15.45 17 16 L 17 45 C 17 45.55 17.45 46 18 46 L 27 46 C 27.552 46 28 45.552 28 45 L 28 30 L 28 29.75 L 28 29.5 C 28 27.13 29.820625 25.199531 32.140625 25.019531 C 32.260625 24.999531 32.38 25 32.5 25 C 32.62 25 32.739375 24.999531 32.859375 25.019531 C 35.179375 25.199531 37 27.13 37 29.5 L 37 45 C 37 45.552 37.448 46 38 46 L 47 46 C 47.55 46 48 45.55 48 45 L 48 28 C 48 21.53 44.529063 15 36.789062 15 C 33.269062 15 30.61 16.360234 29 17.490234 L 29 16 C 29 15.45 28.55 15 28 15 L 18 15 z" />
								</svg>
							</ListGroupItem>
							<ListGroupItem href="https://www.facebook.com/OnCourseVantage/" tag="a">
								<svg
									fill="#ffffff"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 50 50"
									width="24px"
									height="24px"
								>
									<path d="M34,3H16C8.83,3,3,8.83,3,16v18c0,7.17,5.83,13,13,13h18c7.17,0,13-5.83,13-13V16C47,8.83,41.17,3,34,3z M25,36c-6.07,0-11-4.93-11-11s4.93-11,11-11s11,4.93,11,11S31.07,36,25,36z M37,15c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2S38.1,15,37,15z" />
									<path d="M34,25c0,4.96-4.04,9-9,9s-9-4.04-9-9s4.04-9,9-9S34,20.04,34,25z" />
								</svg>
							</ListGroupItem>
						</ListGroup>
					</ListGroup>
					<ListGroup vertical className="footer-links-col">
						<ListGroupItem tag="h4">Links</ListGroupItem>
						<ListGroupItem href="" tag="a">
							Undergraduate
						</ListGroupItem>
						<ListGroupItem href="" tag="a">
							Postgraduate
						</ListGroupItem>
						<ListGroupItem href="" tag="a">
							OnCourse Life Courses
						</ListGroupItem>
						<ListGroupItem href="" tag="a">
							K-12 Courses
						</ListGroupItem>
						<ListGroupItem href="" tag="a">
							Test Prep
						</ListGroupItem>
					</ListGroup>
					<ListGroup vertical>
						<ListGroupItem tag="h4">Our Offices</ListGroupItem>
						<ListGroupItem className="address-col">
							<p>Mumbai Office (Worli)</p>
							No. 403C, ‘B’ Wing, Poonam Chambers, 4th Floor Dr. Annie Besant Road, Worli, Mumbai
							400018
							<p className="tel_p">
								Phone:&nbsp;<a href="tel:91 22 6145 3737">+91 22 6145 3737</a>
							</p>
						</ListGroupItem>
						<ListGroupItem className="address-col">
							<p>Ahmedabad Office</p>
							'Anand' Bungalow, Next to 426 Apartments, Vastapur-Thaltej Rd, Ahmedabad 380054
							<p className="tel_p">
								Phone:&nbsp;<a href="tel:91 99 7989 3737">+91 99 7989 3737</a>
							</p>
						</ListGroupItem>
					</ListGroup>
					<ListGroup vertical>
						<ListGroupItem tag="h4" className="second-col-address"></ListGroupItem>
						<ListGroupItem className="address-col">
							<p>Delhi Office</p>
							E-92 Anand Niketan, New Delhi-110021
							<p className="tel_p">
								Phone:&nbsp;&nbsp;<a href="tel:91 11 49452525">+91 11 49452525</a>
							</p>
						</ListGroupItem>
						<ListGroupItem className="address-col">
							<p>Gurgaon Office</p>
							Batra House 52, Institutional Area, Sector 32, Gurgaon, Haryana-122009
							<p className="tel_p">
								Phone:&nbsp;<a href="tel:+9101244171200">0124-4171200</a>
							</p>
						</ListGroupItem>
					</ListGroup>
				</ListGroup>
			</div>
		</div>
		// <CardGroup>
		// 	<Card>
		// 		<CardBody>
		// 			<CardTitle tag="h5">Contact Information</CardTitle>
		// 			<CardText className="mb-2 text-muted" tag="a" href="mailto:info@oncourseglobal.com">
		//                 info@oncourseglobal.com
		// 			</CardText>
		// 			<CardText href="#" tag="a">
		//                 <i class="fa fa-facebook"></i>
		// 			</CardText>
		//             <CardText href="#" tag="a">
		// 				Linkkkk
		// 			</CardText>
		// 			<Button>Button</Button>
		// 		</CardBody>
		// 	</Card>
		// 	<Card>
		// 		<CardBody>
		// 			<CardTitle tag="h5">Card title</CardTitle>
		// 			<CardSubtitle className="mb-2 text-muted" tag="h6">
		// 				Card subtitle
		// 			</CardSubtitle>
		// 			<CardText>
		// 				This card has supporting text below as a natural lead-in to additional content.
		// 			</CardText>
		// 			<Button>Button</Button>
		// 		</CardBody>
		// 	</Card>
		// 	<Card>
		// 		<CardBody>
		// 			<CardTitle tag="h5">Card title</CardTitle>
		// 			<CardSubtitle className="mb-2 text-muted" tag="h6">
		// 				Card subtitle
		// 			</CardSubtitle>
		// 			<CardText>
		// 				This is a wider card with supporting text below as a natural lead-in to additional
		// 				content. This card has even longer content than the first to show that equal height
		// 				action.
		// 			</CardText>
		// 			<Button>Button</Button>
		// 		</CardBody>
		// 	</Card>
		// </CardGroup>
	);
}
export default Footer;
