<template>
    <auth-layout>
        <template v-slot:default>
            <lq-v-form
                name="otp_verfication"
                action="user-email-or-mobile-verify"
                :rules="rules"
                ref="form"
                @submited-success="otpSuccess"
                @submited-error="otpError"
                autocomplete="off"
            >
                <v-layout row wrap>
                    <v-flex md12>
                        <lq-v-text-field label="OTP" placeholder="Enter Otp" id="token" />
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
            rules: {
                token: { presence: true }
            }
        };
    },
    methods: {
        otpSuccess: function() {
            this.$message.success('Otp verified successfully');
            this.$router.push({ name: 'login' });
        },
        otpError: function() {
            this.$message.error(
                'Your input is not valid. Please check the form.'
            );
        }
    }
};
</script>