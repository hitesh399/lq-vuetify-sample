<template>
    <v-navigation-drawer temporary right="right" :value="drawer" fixed app class="notification-sec">
        <v-toolbar flat prominent dark class="primary">
            <v-toolbar-title>Notifications</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click.stop="$emit('close')">
                <v-icon>close</v-icon>
            </v-btn>
        </v-toolbar>
        <v-list subheader dense>
            <v-subheader>
                All notifications
                <v-btn
                    v-if="totalNotification"
                    flat
                    class="mw-default action-icon m-auto text-red pull-right mr-3"
                >
                    <v-icon class="subheading">delete</v-icon>
                </v-btn>
            </v-subheader>
            <lq-list
                action="notification"
                :other-server-data="['data.unread_total']"
                name="my_notifications"
            >
                <template slot-scope="scope">
                    <v-list-tile
                        v-for="notifiy in scope.items"
                        :class="{
							unread: !(!!notifiy.read_at)
						}"
                        :key="`notification_${notifiy.id}`"
                    >
                        <v-list-tile-action class="mx-0 pa-0">
                            <v-icon class="mx-0 pa-0">mail</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content class="caption">
                            <p class="pa-0 ma-0">{{ notifiy.title }}</p>
                        </v-list-tile-content>
                        <v-btn
                            flat
                            class="mw-default action-icon m-auto text-red pull-right my-0 mr-0"
                        >
                            <v-icon class="subheading">delete</v-icon>
                        </v-btn>
                    </v-list-tile>
                    <v-divider></v-divider>
                    <load-more />
                    <no-record-found />
                </template>
            </lq-list>
        </v-list>
    </v-navigation-drawer>
</template>

<script>

export default {
    props: {
        drawer: Boolean
    },
    methods: {
        // async deleteNotification(id) {
        // }
    },
    computed: {
        totalNotification: function() {
            return this.$helper.getProp(
                this.$store.state,
                'table.my_notifications.settings.total',
                0
            );
        }
    }
};
</script>


<style>
</style>
