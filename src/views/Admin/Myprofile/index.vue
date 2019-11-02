<template>
    <v-container fill-height fluid grid-list-xl>
        <v-layout row wrap>
            <v-flex xs12 md4>
                <material-card class="v-card-profile">
                    <v-avatar slot="offset" class="mx-auto d-block" size="130">
                        <img
                            :src="$helper.getProp(authProfile, 'profile_image.path', defaultProfileImage)"
                            :alt="$helper.getProp(authProfile, 'name')"
                        />
                        <div style="position: absolute;top: 0;right: 10px;">
                            <image-uploader
                                file-name="profileImage"
                                @image-uploaded="whenImageUploaded"
                                :thumb="{ width: 200, height: 200 }"
                                action="/my-profile/profile-photo"
                            >
                                <template v-slot:default="{openWindow}">
                                    <v-icon class="small-icon" @click.stop="openWindow()">camera_alt</v-icon>
                                </template>
                            </image-uploader>
                        </div>
                    </v-avatar>
                    <v-card-text class="text-xs-center">
                        <h6 class="category text-gray font-weight-thin mb-3">CEO / CO-FOUNDER</h6>
                        <h4 class="card-title font-weight-light">Alec Thompson</h4>
                        <p
                            class="card-description font-weight-light"
                        >Don't be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the back is...</p>
                    </v-card-text>
                </material-card>
            </v-flex>
            <v-flex xs12 md8>
                <material-card color="primary" class="card-tabs">
                    <v-flex slot="header">
                        <v-tabs color="transparent">
                            <v-tab name="my-profile" :to="{name: 'my-profile.show'}">
                                <v-icon class="mr-2">person</v-icon>My Profile
                            </v-tab>
                            <v-tab :to="{name: 'my-profile.resetpassword'}">
                                <v-icon class="mr-2">mdi-transfer</v-icon>Change Password
                            </v-tab>
                            <v-tab :to="{name: 'my-profile.appsetting'}">
                                <v-icon class="mr-2">mdi-settings</v-icon>Settings
                            </v-tab>
                        </v-tabs>
                    </v-flex>
                    <v-fade-transition mode="out-in">
                        <router-view :key="$route.fullPath" />
                    </v-fade-transition>
                </material-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
export default {
    name: 'admin.profile',
    methods: {
        whenImageUploaded: function(response) {
            this.$store.commit('profile/update', {
                key: 'profile_image',
                value: response.data.data.profile_image
            });
            this.$message.success('Profile image updated successfully');
        }
    },
    created() {
        
    }
};
</script>