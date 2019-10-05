<template>
    <div>
        <title-layout />
        <v-container fluid grid-list-md >
            <ApplicationMenuItemForm 
                action="application-menu-item" 
                :redirect-to="{name: 'application_menu_item.list'}" 
            />
        </v-container>
    </div>
</template>
<script>
import ApplicationMenuItemForm from './Form';

export default {
    name: 'application_menu_item.create.page',
    components: { ApplicationMenuItemForm }
}
</script>