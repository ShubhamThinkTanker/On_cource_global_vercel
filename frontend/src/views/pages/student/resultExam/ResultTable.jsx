// import React, { forwardRef, Fragment, useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Card } from 'reactstrap';
// import DataTable from 'react-data-table-component';
// import { handleStudentDetails } from '../../../../redux/resultSlice';

// const Table = ({ columns }) => {
// 	const dispatch = useDispatch();
// 	const [checkedData, setCheckedData] = useState([]);
// 	const [tableData, setTableData] = useState({
// 		page: 1,
// 		limit: 1,
// 		filter_value: '',
// 		sort_order: 'desc',
// 		order_column: '',
// 	});
// 	const [queryString, setQueryString] = useState(
// 		`page=${tableData.page}&limit=${tableData.per_page}&filter_value=${tableData.filter_value}&sort_order=${tableData.sort_order}&order_column=${tableData.order_column}`
// 	);
// 	const { subjectData, isLoading, createdSubject, editSubject, deletedAllSubject, deletedSubject } =
// 		useSelector((state) => state?.subject);
// 	const { resultData, studentResultDetails } = useSelector((store) => store.result);

// 	console.log('studentResultDetails', studentResultDetails);
// 	// {
// 	// 	resultData &&
// 	// 		resultData.FindResultOfStudent != undefined &&
// 	// 		resultData.FindResultOfStudent.map((ele) => {
// 	// 			var a = ele.flag_options;
// 	// 		});
// 	// }

// 	// const handleMultipleDetele = (e) => {
// 	// 	setCheckedData(e.selectedRows);
// 	// };
// 	// const handleSort = (column, sortDirection) => {
// 	// 	setTableData({
// 	// 		...tableData,
// 	// 		sort_order: sortDirection,
// 	// 		order_column: column.selector,
// 	// 	});
// 	// };
// 	// const handlePageChange = (page) => {
// 	// 	setTableData({
// 	// 		...tableData,
// 	// 		page: page,
// 	// 	});
// 	// };
// 	// const handlePerRowsChange = (newPerPage, page) => {
// 	// 	setTableData({
// 	// 		...tableData,
// 	// 		page: page,
// 	// 		limit: newPerPage,
// 	// 	});
// 	// };

// 	// eslint-disable-next-line react/display-name
// 	const BootstrapCheckbox = forwardRef(({ onClick, ...rest }, ref) => (
// 		<div className="custom-control custom-checkbox">
// 			<input type="checkbox" className="custom-control-input" ref={ref} {...rest} />
// 			<label className="custom-control-label" onClick={onClick} />
// 		</div>
// 	));
// 	// useEffect(() => {
// 	// 	handleQueryChange(tableData);
// 	// }, [tableData]);
// 	// useEffect(() => {
// 	// 	dispatch(GetAllSubjectRequest(queryString));
// 	// 	return () => {
// 	// 		dispatch(handleResetSubjectData());
// 	// 	};
// 	// }, [dispatch, queryString, createdSubject, editSubject, deletedAllSubject, deletedSubject]);

// 	// useEffect =
// 	// 	(() => {
// 	// 		if (resultData && resultData.FindResultOfStudent != undefined) {
// 	// 			resultData.FindResultOfStudent.map((ele) => {
// 	// 				// var a = ele.flag_options;
// 	// 				dispatch(handleStudentDetails(ele.flag_options));
// 	// 			});
// 	// 		}
// 	// 	},
// 	// 	[resultData]);
// 	return (
// 		<Fragment>
// 			<Card className="overflow-hidden">
// 				<div className="react-dataTable">
// 					<DataTable
// 						className="react-dataTable"
// 						noHeader
// 						// pagination
// 						// selectableRows
// 						// onSelectedRowsChange={handleMultipleDetele}
// 						columns={columns}
// 						data={studentResultDetails}
// 						// paginationServer
// 						// paginationRowsPerPageOptions={10}
// 						// paginationPerPage={10}
// 						// paginationTotalRows={10}
// 						// sortIcon={<ChevronDown size={5} />}
// 						// selectableRowsComponent={BootstrapCheckbox}
// 						// onChangeRowsPerPage={handlePerRowsChange}
// 						// onChangePage={handlePageChange}
// 						// onSort={handleSort}
// 						fixedHeader
// 						sortServer={true}
// 						striped={true}
// 						// subHeaderComponent={
// 						// 	<CustomHeader
// 						// 		tableData={tableData}
// 						// 		setTableData={setTableData}
// 						// 		checkedData={checkedData}
// 						// 		handleAllDeleteButton={handleAllDeleteButton}
// 						// 	/>
// 						// }
// 						loading={isLoading}
// 						subHeader
// 					/>
// 				</div>
// 			</Card>
// 		</Fragment>
// 	);
// };

// export default Table;

import React, { forwardRef, Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from 'reactstrap';
import DataTable from 'react-data-table-component';

const ResultTable = ({ columns }) => {
	const dispatch = useDispatch();
	const [checkedData, setCheckedData] = useState([]);
	const [tableData, setTableData] = useState({
		page: 1,
		limit: 1,
		filter_value: '',
		sort_order: 'desc',
		order_column: '',
	});
	const [queryString, setQueryString] = useState(
		`page=${tableData.page}&limit=${tableData.per_page}&filter_value=${tableData.filter_value}&sort_order=${tableData.sort_order}&order_column=${tableData.order_column}`
	);
	const { subjectData, isLoading, createdSubject, editSubject, deletedAllSubject, deletedSubject } =
		useSelector((state) => state?.subject);
	const { resultData } = useSelector((store) => store.result);

	// {
	// 	resultData &&
	// 		resultData.FindResultOfStudent != undefined &&
	// 		resultData.FindResultOfStudent.map((ele) => {
	// 			var a = ele.flag_options;
	// 		});
	// }

	// const handleMultipleDetele = (e) => {
	// 	setCheckedData(e.selectedRows);
	// };
	// const handleSort = (column, sortDirection) => {
	// 	setTableData({
	// 		...tableData,
	// 		sort_order: sortDirection,
	// 		order_column: column.selector,
	// 	});
	// };
	// const handlePageChange = (page) => {
	// 	setTableData({
	// 		...tableData,
	// 		page: page,
	// 	});
	// };
	// const handlePerRowsChange = (newPerPage, page) => {
	// 	setTableData({
	// 		...tableData,
	// 		page: page,
	// 		limit: newPerPage,
	// 	});
	// };

	// eslint-disable-next-line react/display-name
	const BootstrapCheckbox = forwardRef(({ onClick, ...rest }, ref) => (
		<div className="custom-control custom-checkbox">
			<input type="checkbox" className="custom-control-input" ref={ref} {...rest} />
			<label className="custom-control-label" onClick={onClick} />
		</div>
	));
	// useEffect(() => {
	// 	handleQueryChange(tableData);
	// }, [tableData]);
	// useEffect(() => {
	// 	dispatch(GetAllSubjectRequest(queryString));
	// 	return () => {
	// 		dispatch(handleResetSubjectData());
	// 	};
	// }, [dispatch, queryString, createdSubject, editSubject, deletedAllSubject, deletedSubject]);

	// useEffect =
	// 	(() => {
	// 		if (resultData && resultData.FindResultOfStudent != undefined) {
	// 			resultData.FindResultOfStudent.map((ele) => {
	// 				// var a = ele.flag_options;
	// 			});
	// 		}
	// 	},
	// 	[resultData]);
	return (
		<Fragment>
			<Card>
				{/* <div className="result_table"> */}
				<DataTable
					className="react-dataTable ans_question_table"
					noHeader
					// pagination
					// selectableRows
					// onSelectedRowsChange={handleMultipleDetele}
					columns={columns}
					data={resultData}
					// paginationServer
					// paginationRowsPerPageOptions={10}
					// paginationPerPage={10}
					// paginationTotalRows={10}
					// sortIcon={<ChevronDown size={5} />}
					// selectableRowsComponent={BootstrapCheckbox}
					// onChangeRowsPerPage={handlePerRowsChange}
					// onChangePage={handlePageChange}
					// onSort={handleSort}
					fixedHeader
					sortServer={true}
					striped={true}
					// subHeaderComponent={
					// 	<CustomHeader
					// 		tableData={tableData}
					// 		setTableData={setTableData}
					// 		checkedData={checkedData}
					// 		handleAllDeleteButton={handleAllDeleteButton}
					// 	/>
					// }
					loading={isLoading}
					subHeader
				/>
				{/* </div> */}
			</Card>
		</Fragment>
	);
};

export default ResultTable;
