import React, { forwardRef, Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Table } from 'reactstrap';
import { datatable_per_raw, datatable_per_page } from '../../../../../../configs/constant_array';
import { ChevronDown } from 'react-feather';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {
	GetAllSatQuestionnaireRequest,
	MultipalDeleteQuestionnaireRequest,
} from '../../../../../../redux/questionnaireSlice';
import CustomHeader from './CustomHeader';
import DataTable from 'react-data-table-component';

const MySwal = withReactContent(Swal);

const SatTable = ({ columns }) => {
	const dispatch = useDispatch();
	const { isLoading, satquestionnaireData } = useSelector((state) => state.questionnaire);
	const [checkedData, setCheckedData] = useState([]);
	const [tableData, setTableData] = useState({
		page: 1,
		limit: datatable_per_page,
		filter_value: '',
		sort_order: 'desc',
		order_column: '',
	});

	const [queryString, setQueryString] = useState(
		`page=${tableData.page}&limit=${tableData.limit}&filter_value=${tableData.filter_value}&sort_order=${tableData.sort_order}&order_column=${tableData.order_column}`
	);

	const handleMultipleDetele = (e) => {
		setCheckedData(e.selectedRows);
	};

	const handleSort = (column, sortDirection) => {
		setTableData({
			...tableData,
			sort_order: sortDirection,
			order_column: column.selector,
		});
	};

	const handlePageChange = (page) => {
		setTableData({
			...tableData,
			page: page,
		});
	};

	const handlePerRowsChange = (newPerPage, page) => {
		setTableData({
			...tableData,
			page: page,
			limit: newPerPage,
		});
	};

	const handleQueryChange = (data) => {
		let queryStr = Object.keys(data)
			.map((key) => {
				return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
			})
			.join('&');
		setQueryString(queryStr);
	};

	const handleAllDeleteButton = (e) => {
		e.preventDefault();
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
				await dispatch(MultipalDeleteQuestionnaireRequest(checkedData));
				dispatch(GetAllSatQuestionnaireRequest());
				setCheckedData([]);
			}
		});
	};

	// eslint-disable-next-line react/display-name
	const BootstrapCheckbox = forwardRef(({ onClick, ...rest }, ref) => (
		<div className="custom-control custom-checkbox">
			<input type="checkbox" className="custom-control-input" ref={ref} {...rest} />
			<label className="custom-control-label" onClick={onClick} />
		</div>
	));

	useEffect(() => {
		handleQueryChange(tableData);
	}, [tableData]);

	useEffect(() => {
		dispatch(GetAllSatQuestionnaireRequest(queryString));
	}, [dispatch, queryString]);

	const ExpandableTable = ({ data }) => {
		let arr = Object.values(data.options);

		return (
			<div className="expandable-content p-2 shadow-lg  m-2 bg-body rounded">
				<Table responsive>
					<thead>
						<tr>
							<th>Question Description</th>
							{Object.keys(arr[0]).map((value, index) => (
								<th key={index}>option {index + 1}</th>
							))}
						</tr>
					</thead>
					<tbody>
						<td>{data.question_description}</td>
						{Object.keys(arr[0]).map((value, index) => (
							<td key={index}>{arr[0][value]}</td>
						))}
					</tbody>
				</Table>
			</div>
		);
	};

	return (
		<Fragment>
			<Card>
				<div className="app-user-list list">
					<DataTable
						className="react-dataTable questions-table__wrapper"
						noHeader
						pagination
						selectableRows
						onSelectedRowsChange={handleMultipleDetele}
						data={satquestionnaireData?.Questionnaire_Details}
						columns={columns}
						paginationServer
						paginationRowsPerPageOptions={datatable_per_raw}
						paginationPerPage={tableData.limit}
						paginationTotalRows={satquestionnaireData?.TotalCount}
						sortIcon={<ChevronDown size={5} />}
						selectableRowsComponent={BootstrapCheckbox}
						onChangeRowsPerPage={handlePerRowsChange}
						onChangePage={handlePageChange}
						onSort={handleSort}
						fixedHeader
						sortServer={true}
						striped={true}
						subHeaderComponent={
							<CustomHeader
								tableData={tableData}
								setTableData={setTableData}
								checkedData={checkedData}
								handleAllDeleteButton={handleAllDeleteButton}
							/>
						}
						loading={isLoading}
						subHeader
						expandableRows
						expandOnRowClicked
						expandableRowsComponent={<ExpandableTable />}
					/>
				</div>
			</Card>
		</Fragment>
	);
};

export default SatTable;
