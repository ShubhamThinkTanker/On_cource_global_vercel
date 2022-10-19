import React from 'react';
import { Book } from 'react-feather';
import { Container, Row } from 'reactstrap';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MyTestCard from './MyTestCard';

function MyCourse() {
	return (
		<>
			<Header />
			<Container>
				<h2 className="my-test-title">My Tests</h2>
				<Row>
					<MyTestCard
						testProgress="Progress 0%"
						stats="Act Test 19"
						statTitle="by oncourse global"
						// button={Button}
					/>
					<MyTestCard
						testProgress="Progress 0%"
						stats="Gmat Test 2"
						statTitle="by oncourse global"
					/>
				</Row>
			</Container>
			<Footer />
		</>
	);
}
export default MyCourse;
