import { lazy } from 'react';

const PapermasterRoutes = [
	{
		path: '/admin/papermaster/list',
		exact: true,
		component: lazy(() => import('../../views/pages/admin/papermaster/list/Index')),
	},
	{
		path: '/admin/papermaster/add',
		exact: true,
		component: lazy(() => import('../../views/pages/admin/papermaster/AddPapermaster')),
	},
	{
		path: '/admin/questionnaire/Act/add/:id',
		exact: true,
		component: lazy(() => import('../../views/pages/admin/questionnaire/Act/AddAct')),
	},
	{
		path: '/admin/papermaster/edit/:id',
		exact: true,
		component: lazy(() => import('../../views/pages/admin/papermaster/EditPapermaster')),
	},
	{
		path: '/admin/papermaster/view/:id',
		exact: true,
		component: lazy(() => import('../../views/pages/admin/papermaster/ViewPapermaster')),
	},
];

export default PapermasterRoutes;
