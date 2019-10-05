import Parent from '../../ParentRouteView'
import List from './index'

export default {
    path: '/config',
    title: 'Config',
    component: Parent,
    meta: { heading: 'Config', icon: 'control_point' },
    children: [
        {
            path: '',
            name: 'config.list',
            component: List,
            title: 'Config',
            meta: {
                heading: 'Configuration',
                icon: 'control_point',
                permission: 'admin.config'
            }
        }
    ]
}
