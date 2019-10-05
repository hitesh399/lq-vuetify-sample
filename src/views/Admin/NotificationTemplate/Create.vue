<template>
    <div>    
      <title-layout :left-col="{md6: true, sm12: true, xs12: true}">
        <v-layout row wrap>
            <v-flex md12>
                <go-back :to="{name: 'notification.template.list'}" />
            </v-flex>
        </v-layout>
      </title-layout>
      <v-container fluid grid-list-md >
        <lq-v-form @submited-success="onSuccess" name="notification_template_form" action="/notification-template" request-method="POST">
          <template v-slot:default="{ model }">
            <v-card :style="{'margin-bottom': '10px'}" >
                <v-container fluid grid-list-md>              
                    <NotificationForm :model="model"  />                  
                </v-container>
            </v-card>
            <v-flex md12 sm12 xs12>
                <lq-v-submit-btn class="red-btn ml-0" label="SAVE"/>
            </v-flex>
          </template>
        </lq-v-form>        
      </v-container>
    </div>
</template>
<script>
import NotificationForm from './Form';

export default {
  name: 'notification.template.create.page',
  components: {
    NotificationForm,
  },
  methods: {
    onSuccess (response) {
      this.$root.$dialogLoader.showSnackbar(
        response.message,
        { color: 'success' }
      );
      this.$router.push({name: 'notification.template.list'})
    }
  }
}
</script>