import React from 'react';
import DetailCard from './DetailCard'
import InstructionTable from './InstructionTable';
import StudentTable from './StudentTable';
import SubjectTable from './SubjectTable';
function AdminDashboard() {
	return(
		<>
			<DetailCard cols={{ xl: '2', sm: '6' }} />
			<StudentTable />
			<SubjectTable />
			<InstructionTable />
		</>
	);
}

export default AdminDashboard;
