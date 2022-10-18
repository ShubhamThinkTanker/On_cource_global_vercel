import { lazy } from 'react';

const SubjectRoutes = [
	{
		path: '/admin/subjects/list',
		exact: true,
		component: lazy(() => import('../../views/pages/admin/subjects/list/Index')),
	},
	{
		path: '/student/subjects',
		exact: true,
		layout: 'BlankLayout',
		component: lazy(() => import('../../views/pages/student/subjects/Index')),
		meta: {
			resource: 'Auth',
		},
	},

	{
		path: '/student/test',
		exact: true,
		layout: 'BlankLayout',
		component: lazy(() => import('../../views/pages/student/test/Index')),
		meta: {
			resource: 'Auth',
		},
	},
	{
		path: '/student/results',
		exact: true,
		layout: 'BlankLayout',
		component: lazy(() => import('../../views/pages/student/resultExam/Index.jsx')),
		meta: {
			resource: 'Auth',
		},
	},
	// {
	// 	path: '/student/progress',
	// 	exact: true,
	// 	layout: 'BlankLayout',
	// 	// component: lazy(() => import('../../views/pages/student/progress/progress.jsx')),
	// 	meta: {
	// 		resource: 'Auth',
	// 	},
	// },
	{
		path: '/student/mycourse',
		exact: true,
		layout: 'BlankLayout',
		component: lazy(() => import('../../views/pages/student/mycourse/index')),
		meta: {
			resource: 'Auth',
		},
	},
];

export default SubjectRoutes;
