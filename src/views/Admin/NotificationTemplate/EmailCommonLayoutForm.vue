<template>
  <v-container fluid grid-list-md style="padding-bottom: 0">
    <lq-v-form :name="name" 
        @submited-success="onSuccess" 
        :action="`/config/${id}`"
        request-method="PUT">
        <v-layout wrap>
            <v-flex md12 >
                <lq-v-text-editor id="data" label="Body" />
            </v-flex>
        </v-layout>
        <v-flex md12 >
            <lq-v-submit-btn class="red-btn ml-0" label="Update"/>
        </v-flex>
        
    </lq-v-form>
  </v-container>
</template>
<script>
export default {
    name: 'email.template.common.form',
    props: {
      name: String,
      dataKey: String
    },
    data () {
        return {
            id: -1,
        }
    },
    created () {
        this.$axios('notification-template/email/header-footer')
            .then((response) => {
                this.id = this.$helper.getProp(response, `data.${this.dataKey}.id`)
                const data = this.$helper.getProp(response, `data.${this.dataKey}.data`)
                this.$lqForm.initializeValues(this.name, {data: data})
            })
    },
    methods: {
        onSuccess (response) {
            this.$root.$dialogLoader.showSnackbar(
                response.message,
                { color: 'success' }
            );
        }
    }
}
</script>