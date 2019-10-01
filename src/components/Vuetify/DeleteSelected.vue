<template>
  <v-btn :disabled="deleteingSelected" 
    v-if="lqForm.formValues.selected && $helper.isArray(lqForm.formValues.selected) && lqForm.formValues.selected.length"
    color="red" 
    dark 
    @click.prevent="deleteSelected()">
    {{text}} ({{lqForm.formValues.selected.length}}) 
    <v-icon>{{icon}}</v-icon> 
  </v-btn>
</template>
<script>
export default {
  name: 'delete.selected',
  props: {
    url: {
      type: String,
      required: true,
    },
    confirmMsg: {
      type: String,
      required: true,
    },
    keyName: {
      type: String,
      default: () => 'ids'
    },
    icon: {
      type: String,
      default: () => 'delete'
    },
    text: {
      type: String,
      default: () => 'Delete'
    }
  },
  inject: ['lqForm'],
  data () {
    return {
      deleteingSelected: false
    }
  },
  methods: {
    deleteSelected() {
      this.deleteingSelected = true
      this.confirmAndAction(
        this.url, 
        {
          data: { [this.keyName] : this.lqForm.formValues.selected },
          confirmMsg: this.confirmMsg
        }
      ).then(() => { 
        this.deleteingSelected = false; 
        this.$lqForm.removeElement(this.lqForm.name, 'selected')
        this.$lqTable.refresh(this.lqForm.name);
      })
      .catch(() => this.deleteingSelected = false)
    }
  }
}
</script>