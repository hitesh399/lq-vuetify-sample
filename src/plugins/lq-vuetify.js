import Vue from 'vue'
import lqVuetify from 'lq-vuetify'
import LoadMore from '@/components/Vuetify/LoadMore';
import NoRecordFound from '@/components/Vuetify/NoRecordFound';
import EmailMobileNumber from '@/components/Vuetify/EmailMobileNumber';
import SubmitBtn from '@/components/Vuetify/SubmitBtn';
import SerialNo from '@/components/Vuetify/SerialNo';
import DeleteSelected from '../components/Vuetify/DeleteSelected';
import DeleteDataTableItem from '../components/Vuetify/DeleteDataTableItem';
import VuetifyConfirm from '../components/Vuetify/Confirm'
import VuetifyProcessBar from '../components/Vuetify/ProcessBar'
import ImageUploader from '../components/Vuetify/ImageUploader';

import BackBtn from '../views/BackBtn';
import Editor from '@/components/Tinymce';

import '@/components/Material';
import '@/components/Helper';

Vue.component('lq-v-text-editor', Editor)
Vue.component('load-more', LoadMore)
Vue.component('no-record-found', NoRecordFound)
Vue.component('email-mobile-input', EmailMobileNumber)
Vue.component('lq-v-submit-btn', SubmitBtn)
Vue.component('go-back', BackBtn)
Vue.component('v-serial-no', SerialNo)
Vue.component('lq-v-delete-selected', DeleteSelected)
Vue.component('lq-v-delete-data-table-item', DeleteDataTableItem)
Vue.component('image-uploader', ImageUploader)

Vue.use(VuetifyConfirm, {
    buttonTrueText: 'Yes',
    buttonFalseText: 'Discard',
    color: 'warning',
    icon: 'warning',
    title: 'Warning',
    width: 350,
    property: '$confirm'
})
Vue.use(lqVuetify)
Vue.use(VuetifyProcessBar)
