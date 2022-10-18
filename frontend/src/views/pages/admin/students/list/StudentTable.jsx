import React, { forwardRef, Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Table } from 'reactstrap';
import { datatable_per_page, datatable_per_raw } from '../../../../../configs/constant_array';
import { ChevronDown } from 'react-feather';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import CustomHeader from './CustomHeader';
import DataTable from 'react-data-table-component';
import { GetAllStudentListRequest } from '../../../../../redux/studentSlice';
const MySwal = withReactContent(Swal);

const StudentTable = ({ columns }) => {
	const dispatch = useDispatch();

	var { isLoading, studentList } = useSelector((state) => state.student);

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
		dispatch(GetAllStudentListRequest(queryString));
	}, [dispatch, queryString]);

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
		<Fragment>
			<Card>
				<div className="app-user-list list">
					<DataTable
						className="react-dataTable"
						noHeader
						pagination
						data={studentList?.Student_Details}
						columns={columns}
						paginationServer
						paginationRowsPerPageOptions={datatable_per_raw}
						paginationPerPage={tableData.limit}
						paginationTotalRows={studentList?.TotalCount}
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

export default StudentTable;
