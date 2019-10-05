<template>
    <lq-v-form
        name="admin_form"
        :action="requestAction"
        ref="form"
        :request-method="requestMethod"
        @submited-success="onSuccess"
        @submited-error="onError"
        autocomplete="off"
        :rules="rules"
    >
        <v-card>
            <v-container pb-4 grid-list-xl>
                <v-layout row wrap>
                    <v-flex xs12 sm6>
                        <lq-v-text-field label="Name" placeholder="Name" id="name" />
                    </v-flex>
                    <v-flex xs12 sm6>
                        <lq-v-text-field label="Email" placeholder="Email" id="email" />
                    </v-flex>
                    <v-flex xs12 sm6>
                        <lq-v-mobile-number placeholder="8478782028" label="MOBILE" id="mobile_no" />
                    </v-flex>
                    <v-flex xs12 sm6>
                        <lq-v-select
                            placeholder="Role"
                            :static-data="{my_app_role: 'yes'}"
                            label="Role"
                            id="role"
                            action="/role"
                        />
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
        <v-card-actions class="pl-0">
            <v-layout row wrap>
                <v-flex md12 sm12 xs12>
                    <lq-v-submit-btn class="red-btn ml-0" label="SAVE" />
                </v-flex>
            </v-layout>
        </v-card-actions>
    </lq-v-form>
</template>

<script>
export default {
    name: 'admin-form',
    data() {
        return {
            rules: {
                name: { presence: { message: "^Name can't be blank" } },
                email: { presence: true, email: true },
                contact_number: {
                    presence: { message: "^Mobile can't be blank" }
                }
            }
        };
    },
    props: {
        requestMethod: {
            type: String,
            default: () => 'POST'
        },
        requestAction: {
            type: String,
            default: () => 'customer'
        }
    },
    methods: {
        onSuccess: function(response) {
            this.$message.success(response.message);
            return this.$router.push({ name: 'admin.list' });
        },
        onError: function(reponse) {
            this.$message.error(
                'Your input is not valid. Please check the form.'
            );
        }
    }
};
</script>