<template>
    <auth-layout>
        <template v-slot:title>Reset Password</template>
        <template v-slot:default>
            <lq-v-form
                name="resetpassword"
                action="forget-password/reset"
                :rules="rules"
                ref="form"
                @submited-success="resetSuccess"
                @submited-error="resetError"
                autocomplete="off"
            >
                <v-layout row wrap>
                    <v-flex md12 v-if="!$route.query.token">
                        <lq-v-text-field
                            id="token"
                            maxlength="6"
                            counter
                            placeholder="Enter OTP/Token"
                            label="OTP/Token"
                        />
                    </v-flex>
                    <v-flex md12>
                        <lq-v-text-field
                            label=" NEW PASSWORD"
                            placeholder="Enter Password"
                            id="password"
                            maxlength="12"
                            :autofocus="true"
                            :append-icon="e1 ? 'visibility_off' : 'visibility'"
                            @click:append="() => (e1 = !e1)"
                            @keyup.enter="() => $refs.form.submit()"
                            :type="e1 ? 'password' : 'text'"
                            counter
                            :max="4"
                        ></lq-v-text-field>
                    </v-flex>

                    <v-flex md12>
                        <lq-v-text-field
                            label="CONFIRM PASSWORD"
                            placeholder="Confirm Password"
                            id="password_confirmation"
                            maxlength="12"
                            :append-icon="e2 ? 'visibility_off' : 'visibility'"
                            @click:append="() => (e2 = !e2)"
                            @keyup.enter="() => $refs.form.submit()"
                            :type="e2 ? 'password' : 'text'"
                            counter
                            :max="4"
                        ></lq-v-text-field>
                    </v-flex>

                    <v-flex md12 sm12 xs12 lg12>
                        <v-layout align-center justify-center row fill-height>
                            <v-flex md6 sm6 xs6 lg6>
                                <lq-v-submit-btn color="primary" label="Login" />
                            </v-flex>
                            <v-flex md6 sm6 xs6 lg6 class="text-xs-right">
                                <router-link
                                    :to="{name: 'login'}"
                                    class="login-link font-weight-medium"
                                >Login</router-link>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                </v-layout>
            </lq-v-form>
        </template>
    </auth-layout>
</template>
<script>
export default {
    data() {
        return {
            e1: true,
            e2: true,
            token: null,
            rules: {
                password: {
                    presence: {
                        allowEmpty: false,
                        message: "^New password can't be blank"
                    }
                },
                password_confirmation: {
                    presence: {
                        allowEmpty: false,
                        message: "^Confirm password can't be blank"
                    }
                }
            }
        };
    },
    created: function() {
        this.token = this.$route.query.token;
        if (this.token) {
            this.axios({
                method: 'POST',
                url: 'check-valid-token',
                data: {
                    token: this.token
                }
            }).then(response => {})
                .catch(error => {
                    const error_code = error.response.data.error_code;
                    const message = error.response.data.message;
                    this.$message.error(message);
                    this.$router.push({ name: 'login' });
                });
        }
    },
    methods: {
        resetSuccess: function() {
            this.$message.success('Password reset Successfully');
            return this.$router.push({ name: 'login' });
        },
        resetError: function(reponse) {
            this.$message.error(
                'Your input is not valid. Please check the form.'
            );
        }
    }
};
</script>