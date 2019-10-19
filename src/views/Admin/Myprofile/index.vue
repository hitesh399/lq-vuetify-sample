<template>
    <v-container fill-height
    fluid
    grid-list-xl>
       <!--  <v-layout row wrap>
          <v-flex xs12 md8 offset-xs4>
           

            </v-tabs>  
          </v-flex>
          </v-layout> -->

            <v-layout row wrap>
                <v-flex xs12 md4>
                    <!-- <keep-alive>
                        <v-img :src="defaultProfileImage" />
                    </keep-alive> -->
                    <material-card class="v-card-profile">
                          <v-avatar
                            slot="offset"
                            class="mx-auto d-block"
                            size="130"
                          >
                            <img :src="defaultProfileImage" />
                          </v-avatar>
                          <v-card-text class="text-xs-center">
                            <h6 class="category text-gray font-weight-thin mb-3">CEO / CO-FOUNDER</h6>
                            <h4 class="card-title font-weight-light">Alec Thompson</h4>
                            <p class="card-description font-weight-light">Don't be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the back is...</p>                           
                          </v-card-text>
                        </material-card>
                </v-flex>
                <v-flex xs12 md8 >
                    
                    <material-card color="primary"
                    >
                     <v-flex slot="header"> 
                              <v-tabs
                              color="transparent"
                            >
                              <v-tab name="my-profile" :to="{name: 'my-profile.show'}">
                                My Profile
                              </v-tab>
                              <v-tab :to="{name: 'my-profile.resetpassword'}">
                                Change Password
                              </v-tab>
                              <v-tab :to="{name: 'my-profile.appsetting'}">
                                Settings
                              </v-tab>
                          </v-tabs>
                     </v-flex>
                    <v-fade-transition mode="out-in">
                        <router-view :key="$route.fullPath" />
                    </v-fade-transition >
                 </material-card>
                </v-flex>
             </v-layout>        
       
    </v-container>
</template>
<script>

import ProfileForm from './Form';

export default {
    name: 'admin.profile',
    components: { ProfileForm },
}
</script>