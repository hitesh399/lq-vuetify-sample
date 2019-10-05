<template>
    <div>
        <title-layout />
        <v-container fluid grid-list-md >
            <ApplicationMenuItemForm 
                :action="`application-menu-item/${$route.params.id}`" 
                request-method="PUT"
                use-to="update"
                :redirect-to="{name: 'application_menu_item.list'}" 
            />
        </v-container>
    </div>
</template>
<script>
import ApplicationMenuItemForm from './Form';

export default {
    name: 'application_menu_item.edit.page',
    components: { ApplicationMenuItemForm },
    created () {
        this.$axios('application-menu-item/' + this.$route.params.id)
            .then((response) => {
                this.$lqForm.initializeValues('application_menu_item', response.data.application_menu_item);
            })
    }
}
</script>