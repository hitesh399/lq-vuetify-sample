import main from '../main'
import router from '@/routers/admin'
import ProtectedPortal from '@/utils/protected-portal'
import { getDeviceId, setDeviceId } from '@/utils/auth'
import { guidGenerator } from '@/utils'
import Vue from 'vue'
import TitleLayout from '../views/Admin/TitleLayout'

/**
 * Mouting the APP
 */

if (!getDeviceId()) {
    setDeviceId(guidGenerator())
} 
Vue.component('title-layout', TitleLayout)

ProtectedPortal('admin-layout', router, main);