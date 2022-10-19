import React from 'react';
import BreadCrumbs from '@components/breadcrumbs';
import Table from './PapermasterTable';
import { Link } from 'react-router-dom';
import { Edit, Eye, Plus, Trash2, PlusCircle } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);
import { Badge, Button, UncontrolledTooltip } from 'reactstrap';
import {
	DeletePapermasterRequest,
	GetAllPapermasterRequest,
	handleResetPapermaster,
} from '../../../../../redux/papermasterSlice';

const PapermasterList = () => {
	const { paperData, subjectData, createdQuesData, error } = useSelector((state) => {
		return state.questionnaire;
	});
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
				await dispatch(DeletePapermasterRequest(id));
				dispatch(handleResetPapermaster());
				dispatch(GetAllPapermasterRequest());
			}
		});
	};

	const columns = [
		{
			name: 'Paper Name ',
			selector: 'paper_name',
			sortable: true,
			minWidth: '15%',
			cell: (row) => <p>{row.paper_name}</p>,
		},
		{
			name: 'Year',
			selector: 'year',
			sortable: true,
			minWidth: '15%',
			cell: (row) => <p>{row.year}</p>,
		},

		{
			name: 'Status ',
			minWidth: '15%',
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
			minWidth: '35%',
			cell: (row) => {
				return (
					<div className="d-inline ">
						<Link to={`/admin/papermaster/view/${row._id}`} className="text-primary">
							<Eye size={18} />
						</Link>

						<Link to={`/admin/papermaster/edit/${row._id}`} className="text-warning mx-1">
							<Edit size={18} />
						</Link>

						<Trash2
							className="text-danger"
							size={18}
							s
							onClick={() => handleDeleteById(row._id)}
							style={{ cursor: 'pointer' }}
						/>
						<Link
							to={`/admin/questionnaire/Act/add/${row._id}`}
							id="create-questions"
							className="text-warning mx-1"
						>
							<PlusCircle size={18} />
							<UncontrolledTooltip placement="bottom" target="create-questions">
								Create Questions
							</UncontrolledTooltip>
						</Link>

						{/* <Button.Ripple
							
							color="primary"
							className="main-color-btn"
							tag={Link}
							to={`/admin/questionnaire/Act/add/${row._id}`}
						>
							<PlusCircle size={16} />
							<span className="align-middle" />
							
						</Button.Ripple> */}
					</div>
				);
			},
		},
	];
	return (
		<div className="app-user-list">
			<BreadCrumbs
				breadCrumbTitle="Paper Master"
				breadCrumbParent="Paper Master"
				breadCrumbActive=" Paper Master List"
			/>
			<Table columns={columns} />
		</div>
	);
};

export default PapermasterList;
