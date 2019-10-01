import moment from 'moment-timezone';
import Vue from 'vue';

Object.defineProperties(Vue.prototype, {
    $moment: {
        get() {
            return moment
        }
    },
})