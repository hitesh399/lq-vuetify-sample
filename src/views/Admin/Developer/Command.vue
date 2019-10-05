<template>
  <div>
    <title-layout />
    <v-container fluid grid-list-md>
      <v-layout row fill-height>
        <v-flex md3>
          <div   class="scroller-wrapper">
            <v-list >
              <v-list-tile v-for="(phpCommand) in phpCommands" :key="`php_command${phpCommand}`" >
                <v-btn color="primary" @click="executeLaravelCommand(phpCommand)">{{phpCommand}}</v-btn>
              </v-list-tile>
            </v-list>
          </div>
        </v-flex>
        <v-flex md9>
          <div  class="scroller-wrapper">
              <v-subheader>Output: </v-subheader>
               <v-progress-linear
                :active="requesting"
                indeterminate
                :query="true"
              ></v-progress-linear>
              <div style="padding: 20px">
                <v-list>
                  <v-list-tile v-for="line in output" :key="`output${line}`" v-html="line" />
                </v-list>
              </div>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
export default {
  name: 'server-command.page',
  data: function () {
    return {
        phpCommands: [
            'migrate',
            'migrate:rollback',
            'migrate:status',
            'lq:client',
            'dump-autoload',
            'site_config:cache',
            'cache:clear',
            'register:route-name',
            'lq:delete-request-log',
            'appointment:reject',
            'consultant:payout',
        ],
        output: [],
        requesting: false
    }
  },
  methods: {
    executeLaravelCommand: function (command) {
      this.requesting = true;
      this.output = [];
      this.$axios.post('developer/execute-laravel-command', {command})
        .then((response) => {
          this.requesting = false
          this.output =  response.data.output.replace(/\n/g, '#######').split('#######');
        }).catch(() => this.requesting = false)
    }
  }
}
</script>