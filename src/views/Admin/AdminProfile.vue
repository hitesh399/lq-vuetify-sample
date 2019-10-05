<template>
  <v-container>
    <v-card>
      <div class="grid-list-md text-xs-center">
        <v-layout row fill-height profile-section>
          <v-flex xs12 sm9 md10>
              <v-container>
              <div class="px-4">              
                <v-card-actions class="pa-0">
                  <h3 class="title mb-2 text-sm-left text-capitalize">{{ $helper.getProp(authProfile, 'name') }} </h3>
                </v-card-actions>              
                  <!-- <v-card-title class="pa-0 text-light ml-2">{{ $helper.getProp(authProfile, 'date_of_birth') }}</v-card-title> -->
                
                <v-card-actions class="pa-0 mb-2">
                  <i aria-hidden="true" class="v-icon material-icons theme--light small-icon">mail_outline</i>
                  <v-card-title class="pa-0 text-light ml-2">{{ $helper.getProp(authProfile, 'email') }}</v-card-title>
                </v-card-actions>
                
                <v-card-actions class="pa-0 mb-2">
                  <i aria-hidden="true" class="v-icon material-icons theme--light small-icon">phone_android</i>
                  <v-card-title class="pa-0 text-light ml-2">{{ $helper.getProp(authProfile, 'contact_number') }}</v-card-title>
                </v-card-actions>
                
                <v-card-actions class="pa-0 my-2">
                  <v-card-title class="pa-0 text-light">{{ $helper.getProp(authProfile, 'address') }} </v-card-title>
                </v-card-actions>
                
                <div class="mt-3">
                  <v-card-title class="text-xs-left pa-0 text-light word-break">{{ $helper.getProp(authProfile, 'about_me') }}</v-card-title>
                </div>
              </div>
              </v-container>
          </v-flex>
        </v-layout>
      </div>
    </v-card>
  </v-container>
</template>
<script>
  import { mapGetters } from "vuex";
  export default {
  computed: {
    ...mapGetters(['authProfile'])
  },
}

</script>