import React from 'react';
import { Plus, Trash } from 'react-feather';
import { useDispatch } from 'react-redux';
import { Button, Col, Input, Label, Row } from 'reactstrap';
import { toggleAddModal } from '../../../../../redux/subjectSlice';
import AddSubjectModal from '../AddSubjectModal.jsx';
const CustomHeader = ({ setTableData, tableData, checkedData, handleAllDeleteButton }) => {
	const dispatch = useDispatch();
	const handleSearchInputChange = (e) => {
		setTableData({ ...tableData, filter_value: e.target.value });
	};

	return (
		<div className="invoice-list-table-header w-100 mr-1 ml-50 mt-2 mb-75">
			<Row>
				<Col xl="6" className="d-flex align-items-center p-0">
					<div className="ml-1">
						{checkedData && checkedData.length > 0 && (
							<Button.Ripple color="danger" onClick={handleAllDeleteButton}>
								<Trash size={16} />
								<span className="align-middle ml-1">Delete</span>
							</Button.Ripple>
						)}
					</div>
				</Col>
				<Col
					xl="6"
					className="d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1"
				>
					<div className="d-flex align-items-center mb-sm-0 mb-1 mr-1">
						<Label className="mb-0" for="search-invoice">
							Search:
						</Label>
						<Input
							id="search-invoice"
							className="ml-50 w-100"
							type="text"
							value={tableData && tableData.filter_value}
							onChange={handleSearchInputChange}
							placeholder="Search"
						/>
					</div>
					<div>
						<Button.Ripple color="primary" onClick={() => dispatch(toggleAddModal(true))}>
							<Plus size={16} />
							<span className="align-middle ml-1">Create</span>
						</Button.Ripple>
					</div>
				</Col>
			</Row>
			<AddSubjectModal />
		</div>
	);
};

export default CustomHeader;
