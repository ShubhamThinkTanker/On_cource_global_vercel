import React from 'react';
import BreadCrumbs from '@components/breadcrumbs';
import Table from './SatTable';
import { Link } from 'react-router-dom';
import { Edit, Eye, Trash2 } from 'react-feather';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {
	DeleteQuestionnaieRequest,
	GetAllSatQuestionnaireRequest,
} from '../../../../../../redux/questionnaireSlice';
const MySwal = withReactContent(Swal);

const QuestionnaireList = () => {
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
				await dispatch(DeleteQuestionnaieRequest(id));
				dispatch(GetAllSatQuestionnaireRequest());
			}
		});
	};

	const columns = [
		{
			name: 'Subject',
			selector: 'subject_name',
			sortable: true,
			minWidth: '10%',
		},
		{
			name: 'Question',
			selector: 'question',
			sortable: true,
			minWidth: '55%',
			cell: (row) => <p className=" mb-0">{row.question}</p>,
		},
		// {
		// 	name: 'Type ',
		// 	minWidth: '7%',
		// 	selector: 'is_type',
		// 	sortable: true,
		// 	cell: (row) => {
		// 		return (
		// 			<Badge color={row.is_type === 'ACT' ? 'light-primary' : 'light-secondary'} pill>
		// 				{row.is_type.toUpperCase()}
		// 			</Badge>
		// 		);
		// 	},
		// },
		{
			name: 'Answer ',
			selector: 'answer',
			sortable: true,
			minWidth: '5%',
			cell: (row) => <p>{row.answer}</p>,
		},
		{
			name: 'Question Marks ',
			selector: 'question_marks',
			sortable: true,
			minWidth: '10%',
		},
		{
			name: 'Actions',
			minWidth: '10%',
			cell: (row) => {
				return (
					<div className="d-inline ">
						<Link to={`/admin/questionnaire/Act/view/${row._id}`} className="text-primary">
							<Eye size={18} />
						</Link>

						<Link to={`/admin/questionnaire/Act/edit/${row._id}`} className="text-warning mx-1">
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
			<BreadCrumbs breadCrumbTitle="SAT" breadCrumbParent="SAT" breadCrumbActive=" SAT List" />
			<Table columns={columns} className="w-100" />
		</div>
	);
};

export default QuestionnaireList;
