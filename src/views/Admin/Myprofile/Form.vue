<template>
    <div>
        <lq-v-form 
            name="myprofile" 
            action="my-profile"
            request-method="PUT"
            ref="form"
            @submited-success="onSuccess"
            @submited-error="onError"
            :rules="rules"
            autocomplete="off">

            <v-container grid-list-lg pr-1 pl-1>
                <v-layout class="edit-profile">
                    <v-flex xs12 md2>
                       <v-avatar class="profile-image">
                           <div class="profile-blcok rounded-image position-relative">
                                <span class="image">
                                    <img :src="$helper.getProp(authProfile, 'profile_image.path',dummyImage )" />
                                </span>
                                <image-uploader 
                                    file-name="profileImage" 
                                    @image-uploaded="whenImageUploaded"
                                    action="/profile-photo">
                                    <template v-slot:default="{openWindow}">
                                        <v-icon dark class="small-icon"
                                            @click.stop="openWindow()">
                                            camera_alt
                                        </v-icon>
                                    </template>
                                </image-uploader>
                           </div>
                        </v-avatar>
                    </v-flex>
                    <v-flex xs12 md8>
                        <v-layout class="flex-column">
                            <v-flex xs12 sm6 pt-0 pb-0>
                                <lq-v-text-field
                                    label="NAME"
                                    placeholder="Larry"
                                    id="name" 
                                    counter
                                    maxlength="25"/> 
                            </v-flex>

                            <v-flex xs12 sm6 pt-0 pb-0>
                                <lq-v-text-field
                                label="Email"
                                placeholder="LarryJohnson234@gmail.com"
                                id="email" />
                            </v-flex>
                        </v-layout>

                        <v-layout class="flex-column">
                            <v-flex xs12 sm12 pt-0 pb-0 >
                                <lq-v-textarea
                                :maxlength="255"
                                label="ABOUT ME"
                                auto-grow
                                counter
                                :rows="3"
                                id="about_me"/>
                            </v-flex>
                        </v-layout>

                        <v-layout class="flex-column">
                            <v-flex xs12 sm6 pt-0 pb-0>
                                <lq-v-submit-btn class='red-btn ml-0' label="SAVE" />  
                                <router-link :to="{name: 'reset.password'}">Reset Password</router-link>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-container>
        </lq-v-form>
    </div>
</template>
<script>
import { mapGetters } from "vuex";


export default {
  name: 'profile-form',
  computed: {
    ...mapGetters(['authProfile'])
  },
  data(){
    return {
      rules: {
        name: {presence: true},
        email: {presence: true, email: true},
        contact_number: {presence: true},
        about_me: {presence: true},
      },
      user: {}
    }
  },
  created() {
      this.axios('my-profile')
      .then((response) => {
        console.log('response', response)
        this.user = this.$helper.getProp(response, 'data.user', {});
        this.$lqForm.initializeValues('myprofile', this.user);
      }).catch((error) => {
          // this.$router.push({name: 'myprofile'});
      })
  },
  methods: {
    onSuccess: function(response) {
      this.$root.$dialogLoader.showSnackbar(
        'Profile updated successfully', 
        { color: 'success' } 
      );
      this.$store.dispatch('profile/mix', {
        value: response.data.data
      })
      return this.$router.push({name: 'dashboard'});
    },
    onError: function(reponse) {
        this.$root.$dialogLoader.showSnackbar(
        'Your input is not valid. Please check the form.', 
        { color: 'error' } 
      );    
    },
    uploadImageToServer: function(fileObject, fileIndex) {
        // console.log('dfhkdjgfjdgf', fileObject, fileIndex);
    },
    whenImageUploaded: function (response) {
      
      this.$store.commit('profile/update', {
          key: 'profile_image', 
          value: response.data.data.profile_image
        }
      )
      this.$root.$dialogLoader.showSnackbar(
        'Profile image updated successfully', 
        { color: 'success',mode: 'multi-line' } 
      );
    }
  }
}
</script>