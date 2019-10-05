import Parent from '../../ParentRouteView'
import List from './index'
import Edit from './Edit'
import Create from './Create'

export default

    {
        path: '/role',
        title: 'Role',
        component: Parent,
        meta: { heading: 'Role', icon: 'security' },
        children: [
            {
                path: '',
                name: 'role.list',
                component: List,
                title: 'Role',
                meta: {
                    heading: 'Role',
                    icon: 'security',
                    permission: 'admin.role'
                }
            },
            {
                path: ':id/edit',
                name: 'role.edit',
                component: Edit,
                hidden: true,
                title: 'Role Edit',
                meta: {
                    heading: 'Role Edit',
                    icon: 'security',
                    permission: 'admin.role'
                }
            },
            {
                path: 'create',
                name: 'role.create',
                component: Create,
                hidden: true,
                title: 'Create Role',
                meta: {
                    heading: 'Create New Role',
                    icon: 'security',
                    permission: 'admin.role'
                }
            }
        ]
    }
