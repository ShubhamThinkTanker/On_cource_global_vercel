import { lazy } from 'react';

const StudentRoutes = [
	{
		path: '/admin/students/list',
		exact: true,
		component: lazy(() => import('../../views/pages/admin/students/list/Index')),
	},
];
export default StudentRoutes;
