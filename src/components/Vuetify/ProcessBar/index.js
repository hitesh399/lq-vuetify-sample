import ProcessBar from './ProcessBar'

function Install(Vue, options) {
    const property = (options && options.property) || '$processbar'
    function createProcessBarCmp(options) {
        const cmp = new Vue(Object.assign({}, ProcessBar, {
            propsData: Object.assign({}, Vue.prototype.$processbar.options, options),
            destroyed: () => {
                document.body.removeChild(cmp.$el)
            }
        }))
        document.body.appendChild(cmp.$mount().$el)
        return cmp
    }

    function show(message, options = {}) {
        options.message = message
        return createProcessBarCmp(options)
    }

    Vue.prototype[property] = show
    Vue.prototype[property].options = options || {}
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(Install)
}

export default Install