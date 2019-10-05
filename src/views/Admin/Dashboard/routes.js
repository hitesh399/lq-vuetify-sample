import Dashboard from './index'

export default {
    path: '/dashboard',
    name: 'dashboard',
    title: 'Dashboard',
    component: Dashboard,
    meta: {
        heading: 'Dashborad',
        isPublic: false,
        icon: 'dashboard',
        permission: 'admin.dashboard'
    }
}