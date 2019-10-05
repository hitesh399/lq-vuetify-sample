<template>
    <div>    
      <title-layout>
        <v-layout row wrap>
            <v-flex md12>
                <go-back :to="{name: 'role.list'}" />
            </v-flex>
        </v-layout>
      </title-layout>
      <v-container fluid grid-list-md >
        <lq-v-form  @submited-success="onSuccess"  name="role_form" :action="`/role/${$route.params.id}`" request-method="PUT">
          <v-card :style="{'margin-bottom': '10px'}" >
              <v-container fluid grid-list-md>              
                  <RoleForm  />                  
              </v-container>
          </v-card>
          <Permission 
              :role-permissions="rolePermissions" 
              :fields="fields"
              @update-limitation="updateLimitationAndField" 
          /> 
          <v-flex md12 sm12 xs12>
              <lq-v-submit-btn class="red-btn ml-0" :data="extraData" label="SAVE"/>
          </v-flex>
        </lq-v-form>        
      </v-container>
      <Limitation 
        :role-permissions="rolePermissions" 
        :role-fields="fields" 
        @limitation-changed="updateLimitationAndField" 
      />
    </div>
</template>
<script>
import RoleForm from './Form';
import Permission from './Form/Permission';
import Limitation from './Form/PermissionLimitationAndField';

export default {
  name: 'role.edit.page',
  components: {
    RoleForm,
    Permission,
    Limitation
  },
  data() {
    return {
      role: {},
      rolePermissions: [],
      fields: [],
      requesting: false
    }
  },
  computed: {
    extraData() {
      return {
        rolePermissions: this.rolePermissions.map(function (rp) {
          if (!rp.tag && rp.field_selection) {
            return
          }
          return { 
            permission_id: rp.id, 
            limitations: {
              tag: rp.tag, 
              field_selection: rp.field_selection
            } 
          }
        }),
        fields: this.fields.map(function(f) {
          return {
            permission_id: f.permission_id, 
            authority: f.authority, 
            permission_field_id: f.id 
          }
        })
      }
    }
  },
  created() {
    this.requesting = true;
    this.$axios('role/' + this.$route.params.id)
      .then((response) => {
        // console.log('Response', response)
        const permissions = response.data.role.permissions
        const menu_items = response.data.role.menu_items
        const permission_fields = response.data.role.permission_fields
        delete response.data.role.permissions;
        delete response.data.role.menu_items;
        delete response.data.role.permission_fields;

        this.role = response.data.role;
        
        this.rolePermissions = permissions.map( function (p) {
          return {
            id : p.id,
            tag: p.pivot.limitations && p.pivot.limitations ? p.pivot.limitations.tag : null,
            field_selection: p.pivot.limitations && p.pivot.limitations ? p.pivot.limitations.field_selection : null,
          }
        })
        this.fields = permission_fields.map(function (f) {
            return {
              permission_id: f.pivot.permission_id,
              authority: f.pivot.authority,
              id: f.pivot.permission_field_id,
              selected: 'yes'
            }
        })

        this.role.menu_items = menu_items ? menu_items.map(p => p.id) : null;
        this.$lqForm.initializeValues('role_form', this.role);
        this.requesting = false;
      })
  },
  methods: {
    updateLimitationAndField ({permission_id, fields, limitations}) {
      const except_fields = this.fields.filter(r => r.permission_id !== permission_id)
      this.fields = except_fields.concat(fields);

      let except_limitation = this.rolePermissions.filter(r => r.id !== permission_id)
      limitations.id = permission_id;
      except_limitation.push(limitations);
      this.rolePermissions = except_limitation
    },
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