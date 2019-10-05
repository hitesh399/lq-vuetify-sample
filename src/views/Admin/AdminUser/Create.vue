<template>
    <div>
        <title-layout>
            <go-back :to="{name: 'admin.list'}" />
        </title-layout>
        <v-container fluid grid-list-md>
            <AdminForm request-method="POST" request-action="admin" />
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
            adminconsultant: {}
        };
    }
};
</script>