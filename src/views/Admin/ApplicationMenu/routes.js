import Parent from '../../ParentRouteView'
import List from './index'
import Edit from './Edit'
import Create from './Create'
import menuItemsRoute from '../ApplicationMenuItem/routes'

export default {
		path: 'application-menu',
		title: 'Application Menu',
		component: Parent,
		meta: { heading: 'Application Menu', icon: false, permission: 'admin.developer'},
		children: [
			{
				path: 'list',
				name: 'application_menu.list',
				component: List,
				title: 'Menu',
                meta: {
                    heading:'Application Menu',
                    permission: 'admin.developer'
                }
            },
            menuItemsRoute,
            {
                path: ':id/edit',
                name: 'application_menu.edit',
                component: Edit,
                hidden: true,
                title: 'Application Menu Edit',
                meta: {
                    heading:'Application Menu Edit',
                    permission: 'admin.developer'
                }
            },
            {
                path: 'create',
                name: 'application_menu.create',
                component: Create,
                hidden: true,
                title: 'Create New Application Menu',
                meta: {
                    heading:'Create New Application Menu',
                    permission: 'admin.developer'
                }
            }
        ]
    }