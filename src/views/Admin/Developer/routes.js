import Parent from '../../ParentRouteView'
import RequestLog from './RequestLog'
import Command from './Command'
import PermissionRoute from '../Permission/routes'
import ApplicationMenu from '../ApplicationMenu/routes'

export default

    {
        path: '/developer',
        title: 'Developer',
        component: Parent,
        meta: { heading: 'Developer', icon: 'developer_mode' },
        children: [
            {
                path: 'request-log',
                name: 'developer.request_log.list',
                component: RequestLog,
                title: 'Request Log',
                meta: {
                    heading: 'Request Log',
                    icon: 'developer_mode',
                    permission: 'admin.developer'
                }
            },
            {
                path: 'server-command',
                name: 'developer.server_command',
                component: Command,
                title: 'Server Command',
                meta: {
                    heading: 'Server Command',
                    icon: 'developer_mode',
                    permission: 'admin.developer'
                }
            },
            PermissionRoute,
            ApplicationMenu
        ]
    }