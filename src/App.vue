<template>
    <component v-bind:is="layout">
        <slot />
    </component>
</template>

<script>
import AdminLayout from './layouts/Admin';
import firebase from './firebase'
export default {
    name: 'App',
    props: {
        layout: String
    },
    components: {
        AdminLayout
    },
    computed: {
        isPublic() {
            return this.$route.meta.isPublic ? true : false;
        }
    },
    created: function() {
        this.$axios('site-general-config').then(response => {
            this.$store.dispatch('updateAppKey', {
                key: 'configs',
                value: response.data.data
            });
        });

        this.$axios('device/user').then(response => {
            this.$store.dispatch('updateAppKey', {
                key: 'device_users',
                value: response.data.device_users
            });
        });
        firebase.messaging.onMessage((payload) => {
            console.log('Get Message from firebase', payload)
            this.browserNotify(payload)
        })
        this.$socket.on('connect', this.joinToSocket);
    },
    methods: {
        joinToSocket() {
            const { id } = this.$socket;
            if (this.authId && id) {
                this.$axios.post('socket/join', { socket_id: id });
            }
        }
    },
    watch: {
        authId(newVal) {
            if (newVal) {
                this.joinToSocket();
            }
        }
    }
};
</script>

