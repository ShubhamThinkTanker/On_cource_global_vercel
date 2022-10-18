import React from 'react';
import BreadCrumbs from '@components/breadcrumbs';
import Table from './Table';
import { Edit, Trash2 } from 'react-feather';
import { useDispatch } from 'react-redux';
import Avatar from '@components/avatar';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {
	DeleteSubjectRequest,
	GetSubjectByIdRequest,
	SetTable,
	toggleEditModal,
} from '../../../../../redux/subjectSlice';
import EditSubjectModal from '../EditSubjectModal';
import { Badge } from 'reactstrap';

const MySwal = withReactContent(Swal);

const SubjectList = () => {
	const dispatch = useDispatch();

	const handleDeleteById = (id) => {
		return MySwal.fire({
			title: 'Are you sure?',
			text: 'You would not be able to revert this!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Yes, delete it!',
			customClass: {
				confirmButton: 'btn btn-primary',
				cancelButton: 'btn btn-outline-danger ml-1',
			},
			buttonsStyling: false,
		}).then(async function (result) {
			if (result.value) {
				MySwal.fire({
					icon: 'success',
					title: 'Deleted!',
					text: 'Your Record has been deleted.',
					customClass: {
						confirmButton: 'btn btn-success',
					},
				});
				await dispatch(DeleteSubjectRequest(id));
			}
		});
	};
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
			name: 'Subject Name',
			// minWidth: '25%',
			selector: 'subject_name',
			sortable: true,
			cell: (row) => (
				<div className="d-flex justify-content-left align-items-center">
					{renderSubject(row)}
					<div className="d-flex flex-column">{row.subject_name}</div>
				</div>
			),
		},
		{
			name: 'Status ',
			// minWidth: '25%',
			selector: 'status',
			sortable: false,
			cell: (row) => {
				return (
					<Badge color={row.status === 'active' ? 'light-success' : 'light-danger'} pill>
						{row.status.toUpperCase()}
					</Badge>
				);
			},
		},

		{
			name: 'Actions',
			// minWidth: '25%',
			cell: (row) => {
				return (
					<div className="d-flex  ">
						{/* <Link to={`/subjects/view/${row._id}`} className="text-primary">
							<Eye size={18} />
						</Link> */}

						<Edit
							className="text-warning mx-1"
							size={18}
							onClick={() => {
								dispatch(toggleEditModal(true));
								dispatch(GetSubjectByIdRequest(row._id));
							}}
						/>

						<Trash2
							className="text-danger"
							size={18}
							onClick={() => handleDeleteById(row._id)}
							style={{ cursor: 'pointer' }}
						/>
					</div>
				);
			},
		},
	];
	return (
		<div className="app-user-list">
			<BreadCrumbs
				breadCrumbTitle="Subjects"
				breadCrumbParent="Subjects"
				breadCrumbActive="Subjects List"
			/>
			<Table columns={columns} />
			<EditSubjectModal />
		</div>
	);
};

export default SubjectList;
