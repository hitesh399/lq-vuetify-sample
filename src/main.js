import 'url-polyfill'
import '@babel/polyfill'

import Vue from 'vue'
import './plugins'
import App from './App'
import store from './store'
import './registerServiceWorker'
import GlobalMix from './mixins/global-mix'
import ConfirmAction from './mixins/confirm-and-action'

Vue.mixin(GlobalMix)
Vue.mixin(ConfirmAction)

Vue.config.productionTip = process.env.NODE_ENV === 'production' ? false : true

const main = (props, router) => new Vue({
    router,
    store,
    data() {
        return {
            responsive: false,
        }
    },
    render(h) {
        return h(App, {
            props: props
        })
    },
    created() {
        this.onResponsiveInverted();
        window.addEventListener('resize', this.onResponsiveInverted);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.onResponsiveInverted);
    },
    methods: {
        onResponsiveInverted() {
            if (window.innerWidth < 991) {
                this.responsive = true;
            } else {
                this.responsive = false;
            }
        },
        rerender() {
            const name = this.$route.name;
            const params = this.$route.params;
            this.$router.replace('/', () => {
                 this.$nextTick(() => {
                    if (this.$route.name !== name) {
                        this.$router.push({name: name, params: params})
                    }
                 })
            })
        }
    }
}).$mount('#app')

Number.prototype.pad = function (size) {
    let s = String(this);
    while (s.length < (size || 2)) { s = "0" + s; }
    return s;
}
export default main
