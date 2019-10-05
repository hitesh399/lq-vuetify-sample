<template>
    <div>    
      <title-layout />
      <v-container fluid grid-list-md >
        <lq-v-form 
            name="role_form" 
            action="/role" 
            @submited-success="onSuccess" 
            request-method="POST">
          <v-card :style="{'margin-bottom': '10px'}" >
              <v-container fluid grid-list-md>              
                  <RoleForm  />                  
              </v-container>
          </v-card>
          <v-flex md12 sm12 xs12>
              <lq-v-submit-btn class="red-btn ml-0"  label="Create"/>
          </v-flex>
        </lq-v-form>        
      </v-container>
    </div>
</template>
<script>
import RoleForm from './Form';
export default {
    name: 'role.create.page',
    components: {
        RoleForm,
    },
    methods: {
        onSuccess (response) {
            this.$root.$dialogLoader.showSnackbar(
                response.message,
                { color: 'success' }
            );
            this.$router.push({name: 'role.list'})
        }
    }
}
</script>