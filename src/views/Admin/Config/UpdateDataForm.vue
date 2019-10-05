<template>
     <v-card>
        <lq-v-form 
            name="editconfig" 
            :action="action" 
            :rules="rules"
            request-method="PUT"
            ref="eform"
            @submited-success="saved"
        >
            <v-card-title>
            <span class="headline">Update Configuration</span>
            </v-card-title>

            <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <config-field 
                            :type="type" 
                        />
                    </v-layout>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <lq-v-submit-btn label="Save" />
                <v-btn color="darken-1" text @click="$emit('cancel')">Cancel</v-btn>
            </v-card-actions>
        </lq-v-form>
    </v-card>
</template>
<script>
import ConfigField from './Field';
export default {
    name: 'update-data-value-form',
    components: { ConfigField },
    computed: {
        rules() {   
            const rules = this.$helper.getProp(this.$store.state, 'form.editconfig.values.options.rules', null);
            return rules ? {data: rules} : null;
        },
        type() {   
            return this.$helper.getProp(this.$store.state, 'form.editconfig.values.options.type', 'text');
        },
        action () {
            const id = this.$helper.getProp(this.$store.state, 'form.editconfig.values.id', null);
            return '/config/' + id;
        }
    },
    methods: {
        saved (response) {
            this.$lqTable.updateRow('config_list', response.data.config, 'id')
            this.$emit('saved');
        }
    }
}
</script>
