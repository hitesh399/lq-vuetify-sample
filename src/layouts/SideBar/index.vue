<template>
    <v-navigation-drawer
        width="270"
        class="left-sidebar"
        :clipped="true"
        persistent
        :mini-variant.sync="miniVariant"
        hide-overlay
        v-model="drawer"
        fixed
        app
    >
        <v-toolbar flat class="transparent" dense>
            <v-list class="pa-0" :class="{'list-border-bottom' : miniVariant}">
                <sidebar-item
                    :item="route"
                    :mini-variant="miniVariant"
                    v-for="route in routes"
                    :check-permission="checkPermission"
                    :key="`${path}_${route.name ? route.name : route.title}`"
                ></sidebar-item>
            </v-list>
        </v-toolbar>
    </v-navigation-drawer>
</template>
<script>
import SidebarItem from './sidebar-item';
import { mapGetters } from 'vuex';

export default {
    name: 'sidebar',

    components: {
        SidebarItem
    },
    props: {
        path: String,
        checkPermission: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        ...mapGetters(['sidebar', 'authProfile']),
        routes() {
            if (this.path) {
                let routes = [];
                this.$router.options.routes.every(route => {
                    if (route.path === this.path) {
                        routes = route.children;
                        return;
                    }
                    return true;
                });
                return routes;
            }
            return this.$router.options.routes;
        },
        drawer: {
            get() {
                const status = this.$helper.getProp(
                    this.$store.state.app,
                    'sidebar.opened',
                    'yes'
                );
                return status === 'yes';
            },
            set(value) {
                this.$store.dispatch('SIDEBAR_STATUS', value ? 'yes' : 'no');
            }
        },
        miniVariant: {
            get() {
                const status = this.$helper.getProp(
                    this.$store.state.app,
                    'sidebar.miniVariant',
                    'yes'
                );
                return status === 'yes';
            },
            set() {
                this.$store.dispatch('ToggleMinVariant');
            }
        },
        currentRouteName() {
            return this.$router.currentRoute.name;
        }
    }
};
</script>

<style>
</style>
