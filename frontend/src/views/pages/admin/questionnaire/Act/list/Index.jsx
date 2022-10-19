import React from 'react';
import BreadCrumbs from '@components/breadcrumbs';
import Table from './ActTable';
import { Link } from 'react-router-dom';
import { Edit, Eye, Trash2 } from 'react-feather';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {
	GetAllQuestionnaireRequest,
	DeleteQuestionnaieRequest,
	GetAllActQuestionnaireRequest,
	handleModalOpen,
} from '../../../../../../redux/questionnaireSlice';
import { Badge, Button } from 'reactstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@blowstack/ckeditor5-full-free-build';
import MoreModal from './MoreModal';
// import ReadMoreModal from './ReadMoreModal';
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
				dispatch(GetAllActQuestionnaireRequest());
			}
		});
	};

	const handelClick = (data) => {
		dispatch(handleModalOpen(data));
	};

	const columns = [
		{
			name: 'Paper',
			selector: 'supaper_name',
			sortable: true,
			minWidth: '10%',
		},
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
			minWidth: '40%',
			cell: (row) => (
				<>
					<p className=" mb-0">
						{row.question.slice(0, 100) + '...'}
						<Link className="view-all-subject" onClick={() => handelClick(row.question)}>
							More
						</Link>
					</p>
				</>
			),
		},

		{
			name: 'Answer ',
			selector: 'answer',
			sortable: false,
			minWidth: '5%',
			cell: (row) => <p>{row.answer}</p>,
		},
		{
			name: 'Question Marks ',
			selector: 'question_marks',
			sortable: false,
			minWidth: '10%',
		},
		{
			name: 'Actions',
			minWidth: '15%',
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
							// onClick={() => handleDeleteById(row._id)}
							style={{ cursor: 'pointer' }}
						/>
						{/* <ReadMoreModal /> */}
					</div>
				);
			},
		},
	];
	return (
		<div className="app-user-list">
			<BreadCrumbs breadCrumbTitle="ACT" breadCrumbParent="ACT" breadCrumbActive=" ACT List" />
			<Table columns={columns} className="w-100 " />
			<MoreModal />
		</div>
	);
};

export default QuestionnaireList;
