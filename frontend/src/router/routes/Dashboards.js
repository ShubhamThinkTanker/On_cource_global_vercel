import { lazy } from 'react';

const DashboardRoutes = [
	{
		path: '/home',
		exact: true,
		layout: 'BlankLayout',
		component: lazy(() => import('../../views/pages/Home/Index.jsx')),
		meta: {
			resource: 'Auth',
		},
	},
	{
		path: '/admin/dashboard',
		exact: true,
		// appLayout: true,
		component: lazy(() => import('../../views/pages/admin/dashboard/index.js')),
	},
	{
		path: '/student/dashboard',
		exact: true,
		layout: 'BlankLayout',
		component: lazy(() => import('../../views/pages/student/dashboard/index.js')),
		meta: {
			resource: 'Auth',
		},
	},
	// {
	// 	path: '/admin/subjects/list',
	// 	component: lazy(() => import('../../views/pages/admin/subjects/list/Index')),
	// },
];

export default DashboardRoutes;
