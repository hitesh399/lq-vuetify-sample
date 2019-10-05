import Vue from 'vue'
import Vuetify from 'vuetify'
import theme from './theme'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont';
import '@mdi/font/scss/materialdesignicons.scss';


Vue.use(Vuetify, {
  iconfont: 'mdi',
  theme
})
