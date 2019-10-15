<template>
    <v-app :class="{
        'public-app': isPublic
    }">
        <component v-bind:is="layout">
            <slot />
        </component>
        <MessageQueue />
    </v-app>
</template>

<script>
import AdminLayout from './layouts/Admin';

import MessageQueue from './components/Vuetify/MessageQueue';

export default {
    name: 'App',
    props: {
        layout: String
    },
    components: {
        AdminLayout,
        MessageQueue
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
    }
};
</script>

