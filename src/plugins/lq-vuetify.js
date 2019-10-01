import Vue from 'vue'
import lqVuetify from 'lq-vuetify'
import LoadMore from '@/components/Vuetify/LoadMore';
import NoRecordFound from '@/components/Vuetify/NoRecordFound';
Vue.component('load-more', LoadMore)
Vue.component('no-record-found', NoRecordFound)

Vue.use(lqVuetify)