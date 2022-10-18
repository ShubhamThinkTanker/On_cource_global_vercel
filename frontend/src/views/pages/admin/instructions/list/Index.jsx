import React from 'react';
import BreadCrumbs from '@components/breadcrumbs';
import Table from './InstructionsTable';
import { Link } from 'react-router-dom';
import { Edit, Eye, Trash2 } from 'react-feather';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {
	GetAllInstrunctionsRequest,
	DeleteInstructionsRequest,
} from '../../../../../redux/instructionsSlice';
const MySwal = withReactContent(Swal);
import { Badge } from 'reactstrap';

const InstructionsList = () => {
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
				await dispatch(DeleteInstructionsRequest(id));
				dispatch(GetAllInstrunctionsRequest());
			}
		});
	};

	const columns = [
		{
			name: 'Subject ',
			selector: 'subject_name',
			sortable: true,
			minWidth: '15%',
			cell: (row) => <p>{row.subject_name}</p>,
		},
		{
			name: 'Time Duration',
			selector: 'time_duration',
			sortable: true,
			minWidth: '15%',
			cell: (row) => <p>{row.time_duration}</p>,
		},
		{
			name: 'Status ',
			minWidth: '15%',
			selector: 'status',
			sortable: false,
			cell: (row) => {
				return (
					<Badge color={row.isActive === 'active' ? 'light-success' : 'light-danger'} pill>
						{row.isActive.toUpperCase()}
					</Badge>
				);
			},
		},
		{
			name: 'Total Marks ',
			selector: 'total_marks',
			sortable: true,
			minWidth: '15%',
			cell: (row) => <p>{row.total_marks}</p>,
		},
		{
			name: 'Actions',
			minWidth: '15%',
			cell: (row) => {
				return (
					<div className="d-inline ">
						<Link to={`/admin/instructions/view/${row._id}`} className="text-primary">
							<Eye size={18} />
						</Link>

						<Link to={`/admin/instructions/edit/${row._id}`} className="text-warning mx-1">
							<Edit size={18} />
						</Link>

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
				breadCrumbTitle="Instructions"
				breadCrumbParent="Instructions"
				breadCrumbActive=" Instructions List"
			/>
			<Table columns={columns} />
		</div>
	);
};

export default InstructionsList;
