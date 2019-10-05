<template>
    <v-app :class="{
        'public-app': isPublic
    }">
        <side-bar v-if="!isPublic" ref="sidebar" :check-permission="checkPermission" />
        <top-bar v-if="!isPublic" @toggle-left-drawer="toggleLeftDrawer" />
        <v-content v-if="!isPublic">
            <div id="core-view">
                <v-fade-transition mode="out-in">
                    <router-view />
                </v-fade-transition>
            </div>
            <bottom-bar />
        </v-content>
        <v-container v-else authspace fill-height>
            <v-fade-transition mode="out-in">
                <router-view />
            </v-fade-transition>
        </v-container>
    </v-app>
</template>
<script>
import SideBar from './SideBar';
import TopBar from './TopBar';
import BottomBar from './BottomBar/Bottom';
const portal = require('@/utils/portal-helper');
const currentPortal = portal.currentPortal;

export default {
    components: {
        SideBar,
        TopBar,
        BottomBar
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
    }
};
</script>


<style>
#core-view {
    padding-bottom: 100px;
}
</style>