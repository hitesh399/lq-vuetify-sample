import { mapGetters } from 'vuex';
import { canAccess } from '../utils'
import DefaultProfileImage from '../assets/images/profile_pic.jpg';

export default {
    name: 'global-mix',
    computed: {
        timeZone: function () {
            return this.$moment.tz.guess();
        },
        isDeveloper() {
            return !!this.$route.query.developer;
        },
        ...mapGetters(['authProfile']),
        authId() {
            return this.$helper.getProp(this.authProfile, 'id')
        },
        who() {
            return this.$helper.getProp(this.authProfile, 'role.name')
        }
    },
    methods: {
        displayDate(date, format = 'DD MMM YYYY', timeZone = 'UTC') {
            const moment_date = date ? this.$moment.tz(date, timeZone) : null;
            return moment_date ? moment_date.tz(this.timeZone).format(format) : 'N/A';
        },
        displayDateTime(date, format = 'DD MMM YYYY hh:mm A', timeZone = 'UTC') {
            const moment_date = date ? this.$moment.tz(date, timeZone) : null;
            return moment_date ? moment_date.tz(this.timeZone).format(format) : 'N/A';
        },
        displayTime(date, format = 'hh:mm A', timeZone = 'UTC') {
            const moment_date = date ? this.$moment.tz(date, timeZone) : null;
            return moment_date ? moment_date.tz(this.timeZone).format(format) : 'N/A';
        },
        timeDiff(endTime, fromTime, diffIn = 'seconds') {
            const moment_date = this.$moment.tz(endTime);
            const moment_now = this.$moment.tz(fromTime);
            return moment_date.diff(moment_now, diffIn, true);
        },
        secondsToHumanReadable(seconds) {
            const minutes = Math.floor(seconds / 60);
            const _seconds = seconds % 60
            return this.pad(minutes, 2) + ':' + this.pad(_seconds, 2);
        },
        pad(num, size, position = 'left') {
            var s = num + ""
            while (s.length < size) s = position === 'left' ? '0' + s : s + '0'
            return s
        },
        toFixed(num, maxDigit = 2) {
            return parseFloat(Math.round(num * 100) / 100).toFixed(maxDigit)
        },
        can(permissions) {
            return canAccess(permissions)
        },
        browserNotify(payload) {
            const notification_title = this.$helper.getProp(payload, 'notification.title')
            const notification_body = this.$helper.getProp(payload, 'notification.body')
            const data_title = this.$helper.getProp(payload, 'data.title')
            const data_body = this.$helper.getProp(payload, 'data.body')

            const title = notification_title ? notification_title : data_title
            const body = notification_body ? notification_body : data_body

            // Let's check if the browser supports notifications
            if (!("Notification" in window)) {
                this.$message.error("This browser does not support desktop notification");
                return; 
            }

            // Let's check whether notification permissions have already been granted
            else if (Notification.permission === "granted") {
                // If it's okay let's create a notification
                new Notification(title, {
                    body: body,
                    icon: '/img/favicon-16x16.png'
                });
            } else if (Notification.permission !== "denied") {
                Notification.requestPermission().then(function (permission) {
                    // If the user accepts, let's create a notification
                    if (permission === "granted") {
                        new Notification(title, {
                            body: body,
                            icon: '/img/favicon-16x16.png'
                        });
                    }
                });
            }
        }
    },
    data() {
        return {
            defaultProfileImage: DefaultProfileImage
        }
    }
}