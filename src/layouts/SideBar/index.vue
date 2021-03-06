<template>
    <v-navigation-drawer
        id="app-drawer"
        v-model="drawer"
        :mini-variant="miniVariant && hoverWhenMini ? false: miniVariant"
        :app="miniVariant && hoverWhenMini ? false : true"
        dark
        :fixed="hoverWhenMini"
        floating
        persistent
        mobile-break-point="991"
        width="260"
    >
        <v-img
            :src="image"
            @mouseleave="hoverWhenMini=false"
            @mouseover="miniVariant ? hoverWhenMini = true : null"
            :gradient="sidebarOverlayGradiant"
            height="100%"
        >
            <v-layout class="fill-height" tag="v-list" column>
                <div data-simplebar style="height: 100%; overflow-x: hidden">
                    <v-list-tile avatar>
                        <v-list-tile-avatar color="white">
                            <v-img :src="logo" height="34" contain />
                        </v-list-tile-avatar>
                        <v-list-tile-title>Vuetify MD</v-list-tile-title>
                        <v-btn
                            icon
                            @click.stop="miniVariant = !miniVariant"
                            v-if="!$root.responsive"
                        >
                            <v-icon
                                class="text-white"
                                v-html="miniVariant ? 'chevron_right' : 'chevron_left'"
                            ></v-icon>
                        </v-btn>
                    </v-list-tile>
                    <v-divider />
                    <v-list
                        class="pa-0"
                        :class="{'mini' : miniVariant && !hoverWhenMini, 'main-theme-nav': true}"
                    >
                        <sidebar-item
                            :item="route"
                            :mini-variant="miniVariant && !hoverWhenMini"
                            v-for="route in routes"
                            :active-class="miniVariant && !hoverWhenMini ? undefined : color"
                            :check-permission="checkPermission"
                            :key="`${path}_${route.name ? route.name : route.title}`"
                        ></sidebar-item>
                    </v-list>
                </div>
                <v-list-tile
                    active-class="primary"
                    class="v-list-item v-list__tile--buy"
                    to="/logout"
                >
                    <v-list-tile-action>
                        <v-icon>logout</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title class="font-weight-light">Logout</v-list-tile-title>
                </v-list-tile>
            </v-layout>
        </v-img>
    </v-navigation-drawer>
</template>
<script>
import SidebarItem from './sidebar-item';
import { mapGetters } from 'vuex';
const Logo = require('@/assets/logo.png');

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
    data: () => ({
        logo: Logo,
        hoverWhenMini: false
    }),
    computed: {
        ...mapGetters(['sidebar', 'authProfile', 'app']),
        image() {
            return this.app.image;
        },
        color() {
            return this.app.color;
        },
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
        sidebarOverlayGradiant() {
            return `${this.$store.state.app.sidebarBackgroundColor}, ${this.$store.state.app.sidebarBackgroundColor}`;
        },
        currentRouteName() {
            return this.$router.currentRoute.name;
        }
    }
};
</script>

<style lang="scss">
#app-drawer {
    .v-list__tile {
        border-radius: 4px;

        &--buy {
            margin-top: auto;
            margin-bottom: 17px;
        }
    }

    .v-image__image--contain {
        top: 9px;
        height: 60%;
    }

    .search-input {
        margin-bottom: 30px !important;
        padding-left: 15px;
        padding-right: 15px;
    }

    div.v-responsive.v-image > div.v-responsive__content {
        overflow-y: auto;
    }
    &:not(.v-navigation-drawer--mini-variant)
        .main-theme-nav.v-list
        .v-list__tile {
        margin: 5px 5px 5px
    }
    .v-list__tile__action {
        min-width: 32px;
    }
}
</style>