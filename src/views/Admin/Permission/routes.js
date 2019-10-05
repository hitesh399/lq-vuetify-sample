import Parent from '../../ParentRouteView'
import List from './index'
import Edit from './Edit'
import Create from './Create'

export default 

	{
		path: 'permission',
		title: 'permission',
		component: Parent,
		meta: {heading: 'Permission',  icon: 'perm_data_setting', permission: 'admin.developer' },
		children: [
			{
				path: '',
				name: 'permission.list',
				component: List,
				title: 'Permission',
				meta: {
					heading:'Permission', 
					icon: 'perm_data_setting',
					permission: 'admin.developer'
				}
			},
			{
				path: 'create',
				name: 'permission.create',
				component: Create,
				title: 'Permission Create',
				hidden: true,
				meta: {
					heading:'Create New Permission', 
					icon: 'perm_data_setting',
					permission: 'admin.developer'
				}
			},
			{
				path: ':id/edit',
				name: 'permission.edit',
				component: Edit,
				hidden: true,
				title: 'Permission Edit',
				meta: {
					heading:'Permission Edit', 
					icon: 'perm_data_setting',
					permission: 'admin.developer'
				}
			}
		]
	}