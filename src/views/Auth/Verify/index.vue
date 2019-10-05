<template>
    <auth-layout>
        <template v-slot:title>Verify Email/Mobile Number</template>
        <template v-slot:default>
            <lq-v-form
                name="verfication"
                action="generate-token"
                :rules="rules"
                ref="form"
                @submited-success="emailSuccess"
                @submited-error="emailError"
                autocomplete="off"
            >
                <v-layout row wrap>
                    <v-flex md12 sm12 xs12>
                        <email-mobile-input id="email" />
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
            token: null,
            rules: {
                email: { presence: true }
            }
        };
    },
    methods: {
        emailSuccess: function() {
            let message = this.isEmailOrBlank
                ? 'A link has been sent on your email address, Please click on it.'
                : 'Otp has been sent please verify';
            this.$message.success(message);
            this.$router.push({
                name: this.isEmailOrBlank ? 'login' : 'verify.otp'
            });
        },
        emailError: function() {
            this.$message.error(
                'Your input is not valid. Please check the form.'
            );
        }
    }
};
</script>