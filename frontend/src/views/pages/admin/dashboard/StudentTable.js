import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Table } from 'reactstrap';
import { Link } from 'react-router-dom';

import DataTable from 'react-data-table-component';
import { GetAllStudentListRequest } from '../../../../redux/studentSlice';

const StudentTable = () => {
	const dispatch = useDispatch();
	var { isLoading, studentList } = useSelector((state) => state.student);

	useEffect(() => {
		dispatch(GetAllStudentListRequest());
	}, []);

	const columns = [
		{
			name: 'Student Name ',
			selector: 'name',
			sortable: true,
			minWidth: '15%',
			cell: (row) => <p>{row.name}</p>,
		},
		{
			name: 'Email',
			selector: 'email',
			sortable: true,
			minWidth: '15%',
			cell: (row) => <p>{row.email}</p>,
		},
		{
			name: 'Mobile No',
			selector: 'mobile_no',
			sortable: true,
			minWidth: '15%',
			cell: (row) => <p>{row.mobile_no}</p>,
		},
		{
			name: 'Gender',
			selector: 'gender',
			sortable: true,
			minWidth: '15%',
			cell: (row) => <p>{row.gender}</p>,
		},
		{
			name: 'Birth Date',
			selector: 'birth_date',
			sortable: true,
			minWidth: '15%',
			cell: (row) => <p>{row.birth_date}</p>,
		},
	];
	const ExpandableTable = ({ data }) => {
		return (
			<div className="expandable-content p-2 shadow-lg  m-2 bg-body rounded">
				<Table responsive>
					<thead>
						<tr>
							<th>Address</th>
							<th>City</th>
							<th>State</th>
							<th>Country</th>
							<th>Zip code</th>
						</tr>
					</thead>
					<tbody>
						<td>{data.street_add1}</td>
						<td>{data.city}</td>
						<td>{data.state}</td>
						<td>{data.country}</td>
						<td>{data.zip}</td>
					</tbody>
				</Table>
			</div>
		);
	};
	return (
		<>
			<div className="student-title">
				<h4>Student Table</h4>
				<Link
					style={{ textAlign: 'right' }}
					to={'/admin/students/list'}
					className="view-all-subject"
				>
					View All
				</Link>
			</div>
			<Card className="overflow-hidden">
				<DataTable
					className="react-dataTable student-table"
					noHeader
					columns={columns}
					data={
						studentList?.Student_Details &&
						studentList?.Student_Details.slice(0, 5).map((item) => {
							return item;
						})
					}
					// paginationTotalRows={subjectData?.TotalCount}
					sortServer={true}
					striped={true}
					loading={isLoading}
					// subHeader
					expandableRows
					expandOnRowClicked
					expandableRowsComponent={<ExpandableTable />}
				/>
			</Card>
		</>
	);
};

export default StudentTable;
