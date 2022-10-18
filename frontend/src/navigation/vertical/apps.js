import { Circle, Plus } from 'react-feather';

export default [
	{
		id: 'subjects',
		title: 'Subjects',
		children: [
			{
				id: 'list',
				title: 'List',
				icon: <Circle size={12} />,
				navLink: '/admin/subjects/list',
			},
		],
	},
	{
		id: 'papermaster',
		title: 'Paper Master',
		children: [
			{
				id: 'list',
				title: 'List',
				icon: <Circle size={12} />,
				navLink: '/admin/papermaster/list',
			},
			{
				id: 'add',
				title: 'Add',
				icon: <Circle size={12} />,
				navLink: '/admin/papermaster/add',
			},
		],
	},
	{
		id: 'questionnaire',
		title: 'Questionnaire',
		children: [
			{
				id: 'act',
				title: 'ACT',
				icon: <Plus size={12} />,
				// navLink: '/admin/questionnaire/list',
				children: [
					{
						id: 'list',
						title: 'List',
						icon: <Circle size={12} />,
						navLink: '/admin/questionnaire/act/list',
					},
					{
						id: 'add',
						title: 'Add',
						icon: <Circle size={12} />,
						navLink: '/admin/questionnaire/act/add',
					},
				],
			},
			{
				id: 'sat',
				title: 'SAT',
				icon: <Plus size={12} />,
				// navLink: '/admin/questionnaire/list',
				children: [
					{
						id: 'list',
						title: 'List',
						icon: <Circle size={12} />,
						navLink: '/admin/questionnaire/sat/list',
					},
					{
						id: 'add',
						title: 'Add',
						icon: <Circle size={12} />,
						navLink: '/admin/questionnaire/sat/add',
					},
				],
			},
		],
		// children: [
		// 	{
		// 		id: 'list',
		// 		title: 'List',
		// 		icon: <Circle size={12} />,
		// 		navLink: '/admin/questionnaire/list',
		// 	},
		// 	{
		// 		id: 'add',
		// 		title: 'Add',
		// 		icon: <Circle size={12} />,
		// 		navLink: '/admin/questionnaire/add',
		// 	},
		// ],
	},
	{
		id: 'instructions',
		title: 'Instructions',
		children: [
			{
				id: 'list',
				title: 'List',
				icon: <Circle size={12} />,
				navLink: '/admin/instructions/list',
			},
			{
				id: 'add',
				title: 'Add',
				icon: <Circle size={12} />,
				navLink: '/admin/instructions/add',
			},
		],
	},
	{
		id: 'students',
		title: 'Students',
		children: [
			{
				id: 'list',
				title: 'List',
				icon: <Circle size={12} />,
				navLink: '/admin/students/list',
			},
		],
	},
];
