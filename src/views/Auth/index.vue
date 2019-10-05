<template>
    <auth-layout>
        <template v-slot:title>Login</template>
        <template v-slot:default>
            <lq-v-form
                name="login"
                @submited-success="loginSuccess"
                @submited-error="loginError"
                action="login"
                :rules="rules"
                ref="form"
                autocomplete="off"
            >
                <v-layout row wrap>
                    <v-flex md12 sm12 xs12>
                        <email-mobile-input id="email" />
                    </v-flex>
                    <v-flex md12 sm12 xs12>
                        <lq-v-text-field
                            label="PASSWORD"
                            placeholder="Enter Password"
                            id="password"
                            maxlength="12"
                            :append-icon="e1 ? 'visibility_off' : 'visibility'"
                            @click:append="() => (e1 = !e1)"
                            @keyup.enter="() => $refs.form.submit()"
                            :type="e1 ? 'password' : 'text'"
                            browser-autocomplete="new-password"
                            counter
                        ></lq-v-text-field>
                    </v-flex>

                    <v-flex md12 sm12 xs12>
                        <v-layout align-center justify-center row fill-height>
                            <v-flex md6 sm6 xs6 lg6>
                                <lq-v-submit-btn color="primary" label="Login" />
                            </v-flex>
                            <v-flex md6 sm6 xs6 lg6 class="text-xs-right">
                                <router-link
                                    :to="{name: 'forgotpassword'}"
                                    class="forgot-link font-weight-medium"
                                >Forgot Your Password?</router-link>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                </v-layout>
            </lq-v-form>
        </template>
    </auth-layout>
</template>
<script>
import { mapGetters } from 'vuex';
import { setTokens } from '@/utils/auth';

const portal = require('@/utils/portal-helper');
const currentPortal = portal.currentPortal;

export default {
    data: function() {
        return {
            e1: true,
            rules: {
                email: { presence: { allowEmpty: false } },
                password: { presence: { allowEmpty: false } }
            }
        };
    },
    created() {
        if (this.authProfile && this.authProfile.id) {
            const role = this.$helper.getProp(this.authProfile, 'role');
            this.redirectToDashboard(role.name);
        }
    },
    methods: {
        redirectToDashboard(roleName) {
            switch (roleName) {
                case 'customer':
                    this.$router.push({ name: 'Dashboard' });
                    break;
                default:
                    this.$router.push({
                        name: 'dashboard'
                    });
                    break;
            }
        },
        loginSuccess: function(response) {
            this.$message.success('Login Successfully');
            const role = this.$helper.getProp(response, 'data.user.role');
            const login_index = this.$helper.getProp(
                response,
                'data.device.login_index'
            );
            const tokens = this.$helper.getProp(response, 'data.token');
            const uri = role.landing_portal;
            const url = new URL(currentPortal.getLandingUrl(login_index, uri));
            setTokens(tokens, '/', url.hostname);
            this.$store.dispatch('profile/set', { data: response.data.user });
            // window.location.href = url.toString();
            this.redirectToDashboard(role.name);
        },
        loginError: function(response) {
            const error_code = response.response.data.error_code;
            if (
                error_code === 'email_not_verified' ||
                error_code === 'mobile_not_verified'
            ) {
                this.$message.error(
                    `Firstly, verify your ${
                        error_code === 'email_not_verified' ? 'email' : 'mobile'
                    } then try to login.`
                );

                this.$router.push({ name: 'verify.email_or_mobile' });
            } else {
                this.$message.error('Something went wrong');
            }
        },
        goTolandingPage: function(login_index) {
            window.location.href = currentPortal.getLandingUrl(login_index);
        },
        logOut: function(login_index) {
            window.location.href =
                currentPortal.getLandingUrl(login_index) + '/logout';
        },
        revoke: function(user_id) {
            this.deviceUsers.forEach((user, index) => {
                if (user.id === user_id) {
                    this.$store.dispatch('deleteAppKey', {
                        key: `device_users.${index}`
                    });
                }
            });
            this.$axios({
                url: 'device/user/' + user_id + '/revoke',
                method: 'PATCH'
            });
        }
    }
};
</script>