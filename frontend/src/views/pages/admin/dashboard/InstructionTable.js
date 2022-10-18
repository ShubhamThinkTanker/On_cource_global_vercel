import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Badge } from 'reactstrap';
import { Card, Table, CardTitle, CardHeader } from 'reactstrap';
import DataTable from 'react-data-table-component';
import { GetAllInstrunctionsRequest } from '../../../../redux/instructionsSlice';
import { Link } from 'react-router-dom';
const InstructionTable = () => {
	const dispatch = useDispatch();
	const { isLoading, instructionsData } = useSelector((state) => state.instructions);
	useEffect(() => {
		dispatch(GetAllInstrunctionsRequest());
	}, []);
	const ExpandableTable = ({ data }) => {
		return (
			<div className="expandable-content p-2 shadow-lg  m-2 bg-body rounded">
				<Table responsive>
					<thead>
						<tr>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<td>{data.description}</td>
					</tbody>
				</Table>
			</div>
		);
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
			minWidth: '5%',
			cell: (row) => <p>{row.time_duration}</p>,
		},
		{
			name: 'Status ',
			minWidth: '10%',
			selector: 'status',
			sortable: true,
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
			minWidth: '5%',
			cell: (row) => <p>{row.total_marks}</p>,
		},
	];
	return (
		<Fragment>
			<div className="instruction-header">
				<h4>Instruction Table</h4>
				<Link
					style={{ textAlign: 'right' }}
					to={'/admin/instructions/list'}
					className="view-all-insruction"
				>
					View All{' '}
				</Link>
			</div>
			<Card className="overflow-hidden">
				<DataTable
					className="react-dataTable instruction-table"
					noHeader
					columns={columns}
					data={
						instructionsData !== null &&
						instructionsData['findAllInstruction'] &&
						instructionsData['findAllInstruction'].slice(0, 5).map((item) => {
							return item;
						})
					}
					paginationTotalRows={instructionsData?.TotalCount}
					sortServer={true}
					striped={true}
					loading={isLoading}
					// subHeader
					expandableRows
					expandOnRowClicked
					expandableRowsComponent={<ExpandableTable />}
				/>
			</Card>
		</Fragment>
	);
};

export default InstructionTable;
