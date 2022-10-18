import { lazy } from 'react';

const QuestionnaireRoutes = [
	{
		path: '/admin/questionnaire/Act/list',
		exact: true,
		component: lazy(() => import('../../views/pages/admin/questionnaire/Act/list/Index')),
	},
	{
		path: '/admin/questionnaire/Act/add',
		exact: true,
		component: lazy(() => import('../../views/pages/admin/questionnaire/Act/AddAct')),
	},
	{
		path: '/admin/questionnaire/Act/edit/:id',
		exact: true,
		component: lazy(() => import('../../views/pages/admin/questionnaire/Act/EditAct')),
	},
	{
		path: '/admin/questionnaire/Act/view/:id',
		exact: true,
		component: lazy(() => import('../../views/pages/admin/questionnaire/Act/ViewAct')),
	},

	{
		path: '/admin/questionnaire/Sat/list',
		exact: true,
		component: lazy(() => import('../../views/pages/admin/questionnaire/Sat/list/Index')),
	},
	{
		path: '/admin/questionnaire/Sat/add',
		exact: true,
		component: lazy(() => import('../../views/pages/admin/questionnaire/Sat/AddSat')),
	},
	{
		path: '/admin/questionnaire/Sat/edit/:id',
		exact: true,
		component: lazy(() => import('../../views/pages/admin/questionnaire/Sat/EditSat')),
	},
	{
		path: '/admin/questionnaire/Sat/view/:id',
		exact: true,
		component: lazy(() => import('../../views/pages/admin/questionnaire/Sat/ViewSat')),
	},
];

export default QuestionnaireRoutes;
