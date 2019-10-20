<template>
    <lq-v-form
        name="myprofile"
        action="my-profile"
        request-method="PUT"
        ref="form"
        @submited-success="onSuccess"
        @submited-error="onError"
        :rules="rules"
        autocomplete="off"
    >
          <v-container fill-height fluid grid-list-md grid-list-xs>
            <v-layout wrap>
                <v-flex xs12 md4>
                    <lq-v-text-field class="purple-input" label="Full Name" id="name" />
                </v-flex>
                 <v-flex xs12 md4>
                    <lq-v-mobile-number  label="Mobile No" placeholder="Mobile No" id="mobile_no" />
                </v-flex>
                 <v-flex xs12 md4>
                    <lq-v-text-field class="purple-input" label="Email" id="email" />
                </v-flex>
                <v-flex xs12 md4>
                    <lq-v-text-field label="City" class="purple-input" id="city" />
                </v-flex>
                <v-flex xs12 md4>
                    <lq-v-text-field label="Country" class="purple-input" id="country" />
                </v-flex>
                <v-flex xs12 md4>
                    <lq-v-text-field
                        class="purple-input"
                        label="Postal Code"
                        type="number"
                        id="pincode"
                    />
                </v-flex>
                <v-flex xs12>
                    <lq-v-textarea
                        id="about_me"
                        class="purple-input"
                        label="About Me"
                    />
                </v-flex>
                <v-flex xs12 text-xs-right>
                    <lq-v-submit-btn class="red-btn ml-0" label="SAVE" />
                </v-flex>
            </v-layout>
        </v-container>
    </lq-v-form>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
    name: 'profile-form',
    computed: {
        ...mapGetters(['authProfile'])
    },
    data() {
        return {
            rules: {
                name: { presence: true },
                email: { presence: true, email: true },
                mobile_no: { presence: true },
                about_me: { presence: true }
            }
        };
    },
    methods: {
        onSuccess: function(response) {
            this.$message.success('Profile updated successfully');
            this.$store.dispatch('profile/mix', {
                value: response.data.data
            });
            return this.$router.push({ name: 'dashboard' });
        },
        onError: function(reponse) {
            this.$message.success(
                'Your input is not valid. Please check the form.'
            );
        },
        uploadImageToServer: function(fileObject, fileIndex) {
            // console.log('dfhkdjgfjdgf', fileObject, fileIndex);
        },
        whenImageUploaded: function(response) {
            this.$store.commit('profile/update', {
                key: 'profile_image',
                value: response.data.data.profile_image
            });
            this.$message.success('Profile image updated successfully');
        }
    }
};
</script>