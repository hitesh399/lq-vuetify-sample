
import MyProfile from './index';
import Show from './Show';
import ResetPassword from './ResetPassword';
import MyAppSetting from './MyAppSetting';
import Parent from '../../ParentRouteView'

export default

    {
        path: '/my-profile',
        title: 'My Profile',
        component: MyProfile,
        meta: { heading: 'My Profile', icon: 'view_list' },
        // hidden: true,
        children: [
            {
                path: '',
                // hidden: true,
                name: 'my-profile.show',
                component: Show,
                title: 'My Profile',
                meta: {
                    heading: 'My Profile',
                    icon: 'view_list',
                    permission: 'myprofile'
                }
            },
            {
                path: 'change-pasword',
                hidden: true,
                name: 'my-profile.resetpassword',
                component: ResetPassword,
                title: 'My Profile',
                meta: {
                    permission: 'myprofile'
                }
            },
            {
                path: 'app-setting',
                hidden: true,
                name: 'my-profile.appsetting',
                component: MyAppSetting,
                title: 'My Profile',
                meta: {
                    permission: 'myprofile'
                }
            }
        ]
    }