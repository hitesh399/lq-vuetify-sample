<template>
    <div>
        <title-layout>
            <go-back :to="{name: 'admin.list'}" />
        </title-layout>
        <v-container fluid grid-list-md>
            <AdminForm
                :disabled="disabled"
                request-method="PUT"
                :request-action="`admin/${this.$route.params.id}`"
            />
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
            disabled: false
        };
    },
    created() {
        this.disabled = true;
        this.axios('admin/' + this.$route.params.id)
            .then(response => {
                this.disabled = false;
                const admin = this.$helper.getProp(response, 'data', {});
                this.$lqForm.initializeValues(
                    'admin_form',
                    admin.data,
                    response.current_permission
                );
            })
            .catch(() => {
                this.disabled = false;
            });
    }
};
</script>