
import Parent from '../../ParentRouteView'
import ItemList from './index'
import ItemEdit from './Edit'
import ItemCreate from './Create'

export default {
    path: 'item',
    component: Parent,
    title: 'Menu Item',
    meta: {
        heading: 'Application Menu Item',
        permission: 'admin.developer'
    },
    children: [
        {
            path: '',
            name: 'application_menu_item.list',
            component: ItemList,
            title: 'Menu Item',
            meta: {
                heading: 'Application Menu Item',
                permission: 'admin.developer'
            }
        },
        {
            path: ':id/edit',
            name: 'application_menu_item.edit',
            component: ItemEdit,
            hidden: true,
            title: 'Application Menu Item Edit',
            meta: {
                heading: 'Application Menu Item Edit',
                permission: 'admin.developer'
            }
        },
        {
            path: 'create',
            name: 'application_menu_item.create',
            component: ItemCreate,
            hidden: true,
            title: 'Create New Application Menu Item',
            meta: {
                heading: 'Create New Application Menu Item',
                permission: 'admin.developer'
            }
        }
    ]
}