<template>
    <v-container pb-1>
        <div class="title text-xs-center py-4">Logging Out...</div>
    </v-container>
</template>
<script>
import { logOutUser } from '@/utils/auth';

export default {
    created: function() {
        logOutUser(this);
    }
};
</script>