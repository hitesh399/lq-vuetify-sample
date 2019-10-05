<template>
    <div>
        <title-layout />
        <v-container fluid grid-list-md >
            <ApplicationMenuForm action="application-menu" :redirect-to="{name: 'application_menu.list'}" />
        </v-container>
    </div>
</template>
<script>
import ApplicationMenuForm from './Form';

export default {
    name: 'application_menu.create.page',
    components: { ApplicationMenuForm }
}
</script>