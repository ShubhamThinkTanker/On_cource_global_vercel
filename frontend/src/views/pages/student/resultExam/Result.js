// import React, { useState, useEffect } from 'react';
// import { CheckCircle, XCircle } from 'react-feather';
// import { Collapse, Button, ListGroup } from 'reactstrap';
// import Table from './Table';
// import Select from 'react-select';
// import { Edit, Trash2 } from 'react-feather';
// import Avatar from '@components/avatar';
// import { Badge } from 'reactstrap';

// import {
// 	GetAllSubjectRequest,
// 	GetStudentResultRequest,
// 	handleStudentDetails,
// } from '../../../../redux/resultSlice';
// import { useDispatch, useSelector } from 'react-redux';
// const Result = (args) => {
// 	const [isOpen, setIsOpen] = useState(false);
// 	const [values, setValues] = useState({
// 		subject_name: '',
// 	});
// 	const { subjectData, isLoading, resultData, studentResultDetails } = useSelector(
// 		(store) => store.result
// 	);
// 	const dispatch = useDispatch();

// 	const toggle = () => setIsOpen(true);

// 	const renderSubject = (row) => {
// 		const stateNum = Math.floor(Math.random() * 6),
// 			states = [
// 				'light-success',
// 				'light-danger',
// 				'light-warning',
// 				'light-info',
// 				'light-primary',
// 				'light-secondary',
// 			],
// 			color = states[stateNum];
// 		if (row?.subject_image?.length) {
// 			return (
// 				<Avatar
// 					className="mr-1"
// 					width="32"
// 					height="32"
// 					img={`http://localhost:5000/admin/upload/subjectImage/${row.subject_image}`}
// 				/>
// 			);
// 		} else {
// 			return (
// 				<Avatar
// 					width="32"
// 					height="32"
// 					color={color || 'primary'}
// 					className="mr-1"
// 					content={row?.subject_name || ''}
// 					initials
// 				/>
// 			);
// 		}
// 	};
// 	const columns = [
// 		{
// 			name: 'Question Number',
// 			selector: 'question_number',
// 			sortable: true,
// 			cell: (row) => <div className="d-flex flex-column">{row.que}</div>,
// 		},
// 		{
// 			name: 'Question',
// 			selector: 'question;',
// 			sortable: true,
// 			cell: (row) => <div className="d-flex flex-column">{row.que}</div>,
// 		},
// 		{
// 			name: 'Options ',
// 			selector: 'options',
// 			sortable: false,
// 			cell: (row) => {
// 				return (
// 					<Badge color={row.status === 'active' ? 'light-success' : 'light-danger'} pill>
// 						{row.option}
// 					</Badge>
// 				);
// 			},
// 		},
// 		{
// 			name: 'Results ',
// 			selector: 'results',
// 			sortable: false,
// 			cell: (row) => {
// 				return (
// 					<Badge color={row.status === 'active' ? 'light-success' : 'light-danger'} pill>
// 						{row.option}
// 					</Badge>
// 				);
// 			},
// 		},
// 	];

// 	useEffect(() => {
// 		dispatch(GetAllSubjectRequest());
// 	}, []);

// 	useEffect(() => {
// 		if (values !== '') {
// 			dispatch(GetStudentResultRequest(values.subject_name));
// 		}
// 	}, [values]);

// 	useEffect(() => {
// 		if (resultData && resultData.FindResultOfStudent != undefined) {
// 			resultData.FindResultOfStudent.map((ele) => {
// 				// var a = ele.flag_options;
// 				dispatch(handleStudentDetails(ele.flag_options));
// 			});
// 		}
// 	}, [resultData]);

// 	return (
// 		<div className="container">
// 			<h2 className="student_name">JIVESH DE SOUSA</h2>
// 			<div className="result_table">
// 				<Select
// 					id="subject-select"
// 					name="subject_name"
// 					isClearable={false}
// 					options={subjectData}
// 					classNamePrefix="select"
// 					style={{ borderLeft: 'none' }}
// 					defaultValue={values}
// 					onChange={(e) => setValues({ ...values, subject_name: e.value })}
// 				/>
// 				{/* <Table responsive bordered>
// 					<thead>
// 						<tr>
// 							<th>Section Name</th>
// 							<th>Total Questions</th>
// 							<th>Raw Score</th>
// 							<th>Scaled Score</th>
// 						</tr>
// 					</thead>
// 					<tbody>
// 						<tr>
// 							<th scope="row">Science</th>
// 							<td>40</td>
// 							<td>0</td>
// 							<td>1</td>
// 						</tr>
// 					</tbody>
// 				</Table> */}
// 				<div className="show_section_btn">
// 					<Button color="primary" className="text-left test-status-btn" onClick={toggle}>
// 						Show Section Details
// 					</Button>
// 				</div>
// 				<Table columns={columns} />
// 				<Collapse isOpen={isOpen} {...args}>
// 					<Table className="ans_question_table">
// 						<thead>
// 							<tr>
// 								<th>Question</th>
// 								<th>Options</th>
// 								<th>Result</th>
// 							</tr>
// 						</thead>
// 						<tbody>
// 							<tr>
// 								<th scope="row">1</th>
// 								<td>
// 									<ListGroup>
// 										<li>
// 											a young adult riding a train through the small towns of the Upper Midwest.
// 										</li>
// 										<li>a young adult preparing to move away from her hometown.</li>
// 										<li>an adult missing the new home she has established.</li>
// 										<li className="correct_ans">
// 											an adult reflecting on the past and pondering the present.
// 										</li>
// 									</ListGroup>
// 								</td>
// 								<td>
// 									<p className="unanswered">Unanswered</p>
// 								</td>
// 							</tr>
// 							<tr>
// 								<th scope="row">2</th>
// 								<td>
// 									<ListGroup>
// 										<li>
// 											cosmonaut’s feeling that he is now a citizen of space, not the former Soviet
// 											Union.{' '}
// 										</li>
// 										<li>cosmonaut’s unrealized expectation that he will be treated like a hero.</li>
// 										<li className="correct_ans">
// 											political transformation that occurred while the cosmonaut was in space.
// 										</li>
// 										<li className="wrong_ans">river stage of the eel life cycle.</li>
// 									</ListGroup>
// 								</td>
// 								<td>
// 									<p className="wrong_ans_highlight">
// 										<XCircle size={14} />
// 										Wrong Answer
// 									</p>
// 								</td>
// 							</tr>
// 							<tr>
// 								<th scope="row">3</th>
// 								<td>
// 									<ListGroup>
// 										<li>eels’ transition from freshwater to the ocean. </li>
// 										<li>method of determining the age of eels. ?</li>
// 										<li>complexity of the Mississippi River system. </li>
// 										<li className="correct_ans">river stage of the eel life cycle.</li>
// 									</ListGroup>
// 								</td>
// 								<td>
// 									<p className="right_ans">
// 										<CheckCircle size={14} />
// 										Correct Answer
// 									</p>
// 								</td>
// 							</tr>
// 						</tbody>
// 					</Table>
// 				</Collapse>
// 			</div>
// 		</div>
// 	);
// };
// export default Result;

import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle } from 'react-feather';
import { Collapse, Button, ListGroup, Table } from 'reactstrap';
import ResultTable from './ResultTable';
import Select from 'react-select';
import { Edit, Trash2 } from 'react-feather';
import Avatar from '@components/avatar';
import { Badge, FormGroup, Col } from 'reactstrap';

import {
	GetAllSubjectRequest,
	GetStudentResultRequest,
	handleStudentDetails,
} from '../../../../redux/resultSlice';
import { useDispatch, useSelector } from 'react-redux';
const Result = (args) => {
	const [isOpen, setIsOpen] = useState(false);
	const [values, setValues] = useState({
		subject_name: '',
	});
	const { subjectData, isLoading, resultData, studentResultDetails } = useSelector(
		(store) => store.result
	);

	const dispatch = useDispatch();

	const toggle = () => setIsOpen(true);

	const renderSubject = (row) => {
		const stateNum = Math.floor(Math.random() * 6),
			states = [
				'light-success',
				'light-danger',
				'light-warning',
				'light-info',
				'light-primary',
				'light-secondary',
			],
			color = states[stateNum];
		if (row?.subject_image?.length) {
			return (
				<Avatar
					className="mr-1"
					width="32"
					height="32"
					img={`http://localhost:5000/admin/upload/subjectImage/${row.subject_image}`}
				/>
			);
		} else {
			return (
				<Avatar
					width="32"
					height="32"
					color={color || 'primary'}
					className="mr-1"
					content={row?.subject_name || ''}
					initials
				/>
			);
		}
	};

	const columns = [
		{
			name: 'Question Number',
			selector: 'question_number',
			// sortable: true,
			minWidth: '5%',
			cell: (row) => <div className="d-flex flex-column">{row.question_number}</div>,
		},
		{
			name: 'Options',
			selector: 'options',
			// sortable: true,
			cell: (row) => (
				<td>
					<ListGroup>
						<li className={row.submited_answered == 1 ? 'correct_ans' : 'bg-denger'}>
							{row.options[0][1]}
						</li>
						<li className={row.submited_answered == 2 ? 'correct_ans' : 'bg-denger'}>
							{row.options[0][2]}
						</li>
						<li className={row.submited_answered == 3 ? 'correct_ans' : 'bg-denger'}>
							{row.options[0][3]}
						</li>
						<li className={row.submited_answered == 4 ? 'correct_ans' : 'bg-denger'}>
							{row.options[0][4]}
						</li>
					</ListGroup>
				</td>
			),
		},
		{
			name: 'Results',
			selector: 'results;',
			// sortable: true,
			cell: (row) => (
				// <div className="d-flex flex-column">
				<ListGroup>
					<li className={row.submited_answered == row.answered ? 'text-success' : 'wrong_ans'}>
						Submited answered:-{row.submited_answered}
					</li>
					<li className={row.submited_answered == row.answered ? 'text-success' : 'text-success'}>
						Right answered:-
						{row.answered}
					</li>
				</ListGroup>

				// </div>
			),
		},
	];

	useEffect(() => {
		dispatch(GetAllSubjectRequest());
	}, []);

	useEffect(() => {
		if (values !== '') {
			dispatch(GetStudentResultRequest(values.subject_name));
		}
	}, [values]);

	// useEffect(() => {
	// 	if (resultData && resultData.FindResultOfStudent != undefined) {
	// 		resultData.FindResultOfStudent.map((ele) => {
	// 			// var a = ele.flag_options;
	// 			dispatch(handleStudentDetails(ele.questions));
	// 		});
	// 	}
	// }, [resultData]);

	return (
		<div className="container">
			<div className="result_table">
				<Table responsive bordered>
					<thead>
						<tr>
							<th>Section Name</th>
							<th>Total Questions</th>
							<th>Raw Score</th>
							<th>Scaled Score</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th scope="row">
								<Select
									id="subject-select"
									name="subject_name"
									isClearable={false}
									options={subjectData && subjectData}
									classNamePrefix="select"
									style={{ borderLeft: 'none' }}
									defaultValue={values.subject_name}
									onChange={(e) => setValues({ ...values, subject_name: e.value })}
								/>
								{/* <Select
									id="subject-select"
									name="subject_name"
									isClearable={false}
									options={subjectData && subjectData}
									classNamePrefix="select"
									style={{ borderLeft: 'none' }}
									defaultValue={values.subject_name}
									onChange={(e) => setValues({ ...values, subject_name: e.value })}
								/> */}
							</th>
							<td>40</td>
							<td>0</td>
							<td>1</td>
						</tr>
					</tbody>
				</Table>
			</div>
			<ResultTable columns={columns} />
		</div>
	);
};
export default Result;
