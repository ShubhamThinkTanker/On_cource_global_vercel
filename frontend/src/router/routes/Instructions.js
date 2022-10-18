import { lazy } from 'react';

const InstructionsRoutes = [
	{
		path: '/admin/instructions/list',
		exact: true,
		component: lazy(() => import('../../views/pages/admin/instructions/list/Index')),
	},
	{
		path: '/admin/instructions/add',
		exact: true,
		component: lazy(() => import('../../views/pages/admin/instructions/AddInstructions')),
	},
	{
		path: '/admin/instructions/edit/:id',
		exact: true,
		component: lazy(() => import('../../views/pages/admin/instructions/EditInstructions')),
	},
	{
		path: '/admin/instructions/view/:id',
		exact: true,
		component: lazy(() => import('../../views/pages/admin/instructions/ViewInstructions')),
	},
];

export default InstructionsRoutes;
