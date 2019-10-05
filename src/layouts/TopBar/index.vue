<template>
    <div class="header-Wrap">
        <v-toolbar
            id="core-toolbar"
            color="white"
            flat
            :class="{ mini: isMiniVariant, 'main-top': true }"
            :app="isDrawerOpen ? false: true"
            prominent
        >
            <v-toolbar-side-icon color="primary" @click.stop="toggleDrawer"></v-toolbar-side-icon>
            <!-- <v-toolbar-title>{{$helper.getProp($route, 'meta.heading', 'No Heading')}}</v-toolbar-title> -->
            <v-toolbar-items v-if="!$root.responsive">
                <v-list-tile avatar>
                    <v-list-tile-avatar>
                        <v-img :src="logo" height="34" contain />
                    </v-list-tile-avatar>
                    <v-list-tile-title>Vuetify MD</v-list-tile-title>
                </v-list-tile>
            </v-toolbar-items>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-flex align-center layout py-2>
                    <v-menu
                        offset-y
                        origin="center center"
                        :nudge-bottom="10"
                        transition="scale-transition"
                    >
                        <div icon slot="activator" class="align-center d-flex profie-btn">
                            <v-avatar class="small-user-profile">
                                <v-img
                                    :src="$helper.getProp(authProfile, 'profile_image.path')"
                                    :alt="$helper.getProp(authProfile, 'name')"
                                ></v-img>
                            </v-avatar>
                            <v-list-tile-title
                                class="font-weight-medium"
                            >{{ $helper.getProp(authProfile, 'name')}}</v-list-tile-title>
                        </div>
                        <v-list class="pa-0" light>
                            <v-list-tile avatar>
                                <v-list-tile-avatar>
                                    <v-avatar>
                                        <v-img
                                            :src="$helper.getProp(authProfile, 'profile_image.path')"
                                            :alt="$helper.getProp(authProfile, 'name')"
                                        ></v-img>
                                    </v-avatar>
                                </v-list-tile-avatar>
                                <v-list-tile-content>
                                    <router-link to="/">
                                        <v-list-tile-title>{{ $helper.getProp(authProfile, 'name')}}</v-list-tile-title>
                                        <v-list-tile-sub-title>{{ $helper.getProp(authProfile, 'role.title')}}</v-list-tile-sub-title>
                                    </router-link>
                                </v-list-tile-content>
                            </v-list-tile>
                            <v-divider></v-divider>

                            <v-list-tile key="lock_open" @click="logOut">
                                <v-list-tile-action>
                                    <v-icon>lock_open</v-icon>
                                </v-list-tile-action>
                                <v-list-tile-content>
                                    <v-list-tile-title>Logout</v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        </v-list>
                    </v-menu>
                    <v-tooltip bottom>
                        <v-btn
                            icon
                            @click.stop="rightDrawer = !rightDrawer; readNotification()"
                            slot="activator"
                            :class="{
                        'no-notification': totalUnreadNotification ? false : true
                      }"
                        >
                            <v-badge overlap>
                                <span slot="badge">{{totalUnreadNotification}}</span>
                                <v-icon color="tertiary">notifications_active</v-icon>
                            </v-badge>
                        </v-btn>
                        <span>{{ totalUnreadNotification }} unread notifications</span>
                    </v-tooltip>
                </v-flex>
            </v-toolbar-items>
        </v-toolbar>
        <notification :drawer="rightDrawer" @close="rightDrawer=false" />
    </div>
</template>

<script>
import notification from './notification';
import { logOutUser } from '@/utils/auth';
import { mapGetters } from 'vuex';
const Logo = require('@/assets/logo.png');

export default {
    name: 'top-bar',
    components: {
        notification
    },
    computed: {
        ...mapGetters(['sidebar', 'authProfile']),
        totalUnreadNotification() {
            return this.$helper.getProp(
                this.$store.state.table,
                'my_notifications.settings.other_data.unread_total',
                0
            );
        },
        isDrawerOpen() {
            const status = this.$helper.getProp(
                this.$store.state.app,
                'sidebar.opened',
                'yes'
            );
            return status === 'yes';
        },
        isMiniVariant() {
            const status = this.$helper.getProp(
                this.$store.state.app,
                'sidebar.miniVariant',
                'yes'
            );
            return status === 'yes';
        }
    },
    data: function() {
        return {
            search: '',
            searching: false,
            rightDrawer: false,
            logo: Logo
        };
    },
    methods: {
        onBlur() {
            this.searching = false;
            this.search = '';
        },
        toggleDrawer() {
            if (this.isMiniVariant) {
                this.$store.dispatch('ToggleMinVariant');
            } else {
                this.$emit('toggle-left-drawer');
            }
        },
        searchBegin() {
            this.searching = true;
            setTimeout(() => document.querySelector('#search').focus(), 50);
        },
        searchEnd() {
            this.searching = false;
            this.search = '';
            document.querySelector('#search').blur();
        },
        logOut() {
            return logOutUser();
        },
        readNotification() {
            if (!this.totalUnreadNotification) {
                return;
            }
            this.axios.patch('notification').then(() => {
                this.$store.commit('table/updateSetting', {
                    tableName: 'my_notifications',
                    key: 'other_data.unread_total',
                    value: 0
                });
            });
        }
    }
};
</script>

<style>
.mini .v-toolbar__content {
    margin-left: 80px !important;
}
</style>
