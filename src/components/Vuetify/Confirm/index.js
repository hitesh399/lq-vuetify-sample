import Confirm from './Confirm.vue'
import store from '../../../store'

function Install(Vue, options) {
    const property = (options && options.property) || '$confirm'
    function createDialogCmp(options, component, callback) {
        return new Promise(resolve => {
            const cmp = new Vue(Object.assign({}, Confirm, {
                store,
                propsData: Object.assign(
                    {}, 
                    Vue.prototype.$confirm.options, 
                    options, 
                    { customComponent: component, callback: callback }
                ),
                destroyed: (c) => {
                    document.body.removeChild(cmp.$el)
                    resolve(cmp.value)
                }
            }))
            document.body.appendChild(cmp.$mount().$el)
        })
    }

    function show(message, options = {}, component, callback) {
        options.message = message
        return createDialogCmp(options, component, callback)
    }

    Vue.prototype[property] = show
    Vue.prototype[property].options = options || {}
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(Install)
}

export default Install