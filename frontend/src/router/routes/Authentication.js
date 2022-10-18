import { lazy } from 'react';

const Authentication = [
	{
		path: '/login',
		exact: true,
		component: lazy(() => import('../../views/pages/student/authentication/Login.js')),
		layout: 'BlankLayout',
		meta: {
			authRoute: true,
		},
	},
	{
		path: '/register',
		exact: true,
		component: lazy(() => import('../../views/pages/student/authentication/Register.js')),
		layout: 'BlankLayout',
		meta: {
			authRoute: true,
		},
	},
	{
		path: '/forgot-password',
		component: lazy(() => import('../../views/pages/student/authentication/ForgotPassword.js')),
		layout: 'BlankLayout',
		meta: {
			authRoute: true,
		},
	},
	{
		path: '/reset-password',
		component: lazy(() => import('../../views/pages/student/authentication/ResetPassword.js')),
		layout: 'BlankLayout',
		meta: {
			authRoute: true,
		},
	},

	{
		path: '/admin/login',
		exact: true,
		component: lazy(() => import('../../views/pages/admin/authentication/Login.js')),
		layout: 'BlankLayout',
		meta: {
			authRoute: true,
		},
	},
	{
		path: '/admin/register',
		exact: true,
		component: lazy(() => import('../../views/pages/admin/authentication/Register.js')),
		layout: 'BlankLayout',
		meta: {
			authRoute: true,
		},
	},
	{
		path: '/admin/forgot-password',
		component: lazy(() => import('../../views/pages/admin/authentication/ForgotPassword.js')),
		layout: 'BlankLayout',
		meta: {
			authRoute: true,
		},
	},
	{
		path: '/admin/reset-password',
		component: lazy(() => import('../../views/pages/admin/authentication/ResetPassword.js')),
		layout: 'BlankLayout',
		meta: {
			authRoute: true,
		},
	},
	{
		path: '/student/profile',
		exact: true,
		layout: 'BlankLayout',
		component: lazy(() => import('../../views/pages/student/components/Profile')),
		meta: {
			resource: 'Auth',
		},
	},
];

export default Authentication;
