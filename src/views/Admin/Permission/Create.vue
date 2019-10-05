<template>
    <div>    
      <title-layout />
      <v-container fluid grid-list-md >
        <lq-v-form @submited-success="onSuccess" name="permission_form" action="permission" request-method="POST">
          <template v-slot:default="props">
            <v-card :style="{'margin-bottom': '10px'}" >
                <v-container fluid grid-list-md>              
                    <PermissionForm :props="props"  />                  
                </v-container>
            </v-card>
            <v-flex md12 sm12 xs12>
                <lq-v-submit-btn class="red-btn ml-0" label="Create"/>
            </v-flex>
          </template>
        </lq-v-form>        
      </v-container>
    </div>
</template>
<script>
import PermissionForm from './Form';

export default {
  name: 'permission.edit.page',
  components: {
    PermissionForm,
  },
  methods: {
    onSuccess () {
      this.$router.push({name: 'permission.list'})
    }
  }
}
</script>