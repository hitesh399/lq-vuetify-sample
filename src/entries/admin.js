import Vue from 'vue'
import main from '../main'
import router from '@/routers/admin'
import render from '@/utils/render'
import { getDeviceId, setDeviceId } from '@/utils/auth'
import { guidGenerator } from '@/utils'
import AuthLayout from '../views/Auth/Layout'
import TitleLayout from '../views/Admin/TitleLayout'
import TitleRow from '../views/Admin/TitleRow';
import '../assets/styles/index.scss'

if (!getDeviceId()) {
    setDeviceId(guidGenerator())
}
Vue.component('auth-layout', AuthLayout)
Vue.component('title-layout', TitleLayout)
Vue.component('title-row', TitleRow)

render('admin-layout', router, main);