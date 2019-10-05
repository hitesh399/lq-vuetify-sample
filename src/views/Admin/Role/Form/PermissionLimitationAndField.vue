<template>
<v-dialog
  v-model="dialog"
  width="500">
  <v-card>
    <v-card-title
      class="headline grey lighten-2"
      primary-title
    >
    Permission Field and Limitations
    </v-card-title>
    <v-card-text>
      <v-layout row wrap>
        <v-flex md12>
          <v-select 
            v-model="role_permission_limitation.tag" 
            label="Security Tag"
            clearable
            placeholder="Security Tag"
            :items="tagItems"
          />
        </v-flex>
        <v-flex md12>
          <v-select 
            v-model="role_permission_limitation.field_selection" 
            label="Field Selection"
            placeholder="Field Selection"
            clearable
            :items="['only', 'except']"
          />
        </v-flex>
        <v-flex md12>
          <v-data-table
            :headers="fieldheaders"
            :items="fields"
            class="elevation-1"
            hide-actions
            
          >
          
          <template v-slot:items="{item, index}">
            <tr>
                <td>
                  <v-checkbox
                    v-model="role_permission_fields[index].selected"
                    value="yes"
                  ></v-checkbox>              
                </td>
                <td>{{item.title}}</td>
                <td>
                  <v-radio-group
                    v-model="role_permission_fields[index].authority"
                    row
                  >
                    <v-radio label="Read" value="read"></v-radio>
                    <v-radio label="Write" value="write" 
                      :disabled="role_permission_limitation.field_selection === 'except'"
                    />
                    <v-radio 
                      label="Hide" 
                      value="hide"
                      :disabled="role_permission_limitation.field_selection !== 'except'"
                    />
                  </v-radio-group>
                </td>
            </tr>
          </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="done">Done</v-btn>
      <v-btn @click="dialog = false">Cancel</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
</template>
<script>
import cloneDeep from 'lodash/cloneDeep'

export default {
  name: 'permission-limitation-and-fields',
  props: ['rolePermissions', 'roleFields'],
  data () {
    return {
      permission: null,
      role_permission_limitation : {
        tag: null,
        field_selection: null,
      },
      dialog: false,
      role_permission_fields: {},
      fieldheaders: [
        { text: 'Select', value: 'select', sortable: false },
        { text: 'Field Name', value: 'title', sortable: false },
        { text: 'Authority', value: 'authority', sortable: false },
      ]
    }
  },
  created () {
    this.$root.$on('show-limitation', (permission, role_permission) =>  {
      this.role_permission_fields = permission.permission_fields.map((pf) => {
          let val = {...pf}
          const selectedpf = this.rolePermissionfieldsObject[`_${pf.id}`];
          if( selectedpf !== undefined) {
            val.selected = 'yes'
            val.authority = selectedpf
          }
          return val;
      });
      const selectedRolePermission = this.rolePermissionObject[`_${permission.id}`]
      // console.log('this.rolePermissionObject', this.rolePermissionObject)
      if (selectedRolePermission !== undefined) {
        // console.log('role_permission_limitation', selectedRolePermission)
        this.role_permission_limitation = selectedRolePermission
      }
      this.permission = permission
      this.dialog = true
    })
  },
  computed: {
    tagItems() {
      return this.$helper.getProp(this.permission, 'limitations.tags', []);
    },
    fields() {
      return this.$helper.getProp(this.permission, 'permission_fields', []);
    },
    rolePermissionfieldsObject() {
      let fields = {};
      this.roleFields.forEach((f) => {
        fields[`_` + f.id] = f.authority;
      })
      return fields;
    },
    rolePermissionObject() {
      let permissions = {};
      this.rolePermissions.forEach((p) => {
        permissions[`_${p.id}`] = { tag: p.tag, field_selection: p.field_selection}
      })
      return permissions;
    }
  },
  methods: {
    done () {
      let fields = this.role_permission_fields.filter(r => r.selected === 'yes')
      this.$emit('limitation-changed', {
        fields: cloneDeep(fields),
        limitations: { ...this.role_permission_limitation},
        permission_id: this.permission.id
      });
      this.dialog = false
    }
  },
  beforeDestroy () {
    this.$root.$off('show-limitation');
  }
}
</script>