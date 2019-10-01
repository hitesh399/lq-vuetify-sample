import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
// import 'font-awesome/css/font-awesome.min.css'
import '../../node_modules/@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify, {
    iconfont: 'mdi',
    theme: {
        "primary": "#000000",
    }
})
