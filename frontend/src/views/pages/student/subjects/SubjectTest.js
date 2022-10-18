import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Button } from 'reactstrap';
import { Bookmark, BookOpen, Divide, Compass, Link } from 'react-feather';
import SubjectCard from '../components/SubjectCard';
import PracticeTestList from '../components/PracticeTestList';
import { GetAllSubjectRequest } from '../../../../redux/subjectSlice';
import MyTestCard from '../mycourse/MyTestCard';

const SubjectTest = () => {
	const [isRowVisible, setIsRowVisible] = useState(false);
	const [isSubjectRowVisible, setIsSubjectRowVisible] = useState(false);
	const dispatch = useDispatch();
	const { subjectData } = useSelector((state) => state?.subject);

	useEffect(() => {
		dispatch(GetAllSubjectRequest());
	}, []);
	return (
		<div className="container">
			<Row>
				<Col className="subject-test-col">
					<div style={{ display: 'flex', justifyContent: 'center' }}>
						<div>
							<h2 className="subject-test-title">
								<center>Subjects</center>
							</h2>
						</div>
					</div>
					<div style={{ display: 'flex', justifyContent: 'center' }}>
						<div style={{ margin: '12px' }}>
							<Button.Ripple
								color="primary"
								outline
								onClick={() => {
									setIsRowVisible(true);
									setIsSubjectRowVisible(false);
								}}
							>
								Full Course Test Start
							</Button.Ripple>
						</div>
						<div style={{ margin: '12px' }}>
							<Button.Ripple
								color="primary"
								outline
								onClick={() => {
									setIsSubjectRowVisible(true);
									setIsRowVisible(false);
								}}
							>
								Select Subject & Start Test
							</Button.Ripple>
						</div>
					</div>

					{isRowVisible && (
						<Row>
							{/* <Col xl="6" md="8" sm="12">
								<SubjectCard
									stats="Full Course Test Start"
									statTitle="The section consists of many questions"
									isRowVisible={isRowVisible}
									icon="download.jpeg"
									// isSubjectRowVisible={isSubjectRowVisible}
								/> */}
							<MyTestCard
								testProgress="Progress 0%"
								stats="Act Test 19"
								statTitle="by oncourse global"
								isRowVisible={isRowVisible}
							/>
							{/* </Col> */}
						</Row>
					)}

					{isSubjectRowVisible && (
						<Row>
							{subjectData &&
								subjectData['Subject_Details'].map((e) => (
									<>
										{/* <Col xl="6" md="8" sm="12">
											<SubjectCard
												icon={e.subject_image}
												stats={e.subject_name}
												statTitle="The section consists of many questions"
												isSubjectRowVisible={isSubjectRowVisible}
												// isRowVisible={isRowVisible}
											/>
										</Col> */}
										<MyTestCard
											testProgress="Progress 0%"
											stats="Act Test 19"
											statTitle="by oncourse global"
											isSubjectRowVisible={isSubjectRowVisible}
										/>
									</>
								))}
						</Row>
					)}
				</Col>

				{/* <Col xl="6" md="8" sm="12" className="subject-test-col">
					<h2 className="subject-test-title">
						<center>Practice Test Progress</center>
					</h2>
					<div className="practice-test-list-main">
						<Row>
							<Col xl="12" md="12" sm="12">
								<PracticeTestList
									icon={<Divide size={21} />}
									color=""
									stats="Mathematics Practice Test"
									statTitle="Started on Sep. 02"
									buttonName="Resume"
								/>
							</Col>
						</Row>
						<Row>
							<Col xl="12" md="12" sm="12">
								<PracticeTestList
									icon={<Bookmark size={21} />}
									color=""
									stats="English Practice Test"
									statTitle="Started on Sep. 02"
									buttonName="View Result"
								/>
							</Col>
						</Row>
						<Row>
							<Col xl="12" md="12" sm="12">
								<PracticeTestList
									icon={<BookOpen size={21} />}
									color=""
									stats="Reading Practice Test"
									statTitle="Started on Sep. 02"
									buttonName="View Result"
								/>
							</Col>
						</Row>
						<Row>
							<Col xl="12" md="12" sm="12">
								<PracticeTestList
									icon={<Compass size={21} />}
									color=""
									stats="Science Practice Test"
									statTitle="Started on Sep. 02"
									buttonName="View Result"
								/>
							</Col>
						</Row>
						<Row>
							<Col xl="12" md="12" sm="12">
								<PracticeTestList
									icon={<Bookmark size={21} />}
									color=""
									stats="English Practice Test"
									statTitle="Started on Sep. 02"
									buttonName="Resume"
								/>
							</Col>
						</Row>
						<Row>
							<Col xl="12" md="12" sm="12">
								<PracticeTestList
									icon={<Bookmark size={21} />}
									color=""
									stats="English Practice Test"
									statTitle="Started on Sep. 02"
									buttonName="View Result"
								/>
							</Col>
						</Row>
					</div>
				</Col> */}
			</Row>
		</div>
	);
};
export default SubjectTest;
