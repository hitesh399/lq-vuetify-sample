<template>
    <lq-v-form 
        name="application_menu_item" 
        :action="action"
        @submited-success="getSuccess"
        @submited-error="getError"
        :request-method="requestMethod">
        <v-card :style="{'margin-bottom': '10px'}" >
            <v-container fluid grid-list-md>   
                <v-layout row wrap>
                    <v-flex md4 sm12 xs12>
                        <lq-v-text-field 
                            id="name" 
                            placeholder="Name" 
                            label="Name" 
                        />
                    </v-flex>
                    <v-flex md4 sm12 xs12>
                        <lq-v-text-field 
                            id="title" 
                            placeholder="Title" 
                            label="Title" 
                        />
                    </v-flex>
                    <v-flex md4 sm12 xs12>
                        <lq-v-radio-group row id="show_in_menu" label="Show in Menu">
                            <v-radio value="Yes" label="Yes" />
                            <v-radio value="No" label="No" />
                        </lq-v-radio-group>
                    </v-flex>
                    <v-flex md4 sm12 xs12>
                        <lq-v-select
                            action="application-menu" 
                            item-text="name" 
                            item-value="id"
                            clearable
                            id="application_menu" 
                            placeholder="Application Menu" 
                            label="Application Menu"
                            :master-of="['parent']"
                        />
                    </v-flex>
                    <v-flex md4 sm12 xs12>
                        <lq-v-autocomplete
                            action="application-menu-item" 
                            item-text="name" 
                            item-value="id"
                            clearable
                            id="parent" 
                            placeholder="Parent Menu" 
                            label="Parent Menu" 
                        />
                    </v-flex>
                    <v-flex md4 sm12 xs12>
                        <lq-v-autocomplete
                            action="permission" 
                            fetch-on-search
                            item-text="name" 
                            item-value="id"
                            multiple
                            clearable
                            id="permissions" 
                            placeholder="Permissions" 
                            label="Permissions" 
                        />
                    </v-flex>
                    <v-flex md12 sm12 xs12>
                        <lq-v-textarea id="description" label="Description" auto-grow />
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
    name: 'application_menu_item.form',
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