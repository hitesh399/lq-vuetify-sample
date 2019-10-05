import Parent from '../../ParentRouteView'
import List from './index'
import Edit from './Edit'
import Create from './Create'
import EmailTemplateBody from './EmailTemplateBody'

export default

    {
        path: '/notification-template',
        title: 'Notification Template',
        component: Parent,
        meta: { heading: 'Notification Template', icon: 'view_list' },
        children: [
            {
                path: '',
                name: 'notification.template.list',
                component: List,
                title: 'Notification Template',
                meta: {
                    heading: 'Notification Template',
                    icon: 'view_list',
                    permission: 'admin.notification-template'
                }
            },
            {
                path: 'create',
                name: 'notification.template.create',
                component: Create,
                title: 'Notification Template Create',
                hidden: true,
                meta: {
                    heading: 'Create New Notification Template',
                    icon: 'view_list',
                    permission: 'admin.notification-template'
                }
            },
            {
                path: 'email/body',
                name: 'notification.template.email.body',
                component: EmailTemplateBody,
                title: 'Email Template Body',
                hidden: true,
                meta: {
                    heading: 'Update Email Template Body',
                    icon: 'view_list',
                    permission: 'admin.notification-template'
                }
            },
            {
                path: ':id/edit',
                name: 'notification.template.edit',
                component: Edit,
                hidden: true,
                title: 'Notification Template Edit',
                meta: {
                    heading: 'Edit Notification Template',
                    icon: 'view_list',
                    permission: 'admin.notification-template'
                }
            }
        ]
    }
