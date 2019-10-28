import lqVuetify from 'lq-v-file'
import VueCroppie from 'vue-croppie'
import 'croppie/croppie.css' // import the croppie css manually
import Vue from 'vue'
Vue.use(VueCroppie)
Vue.use(lqVuetify, {
    uploadUrl: '/media',
    tokenUrl: '/media-token',
    rotateRightIcon: 'rotate_right',
    rotateLeftIcon: 'rotate_left',
    deleteIcon: 'delete',
    changeIcon: 'insert_drive_file',
    cropIcon: 'crop',
    addIcon: 'add',
    viewIcon: 'remove_red_eye',
})