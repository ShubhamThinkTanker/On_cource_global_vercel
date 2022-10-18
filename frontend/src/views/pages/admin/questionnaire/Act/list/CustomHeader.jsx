import React from 'react';
import { DownloadCloud, Plus, Trash } from 'react-feather';
import { Link } from 'react-router-dom';
import { Button, Col, Input, Label, Row } from 'reactstrap';
import { useDispatch } from 'react-redux';
import * as XLSX from 'xlsx';
import { GetAllExcelQuestionnaireRequest } from '../../../../../../redux/questionnaireSlice';

const CustomHeader = ({ setTableData, tableData, checkedData, handleAllDeleteButton }) => {
	const handleSearchInputChange = (e) => {
		setTableData({ ...tableData, filter_value: e.target.value });
	};
	const dispatch = useDispatch();

	const readExcel = (file) => {
		const promise = new Promise((resolve, reject) => {
			const fileReader = new FileReader();
			fileReader.readAsArrayBuffer(file);

			fileReader.onload = (e) => {
				const bufferArray = e.target.result;

				const wb = XLSX.read(bufferArray, { type: 'buffer' });

				const wsname = wb.SheetNames[0];

				const ws = wb.Sheets[wsname];

				const data = XLSX.utils.sheet_to_json(ws);

				resolve(data);
			};

			fileReader.onerror = (error) => {
				reject(error);
			};
		});

		promise.then((data) => {
			dispatch(GetAllExcelQuestionnaireRequest(data));
			// toast.success('Excel Import Sucessfully!');
		});
	};

	return (
		<div className="invoice-list-table-header w-100 mr-1 ml-50 mt-2 mb-75">
			<Row>
				<Col xl="3" className="d-flex align-items-center p-0">
					<div className="ml-1">
						{checkedData.length !== 0 && (
							<Button.Ripple color="danger" onClick={handleAllDeleteButton}>
								<Trash size={16} />
								<span className="align-middle ml-1">Delete</span>
							</Button.Ripple>
						)}
					</div>
				</Col>
				<Col
					xl="9"
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
							value={tableData.filter_value}
							onChange={handleSearchInputChange}
							placeholder="Search"
						/>
					</div>

					<div>
						<Button.Ripple tag={Label} className="main-color-btn mr-1" color="primary">
							<DownloadCloud size={16} />
							<span className="align-middle ml-1">Import</span>
							<Input
								type="file"
								onChange={(e) => {
									const file = e.target.files[0];
									readExcel(file);
								}}
								hidden
							/>
						</Button.Ripple>
					</div>

					<div>
						<Button.Ripple
							color="primary"
							className="main-color-btn"
							tag={Link}
							to={'/admin/questionnaire/act/add'}
						>
							<Plus size={16} />
							<span className="align-middle ml-1">Create</span>
						</Button.Ripple>
					</div>
				</Col>
			</Row>
		</div>
	);
};

export default CustomHeader;
