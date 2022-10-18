import React from 'react';
import BreadCrumbs from '@components/breadcrumbs';
import Table from './StudentTable';

const StudentList = () => {
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
			sortable: false,
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
			sortable: false,
			minWidth: '15%',
			cell: (row) => <p>{row.birth_date}</p>,
		},
	];
	return (
		<div className="app-user-list">
			<BreadCrumbs
				breadCrumbTitle="Student"
				breadCrumbParent="Student"
				breadCrumbActive=" Student List"
			/>
			<Table columns={columns} />
		</div>
	);
};

export default StudentList;
