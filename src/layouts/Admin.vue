<template>
    <v-app :class="{
        'public-app': isPublic
    }">
        <side-bar v-if="!isPublic" ref="sidebar" :check-permission="checkPermission" />
        <top-bar v-if="!isPublic" @toggle-left-drawer="toggleLeftDrawer" />
        <v-content v-if="!isPublic">
            <router-view />
        </v-content>
        <v-container v-else authspace fill-height>
            <router-view />
        </v-container>
    </v-app>
</template>
<script>
import SideBar from './SideBar';
import TopBar from './TopBar';
const portal = require('@/utils/portal-helper');
const currentPortal = portal.currentPortal;

export default {
    components: {
        SideBar,
        TopBar
    },
    name: 'admin-layout',
    computed: {
        isPublic() {
            return this.$route.meta.isPublic ? true : false;
        },
        checkPermission() {
            return currentPortal.get('VUE_APP_CHECK_PERMISSION') === 'false'
                ? false
                : true;
        }
    },
    methods: {
        toggleLeftDrawer() {
            this.$store.dispatch('ToggleSideBar');
        }
    },
    mounted: function() {
        this.$root.$dialogLoader = this.$refs.dialogLoader;
        this.$root.$confirm = this.$refs.confirm.open;
    }
};
</script>
