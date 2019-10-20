<template>
    <v-container pb-1>
        <lq-v-form
            @submited-success="done"
            name="resetpassword"
            action="my-profile/reset-password"
            request-method="PUT"
        >
            <v-flex xs12 sm12 md6>
                <lq-v-text-field
                    label="OLD PASSWORD"
                    placeholder="***********"
                    id="old_password"
                    maxlength="12"
                    :append-icon="e3 ? 'visibility_off' : 'visibility'"
                    @click:append="() => (e3 = !e3)"
                    :type="e3 ? 'password' : 'text'"
                    counter
                ></lq-v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md6>
                <lq-v-text-field
                    label="PASSWORD"
                    placeholder="***********"
                    id="password"
                    maxlength="12"
                    :append-icon="e1 ? 'visibility_off' : 'visibility'"
                    @click:append="() => (e1 = !e1)"
                    :type="e1 ? 'password' : 'text'"
                    counter
                ></lq-v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md6>
                <lq-v-text-field
                    label="CONFIRM PASSWORD"
                    placeholder="***********"
                    id="confirm_password"
                    maxlength="12"
                    :append-icon="e2 ? 'visibility_off' : 'visibility'"
                    @click:append="() => (e2 = !e2)"
                    :type="e2 ? 'password' : 'text'"
                    counter
                ></lq-v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md6>
                <lq-v-submit-btn color="red" label="Change Password" />
            </v-flex>
        </lq-v-form>
    </v-container>
</template>
<script>
export default {
    name: 'reset.password',
    data() {
        return {
            e1: true,
            e2: true,
            e3: true
        };
    },
    methods: {
        done() {
            this.$message.success('Password has been changed.');
            this.$router.push({ name: 'my-profile.show' });
        }
    }
};
</script>