<template>
  <v-layout row wrap>
    <v-flex md6 >
      <lq-v-text-field id="name" name="name" label="Name" />
    </v-flex>
    <v-flex md6 >
      <lq-v-text-field id="title" name="title" label="Title" />
    </v-flex>
    <v-flex md6 sm12>
        <lq-v-autocomplete
          action="oauth-client" 
          item-text="name" 
          item-value="id" 
          multiple
          clearable
          id="clients" 
          placeholder="For Application" 
          label="For Application" 
        />
    </v-flex>
    <v-flex md6 sm12>
        <lq-v-autocomplete
          action="role" 
          item-text="name" 
          item-value="id" 
          multiple
          clearable
          id="specific_roles" 
          placeholder="Specific Roles" 
          label="Specific Roles" 
        />
    </v-flex>
    <v-flex md6 sm12>
        <lq-v-combobox
          action="permission-group" 
          item-text="name"
          fetch-on-search
          item-value="id" 
          clearable
          is-output-object
          id="permission_group" 
          placeholder="Permission Group" 
          label="Permission Group" >
          <template v-slot:no-data>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>
                    No results matching. Press <kbd>enter</kbd> to create a new one
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
        </lq-v-combobox>
    </v-flex>
    <v-flex md6 sm12>
        <lq-v-combobox 
          multiple
          small-chips
          clearable
          id="limitations.tags" 
          placeholder="Security Tag" 
          label="Security Tag" 
        >
            <template v-slot:no-data>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>
                    No results matching. Press <kbd>enter</kbd> to create a new one
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
        </lq-v-combobox>
    </v-flex>
    <v-flex md12>
        <lq-v-textarea id="description" placeholder="Description" label="Description" auto-grow />
    </v-flex>
    <v-flex xs12 sm12 md12>
      <lq-v-switch id="is_public"  true-value="Y" false-value="N" label="Is Public?"/>
    </v-flex>
    <v-flex xs12 sm12 md6>
      <lq-v-switch id="encrypted.response"  true-value="Y" false-value="N" label="Response Encrypted?"/>
    </v-flex>
    <v-flex xs12 sm12 md6>
      <lq-v-switch id="encrypted.request"  true-value="Y" false-value="N" label="Request Encrypted?"/>
    </v-flex>
    <v-flex md12>
      <v-btn class="ma-2" color="primary" dark @click.prevent="props.push('permission_fields', {})" >
        Add Form Fields <v-icon dark right>add</v-icon>
      </v-btn>
    </v-flex>
    <v-flex md12> 
      <v-layout v-for="(field, index) in $helper.getProp(props.model, 'permission_fields', [])" 
        :key="`_${index}`" 
        row 
        align-center 
        justify-center >
        <v-flex md3>
          <lq-v-text-field :id="`permission_fields.${index}.title`" label="Title" />
        </v-flex>
        <v-flex md4>
          <lq-v-text-field :id="`permission_fields.${index}.client_field`" label="Form Field Id" />
        </v-flex>
        <v-flex md4>
          <lq-v-combobox multiple :id="`permission_fields.${index}.table_columns`" label="Table Columns" >
            <template v-slot:selection="data">
              <v-chip>
                {{ data.item }}
              </v-chip>
            </template>
          </lq-v-combobox>
        </v-flex>
        <v-flex md1>
          <v-icon  @click.prevent="props.remove(`permission_fields.${index}`)">delete</v-icon>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  name: 'pemission.form.element',
  props: {
    props: Object
  }
}
</script>