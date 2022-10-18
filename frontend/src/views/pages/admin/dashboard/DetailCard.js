import React, { useEffect } from 'react';
import classnames from 'classnames';
import Avatar from '@components/avatar';
import { useDispatch, useSelector } from 'react-redux';
import { TrendingUp, User, Box, DollarSign, Monitor, Book, BookOpen, Info } from 'react-feather';
import { Card, CardHeader, CardTitle, CardBody, CardText, Row, Col, Media } from 'reactstrap';
import { GetAllSubjectRequest } from '../../../../redux/subjectSlice';
import { GetAllInstrunctionsRequest } from '../../../../redux/instructionsSlice';
import {
	GetAllActQuestionnaireRequest,
	GetAllSatQuestionnaireRequest,
} from '../../../../redux/questionnaireSlice';
import { GetAllStudentListRequest } from '../../../../redux/studentSlice';

const DetailCard = ({ cols }) => {
	const dispatch = useDispatch();

	const { isLoading, subjectData } = useSelector((state) => state?.subject);
	const { isLoading: instructionLoading, instructionsData } = useSelector(
		(state) => state.instructions
	);
	const { isLoading: actquestionnaireLoading, actquestionnaireData } = useSelector(
		(state) => state?.questionnaire
	);
	const { isLoading: satquestionnaireLoading, satquestionnaireData } = useSelector(
		(state) => state?.questionnaire
	);
	var { isLoading: studentListLoading, studentList } = useSelector((state) => state.student);

	useEffect(() => {
		dispatch(GetAllStudentListRequest());
		dispatch(GetAllSubjectRequest());
		dispatch(GetAllInstrunctionsRequest());
		dispatch(GetAllActQuestionnaireRequest());
		dispatch(GetAllSatQuestionnaireRequest());
	}, []);

	const data = [
		{
			title: `${studentList && studentList.TotalActive}`,
			subtitle: 'Students',
			color: 'light-primary',
			icon: <User size={24} />,
		},
		{
			title: `${subjectData && subjectData.TotalActive}`,
			subtitle: 'Subjects',
			color: 'light-info',
			icon: <BookOpen size={24} />,
		},
		{
			title: `${instructionsData && instructionsData.TotalCount}`,
			subtitle: 'Instructions',
			color: 'light-danger',
			icon: <Info size={24} />,
		},
		{
			title: `${actquestionnaireData && actquestionnaireData.TotalCount}`,
			subtitle: 'ACT',
			color: 'light-success',
			icon: <Monitor size={24} />,
		},
		{
			title: `${satquestionnaireData && satquestionnaireData.TotalCount}`,
			subtitle: 'SAT',
			color: 'light-warning',
			icon: <Monitor size={24} />,
		},
	];

	const renderData = () => {
		return data.map((item, index) => {
			const margin = Object.keys(cols);
			return (
				<Col
					key={index}
					{...cols}
					className={classnames({
						[`mb-2 mb-${margin[0]}-0`]: index !== data.length - 1,
					})}
				>
					<Media>
						<Avatar color={item.color} icon={item.icon} className="mr-2" />
						<Media className="my-auto" body>
							<h4 className="font-weight-bolder mb-0">{item.title}</h4>
							<CardText className="font-small-3 mb-0">{item.subtitle}</CardText>
						</Media>
					</Media>
				</Col>
			);
		});
	};

	return (
		<Card className="card-statistics detail-card">
			<CardHeader>
				<CardTitle tag="h4">Statistics</CardTitle>
				<CardText className="card-text font-small-2 mr-25 mb-0">Updated 1 week ago</CardText>
			</CardHeader>
			<CardBody className="statistics-body">
				<Row>{renderData()}</Row>
			</CardBody>
		</Card>
	);
};

export default DetailCard;
