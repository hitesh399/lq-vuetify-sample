<template>
    <div>
        <title-layout>
            <go-back :to="{name: 'admin.list'}" />
        </title-layout>
        <v-container fluid grid-list-md>
            <AdminForm request-method="PUT" :request-action="`admin/${this.$route.params.id}`" />
        </v-container>
    </div>
</template>


<script>
import AdminForm from './Form';
export default {
    components: {
        AdminForm
    },
    data() {
        return {
            admin: {}
        };
    },
    created() {
        this.axios('admin/' + this.$route.params.id).then(response => {
            this.admin = this.$helper.getProp(response, 'data', {});
            this.$lqForm.initializeValues('admin_form', this.admin.data);
        });
    }
};
</script>