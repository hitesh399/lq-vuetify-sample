<template>
    <div>
        <title-layout />
        <v-container fluid grid-list-md >
            <ApplicationMenuForm 
                :action="`application-menu/${$route.params.id}`" 
                request-method="PUT" 
                :redirect-to="{name: 'application_menu.list'}" 
            />
        </v-container>
    </div>
</template>
<script>
import ApplicationMenuForm from './Form';

export default {
    name: 'application_menu.edit.page',
    components: { ApplicationMenuForm },
    created () {
        this.$axios('application-menu/' + this.$route.params.id)
            .then((response) => {
                this.$lqForm.initializeValues('application_menu', response.data.application_menu);
            })
    }
}
</script>