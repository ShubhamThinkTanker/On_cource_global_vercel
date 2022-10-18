import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Avatar from '@components/avatar';
import { Badge } from 'reactstrap';
import { Card, CardTitle, CardHeader } from 'reactstrap';
import DataTable from 'react-data-table-component';
import { GetAllSubjectRequest } from '../../../../redux/subjectSlice';
const SubjectTable = () => {
	const dispatch = useDispatch();
	const { subjectData, isLoading } = useSelector((state) => state?.subject);
	useEffect(() => {
		dispatch(GetAllSubjectRequest());
	}, []);

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
			name: 'Subject Image',
			selector: 'subject_image',
			cell: (row) => (
				<div className="d-flex justify-content-left align-items-center ml-2">
					{renderSubject(row)}
				</div>
			),
		},
		{
			name: 'Subject Name',
			selector: 'subject_name',

			cell: (row) => <div className="d-flex flex-column ml-2">{row.subject_name}</div>,
		},
		{
			name: 'Status ',
			selector: 'status',
			sortable: true,
			cell: (row) => {
				return (
					<Badge color={row.status === 'active' ? 'light-success' : 'light-danger'} pill>
						{row.status.toUpperCase()}
					</Badge>
				);
			},
		},
	];
	return (
		<>
			<div className="subject-title">
				<h4>Subject Table</h4>
				<Link
					style={{ textAlign: 'right' }}
					to={'/admin/subjects/list'}
					className="view-all-subject"
				>
					View All
				</Link>
			</div>
			<Card className="overflow-hidden">
				<DataTable
					className="react-dataTable subject-table"
					noHeader
					columns={columns}
					data={
						subjectData?.Subject_Details &&
						subjectData?.Subject_Details.slice(0, 5).map((item) => {
							return item;
						})
					}
					// data={subjectData?.Subject_Details}
					paginationTotalRows={subjectData?.TotalCount}
					sortServer={true}
					striped={true}
					loading={isLoading}
					// subHeader
				/>
			</Card>
		</>
	);
};

export default SubjectTable;
