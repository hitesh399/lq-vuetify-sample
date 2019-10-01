<template>
  <v-btn 
    class="mx-2" 
    :disabled="deleting"
    fab dark small color="red" @click.prevent="deleteItem">
    <v-icon dark>{{icon}}</v-icon>
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
    confirmMsg: String,
    item: {
      type: Object,
      required: true,
    },
    icon: {
      type: String,
      default: () => 'delete'
    }
  },
  inject: ['lqForm', 'lqVDataTable'],
  data () {
    return {
      deleting: false
    }
  },
  methods: {
    deleteItem() {
      this.deleting = true
      this.confirmAndAction(
        this.url + '/' + this.item[this.lqVDataTable.itemKey], 
        {
          confirmMsg: this.confirmMsg
        }
      ).then(() => { 
        this.deleting = false; 
        this.$lqForm.removeElement(this.lqForm.name, 'selected')
        this.$lqTable.refresh(this.lqForm.name);
      })
      .catch(() => this.deleting = false)
    }
  }
}
</script>