<template>
  <v-layout justify-center>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">      
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Log Request/Response</v-toolbar-title>
          <div class="flex-grow-1"></div>
        </v-toolbar>
        <v-list >
          <v-list-tile >
            <v-list-tile-title>{{ log.request_method }} -> {{ log.url }}</v-list-tile-title>
            <!-- <v-list-tile-sub-title></v-list-tile-sub-title> -->
          </v-list-tile>
        </v-list>
        <div :style="{padding: '20px'}">
          <v-tabs v-model="active">
            <v-tab ripple key="rqh">
              Request Header
            </v-tab>
            <v-tab ripple key="rsh">
              Response Header
            </v-tab>
            <v-tab ripple key="rqd">
              Request Data
            </v-tab>
            <v-tab ripple key="rsd">
              Response Data
            </v-tab>
            <v-tab-item key="rqh">
              <vue-json-pretty :data="log.request_headers" />
            </v-tab-item>
            <v-tab-item key="rsh">
              <vue-json-pretty :data="log.response_headers" />
            </v-tab-item>
            <v-tab-item key="rqd">
              <vue-json-pretty :data="log.request" />
            </v-tab-item>
            <v-tab-item key="rsd">
              <vue-json-pretty :data="log.response" />
            </v-tab-item>
          </v-tabs>
        </div>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import VueJsonPretty from 'vue-json-pretty'

export default {
  name: 'request-log-popup',
  components: { VueJsonPretty },
  data () {
    return {
      dialog: false,
      log: {},
      active: true
    }
  },
  created () {
    this.$root.$on('show-request-log', (log) => {
      this.log = log
      this.dialog = true
    })
  },
  beforeDestroy () {
    this.$root.$off('show-request-log');
  }
}
</script>
