import React, { forwardRef, Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from 'reactstrap';
import DataTable from 'react-data-table-component';
import { datatable_per_page, datatable_per_raw } from '../../../../../configs/constant_array';
import { ChevronDown } from 'react-feather';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import CustomHeader from './CustomHeader';
import {
	DeleteAllSubjectRequest,
	GetAllSubjectRequest,
	handleResetSubjectData,
} from '../../../../../redux/subjectSlice';

const MySwal = withReactContent(Swal);

const Table = ({ columns }) => {
	const dispatch = useDispatch();
	const [checkedData, setCheckedData] = useState([]);
	const [tableData, setTableData] = useState({
		page: 1,
		limit: datatable_per_page,
		filter_value: '',
		sort_order: 'desc',
		order_column: '',
	});
	const [queryString, setQueryString] = useState(
		`page=${tableData.page}&limit=${tableData.per_page}&filter_value=${tableData.filter_value}&sort_order=${tableData.sort_order}&order_column=${tableData.order_column}`
	);
	const { subjectData, isLoading, createdSubject, editSubject, deletedAllSubject, deletedSubject } =
		useSelector((state) => state?.subject);
	console.log('subjectData', subjectData);
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
			text: 'You would not able to revert this!',
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
				await dispatch(DeleteAllSubjectRequest(checkedData));
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
		dispatch(GetAllSubjectRequest(queryString));
		return () => {
			dispatch(handleResetSubjectData());
		};
	}, [dispatch, queryString, createdSubject, editSubject, deletedAllSubject, deletedSubject]);

	return (
		<Fragment>
			<Card className="overflow-hidden">
				<div className="react-dataTable">
					<DataTable
						className="react-dataTable"
						noHeader
						pagination
						selectableRows
						onSelectedRowsChange={handleMultipleDetele}
						columns={columns}
						data={subjectData?.Subject_Details}
						paginationServer
						paginationRowsPerPageOptions={datatable_per_raw}
						paginationPerPage={tableData.limit}
						paginationTotalRows={subjectData?.TotalCount}
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
					/>
				</div>
			</Card>
		</Fragment>
	);
};

export default Table;
