<template>
    <lq-v-form 
        name="application_menu" 
        :action="action"
        @submited-success="getSuccess"
        @submited-error="getError"
        :request-method="requestMethod">
        <v-card :style="{'margin-bottom': '10px'}" >
            <v-container fluid grid-list-md>   
                <v-layout row wrap>
                    <v-flex md4 sm12 xs12>
                        <lq-v-text-field id="name" placeholder="Application Menu Name" label="Application Menu Name" />
                    </v-flex>
                    <v-flex md4 sm12 xs12>
                        <lq-v-select
                            action="oauth-client" 
                            item-text="name" 
                            item-value="id" 
                            multiple
                            clearable
                            id="clients" 
                            placeholder="For Application" 
                            label="For Application" 
                        />
                    </v-flex>
                    <v-flex md4 sm12 xs12>
                        <lq-v-select
                            action="role" 
                            item-text="name" 
                            item-value="id" 
                            multiple
                            clearable
                            id="roles" 
                            placeholder="Specific Roles" 
                            label="Specific Roles" 
                        />
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
        <v-flex md12 sm12 xs12>
            <lq-v-submit-btn class="red-btn ml-0" :label="useTo === 'create' ? 'Create': 'Update'" />
        </v-flex>
    </lq-v-form>
</template>
<script>
export default {
    name: 'application_menu.form',
    props: {
        action: String,
        requestMethod: {
            type: String,
            default: () => 'POST'
        },
        useTo: {
            type: String,
            default: () => 'create'
        },
        redirectTo: Object,
    },
    methods: {
        getSuccess() {
            this.$router.push(this.redirectTo)
        },
        getError () {
            //
        }
    }
}
</script>