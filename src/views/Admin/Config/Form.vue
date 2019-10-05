<template>
    <v-card>
        <lq-v-form name="config" 
            :action="action" 
            ref="cForm" 
            @submited-success="(response) => $emit('submited-success', response)"
            :request-method="method">
            <v-card-title>
                <span class="headline">Create/Edit Configuration</span>
            </v-card-title>
            <v-card-text>
                <v-container grid-list-md text-center>
                    <v-layout fill-height wrap>
                        <v-flex md6>
                            <lq-v-text-field id="name" label="Name" />
                        </v-flex>
                        <v-flex md6>
                            <lq-v-text-field id="config_group" label="Config Name" />
                        </v-flex>
                        <v-flex xs12>
                            <lq-v-select 
                                id="options.type" 
                                :options="['text', 'textarea', 'dropdown', 'file', 'date', 'dateTime']" 
                                label="Type" 
                            />
                        </v-flex>
                        <v-flex xs12>
                        <lq-v-combobox 
                            v-if="type === 'dropdown'"
                            :is-output-object="false" 
                            id="options.values" 
                            label="Choose Select Options" 
                            chips multiple 
                        />
                        </v-flex>
                        <v-flex md12 xs12>
                            <div class="title">Config Validation Rule</div>
                        </v-flex>
                        <v-flex md4>
                            <lq-v-checkbox 
                                id="options.rules.presence"
                                label="Required?"
                                :value="true" 
                            />
                        </v-flex>
                        <v-flex md4 xs12>
                            <lq-v-checkbox 
                                id="options.rules.url"
                                label="url?"
                                :value="true" 
                            />
                        </v-flex>
                        <v-flex md4 xs12>
                            <lq-v-checkbox 
                                id="options.rules.email"
                                label="email?"
                                :value="true" 
                            />
                        </v-flex>
                        <v-flex md12 xs12>
                            <lq-v-select 
                                id="options.rules.type" 
                                :options="['array', 'integer', 'number', 'string', 'date']" 
                                label="Value Type" 
                            />
                        </v-flex>
                        <v-flex md6>
                            <lq-v-text-field id="options.rules.length.minimum" label="Minimum" />
                        </v-flex>
                         <v-flex md6>
                            <lq-v-text-field id="options.rules.length.maximum" label="Maximum" />
                         </v-flex>
                    </v-layout>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <lq-v-submit-btn label="Save" :data="{update_config_field: true}" />
                <v-btn color="darken-1" text @click="$emit('cancel')">Cancel</v-btn>
            </v-card-actions>
        </lq-v-form>
    </v-card>
</template>
<script>
export default {
    name: 'config-form',
    props: {
        method: {
            type: String,
            default: () => 'POST'
        },
        action: {
            type: String,
            default: () => 'config'
        }
    },
    computed: {
        type () {
            return this.$helper.getProp(this.$store.state, 'form.config.values.options.type')
        }
    }
}
</script>

