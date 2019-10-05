<template>  
    <v-layout row wrap>
      <v-flex md4>
        <lq-v-text-field id="name" placeholder="Name" label="Name" />
      </v-flex>
      <v-flex md4>
        <lq-v-text-field id="title" placeholder="Role Title" label="Role Title" />
      </v-flex>
      <v-flex md4 sm12>
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
      <v-flex md12>
        <lq-v-textarea id="description" placeholder="Description" label="Description" auto-grow />
      </v-flex>
    </v-layout>
</template>
<script>
export default {
  name: 'role.form',
}
</script>