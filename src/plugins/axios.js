import Vue from 'vue'
import axios from 'axios'
import { getToken, getDeviceId } from '@/utils/auth'
import { getTimeOffset } from '@/utils'
import { removeToken, removeRefreshToken } from '@/utils/auth'
const portal = require('@/utils/portal-helper');
const currentPortal = portal.currentPortal;

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || ''
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

let config = {
    baseURL: currentPortal.getApiBaseUrl(), // api Base URl
}

let _axios = axios.create(config)
_axios.defaults.headers.common['client-id'] = currentPortal.getClientId();
_axios.defaults.headers.common['Accept'] = 'application/json, text/plain, */*';

_axios.interceptors.request.use(
    config => {
        const authToken = getToken();
        if (authToken) {
            config.headers['Authorization'] = 'Bearer ' + authToken;
        }
        config.headers['device-id'] = getDeviceId();
        config.headers['time-offset'] = getTimeOffset();
        // Do something before request is sent
        return config
    },
    error => {
        // Do something with request error
        return Promise.reject(error)
    }
)

// Add a response interceptor
_axios.interceptors.response.use(
    response => {
        // Do something with response data
        return response.data
    },
    error => {
        // Do something with response error
        // if (error) 
        // console.log(error.status, error.request, 'Error')
        if (error && error.request && error.request.status === 401) {
            removeToken();
            removeRefreshToken();
            // logOutUser();
        }
        return Promise.reject(error)
    }
)

Plugin.install = function (Vue) {
    Vue.axios = _axios
    window.axios = _axios
    Object.defineProperties(Vue.prototype, {
        axios: {
            get() {
                return _axios
            }
        },
        $axios: {
            get() {
                return _axios
            }
        }
    })
}

Vue.use(Plugin)

export default Plugin
export { _axios };
