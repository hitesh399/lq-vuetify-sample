import Parent from '../../ParentRouteView'
import List from './index'
import Create from './Create'
import Edit from './Edit'

export default
    {
        path: '/admin-user',
        title: 'Admin',
        component: Parent,
        meta: { heading: 'Admin List', icon: 'person' },
        hidden: false,
        children: [
            {
                path: '',
                name: 'admin.list',
                component: List,
                title: 'Admin Users',
                meta: {
                    heading: 'Admin Users',
                    icon: 'person',
                    permission: 'admin.admin'
                },
            },
            {
                path: 'create',
                name: 'admin.create',
                hidden: true,
                meta: {
                    heading: 'Create Admin',
                    permission: 'admin.admin'
                },
                component: Create,
            },
            {
                path: ':id/edit',
                name: 'admin.edit',
                hidden: true,
                meta: {
                    heading: 'Edit Admin',
                    permission: 'admin.admin'
                },
                component: Edit,
            }
        ]
    }

