<template>
  <div class="header-Wrap">
    <v-toolbar app clipped-left>
      <div class="site-logo">
        <router-link :to="{name: authProfile.role.name === 'customer' ? 'Dashboard' : 'dashboard'}">
          <v-img :src="logoImage" height="35px" width="111px" />
        </router-link>
      </div>
      <v-toolbar-side-icon @click.stop="$emit('toggle-left-drawer')" />
      <div class="d-flex align-center justify-end side-links">
        <v-menu offset-y origin="center center" :nudge-bottom="10" transition="scale-transition">
          <div icon slot="activator" class="align-center d-flex profie-btn">
            <v-avatar class="small-user-profile">
              <v-img
                :src="$helper.getProp(authProfile, 'profile_image.path')"
                :alt="$helper.getProp(authProfile, 'name')"
              ></v-img>
            </v-avatar>
            <v-list-tile-title class="font-weight-medium">{{ $helper.getProp(authProfile, 'name')}}</v-list-tile-title>
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
            <v-badge color="red" overlap>
              <span slot="badge">{{totalUnreadNotification}}</span>
              <v-icon>notifications</v-icon>
            </v-badge>
          </v-btn>
          <span>{{ totalUnreadNotification }} unread notifications</span>
        </v-tooltip>
      </div>
    </v-toolbar>
    <notification :drawer="rightDrawer" @close="rightDrawer=false" />
  </div>
</template>

<script>
import notification from './notification';
import { logOutUser } from '@/utils/auth';
import { mapGetters } from 'vuex';

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
    }
  },
  data: function() {
    return {
      search: '',
      searching: false,
      rightDrawer: false
    };
  },
  created() {},
  methods: {
    onBlur() {
      this.searching = false;
      this.search = '';
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

<style scoped lang="stylus">
@import '../../../node_modules/vuetify/src/stylus/settings/_variables.styl';

.searching {
  overflow: hidden;
  width: 208px;
  padding-left: 8px;
  transition: $primary-transition;
}

.searching--closed {
  padding-left: 0;
  width: 0;
}

.searching > * {
  right: 8px;
}

.searching--closed > * {
  display: none;
}

.hidden-searching {
  @media $display-breakpoints.sm-and-down {
    display: none !important;
  }
}
</style>
