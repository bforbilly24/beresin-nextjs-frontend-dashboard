import { NavItem } from '@/types';

export type Users = {
	id: number;
	name: string;
	company: string;
	role: string;
	verified: boolean;
	status: string;
};

export const users: Users[] = [
	{
		id: 1,
		name: 'Candice Schiner',
		company: 'Dell',
		role: 'Frontend Developer',
		verified: false,
		status: 'Active',
	},
	{
		id: 2,
		name: 'John Doe',
		company: 'TechCorp',
		role: 'Backend Developer',
		verified: true,
		status: 'Active',
	},
	{
		id: 3,
		name: 'Alice Johnson',
		company: 'WebTech',
		role: 'UI Designer',
		verified: true,
		status: 'Active',
	},
	{
		id: 4,
		name: 'David Smith',
		company: 'Innovate Inc.',
		role: 'Fullstack Developer',
		verified: false,
		status: 'Inactive',
	},
	{
		id: 5,
		name: 'Emma Wilson',
		company: 'TechGuru',
		role: 'Product Manager',
		verified: true,
		status: 'Active',
	},
	{
		id: 6,
		name: 'James Brown',
		company: 'CodeGenius',
		role: 'QA Engineer',
		verified: false,
		status: 'Active',
	},
	{
		id: 7,
		name: 'Laura White',
		company: 'SoftWorks',
		role: 'UX Designer',
		verified: true,
		status: 'Active',
	},
	{
		id: 8,
		name: 'Michael Lee',
		company: 'DevCraft',
		role: 'DevOps Engineer',
		verified: false,
		status: 'Active',
	},
	{
		id: 9,
		name: 'Olivia Green',
		company: 'WebSolutions',
		role: 'Frontend Developer',
		verified: true,
		status: 'Active',
	},
	{
		id: 10,
		name: 'Robert Taylor',
		company: 'DataTech',
		role: 'Data Analyst',
		verified: false,
		status: 'Active',
	},
];


export type DataUser = {
	id: number;
	created_at: string;
	updated_at: string;
	username: string;
	name: string;
	email: string;
	phone: string;
	role: string;
};

export type SortableField = keyof Pick<DataUser, 'id' | 'name' | 'role'>;

export const navItems: NavItem[] = [
	{
		title: 'Dashboard',
		url: '/dashboard/overview',
		icon: 'dashboard',
		isActive: false,
		items: [], 
	},
	{
		title: 'User',
		url: '/dashboard/user',
		icon: 'user',
		isActive: false,
		items: [], 
	},
	{
		title: 'Service',
		url: '/dashboard/service',
		icon: 'service',
		isActive: false,
		items: [], 
	},
	// {
	// 	title: 'Subscription',
	// 	url: '/dashboard/subscription',
	// 	icon: 'subscription',
	// 	isActive: false,
	// 	items: [], 
	// },
	// {
	// 	title: 'Account',
	// 	url: '#', 
	// 	icon: 'billing',
	// 	isActive: true,

	// 	items: [
	// 		{
	// 			title: 'Profile',
	// 			url: '/dashboard/profile',
	// 			icon: 'userPen',
	// 		},
	// 		{
	// 			title: 'Login',
	// 			url: '/',
	// 			icon: 'login',
	// 		},
	// 	],
	// },
	// {
	// 	title: 'Kanban',
	// 	url: '/dashboard/kanban',
	// 	icon: 'kanban',
	// 	isActive: false,
	// 	items: [],
	// },
];

export const PROTECTED_PAGES = ['/dashbord', '/dashboard/overview', '/dashboard/user', '/dashboard/service', '/dashboard/subscription', '/dashboard/profile'];