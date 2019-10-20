<template>
    <v-container fill-height fluid grid-list-xl>
        <v-layout row wrap>
            <v-flex md12>
                <v-switch
                    :loading="updatingPushNotificationSetting"
                    :disabled="updatingPushNotificationSetting"
                    @change="changePushNotificationSetting"
                    :value="$helper.getProp(device, 'pivot.settings.allow_push_notification') === 'Yes' ? true: false"
                    label="Allow Push Notification"
                ></v-switch>
            </v-flex>
            <v-flex md12 v-if="!device.device_token && device.device_token !== undefined">
                <v-switch
                    @change="saveDeviceToken"
                    :value="!!device.device_token"
                    label="Generate Device Token to Get Pushnotification"
                ></v-switch>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
import firebase from '../../../firebase';

export default {
    name: 'app.setting.page',
    data() {
        return {
            device: {},
            updatingPushNotificationSetting: false
        };
    },
    created() {
        this.$axios('my-device').then(response => {
            this.device = response.data;
            console.log('  this.device ', this.device);
        });
    },
    methods: {
        saveDeviceToken() {
            firebase.messaging
                .requestPermission()
                .then(() => {
                    console.log('Notification permission granted.');

                    // Get Token
                    firebase.messaging
                        .getToken()
                        .then(token => {
                            this.$axios
                                .put('my-device/token', {
                                    device_token: token
                                })
                                .then(response => {
                                    this.device = response.data;
                                });
                        })
                        .catch(e => {
                            console.log('Error to get it', e);
                        });
                })
                .catch(err => {
                    console.log('Unable to get permission to notify.', err);
                });
        },
        changePushNotificationSetting() {
            this.updatingPushNotificationSetting = true;
            this.$axios
                .put('my-device/push-notification-enable-disable')
                .then(response => {
                    this.$helper.setProp(
                        this.device,
                        'pivot.settings.allow_push_notification',
                        response.data.allow_push_notification
                    );
                    this.updatingPushNotificationSetting = false;
                })
                .catch(() => {
                    this.updatingPushNotificationSetting = false;
                });
        }
    }
};
</script>