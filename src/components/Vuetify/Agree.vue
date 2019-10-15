<template>
    <v-checkbox v-model="agree" :error-messages="error" :error="!!error.length">
        <template v-slot:label>
            <div>
                I agree that
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <a target="_blank" href="http://vuetifyjs.com" @click.stop v-on="on">Vuetify</a>
                    </template>
                    Opens in new window
                </v-tooltip>is awesome
            </div>
        </template>
    </v-checkbox>
</template>
<script>
export default {
    name: 'agree',
    data() {
        return {
            agree: false,
            error: []
        };
    },
    methods: {
        setError(error) {
            this.error = [error];
        },
        clearError() {
            this.error = [];
        }
    }
};
</script>