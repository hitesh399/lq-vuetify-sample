<template>
    <div>
        <title-layout />
        <v-container fluid>
            <v-card>
                <v-container pb-1>
                    <ResetPassword @submited-success="done"/>
                </v-container>
            </v-card>
        </v-container>
    </div>
</template>
<script>

import ResetPassword from '../../ResetPassword';

export default {
    name: 'reset.password',
    components: { ResetPassword },
    methods: {
        done () {
            this.$root.$dialogLoader.showSnackbar(
                'Password has been changed.', 
                { color: 'success' } 
            );
            this.$router.push({name: 'dashboard'});
        }
    }
}
</script>