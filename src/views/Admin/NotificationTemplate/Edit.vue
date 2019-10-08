<template>
    <div>
        <title-layout>
            <v-layout row wrap>
                <v-flex md12>
                    <go-back :to="{name: 'notification.template.list'}" />
                </v-flex>
            </v-layout>
        </title-layout>
        <v-container fluid grid-list-md>
            <lq-v-form
                @submited-success="onSuccess"
                name="notification_template_form"
                :action="`/notification-template/${$route.params.id}`"
                request-method="PUT"
            >
                <template v-slot:default="{ model }">
                    <v-card :style="{'margin-bottom': '10px'}">
                        <v-container fluid grid-list-md>
                            <NotificationForm :model="model" />
                        </v-container>
                    </v-card>
                    <v-flex md12 sm12 xs12>
                        <lq-v-submit-btn class="red-btn ml-0" label="Update" />
                    </v-flex>
                </template>
            </lq-v-form>
        </v-container>
    </div>
</template>
<script>
import NotificationForm from './Form';

export default {
    name: 'notification.template.edit.page',
    components: {
        NotificationForm
    },
    created() {
        this.$axios('notification-template/' + this.$route.params.id).then(
            response => {
                // console.log('Response', response)
                const template = response.data.template;
                this.$lqForm.initializeValues(
                    'notification_template_form',
                    template
                );
            }
        );
    },
    methods: {
        onSuccess(response) {
            this.$message.success(response.message);
            this.$router.push({ name: 'notification.template.list' });
        }
    }
};
</script>