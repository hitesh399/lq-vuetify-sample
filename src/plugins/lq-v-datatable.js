import LqVDataTable from 'lq-v-data-table'
import Vue from 'vue'
import { canAccess } from '../utils'

Vue.use(LqVDataTable, {
    can: canAccess
})