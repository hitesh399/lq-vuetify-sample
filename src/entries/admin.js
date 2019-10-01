import main from '../main'
import router from '@/routers/admin'
import render from '@/utils/render'
import { getDeviceId, setDeviceId } from '@/utils/auth'
import { guidGenerator } from '@/utils'

if (!getDeviceId()) {
    setDeviceId(guidGenerator())
}

render('admin-layout', router, main);