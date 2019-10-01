import 'url-polyfill'
import '@babel/polyfill'

import Vue from 'vue'
import './plugins'
import App from './App'
import store from './store'
import './registerServiceWorker'
import GlobalMix from './mixins/global-mix'

Vue.mixin(GlobalMix)

Vue.config.productionTip = process.env.NODE_ENV === 'production' ? false : true

const main = (props, router) => new Vue({
    router,
    store,
    render: h => h(App, {
        props: props
    })
}).$mount('#app')
export default main
