<template>
    <div>
        <title-layout>
            <template>
                <lq-list-filter name="notification_template_list" class="list_filter">
                    <title-row>
                        <v-flex md4 sm6 xs12>
                            <lq-v-select
                                id="type"
                                placeholder="Notification Type"
                                item-text="label"
                                item-value="value"
                                :options="typeOptions"
                                clearable
                            />
                        </v-flex>
                        <v-flex md3 sm6 xs12>
                            <lq-v-text-field id="search" append-icon="search" placeholder="Search" />
                        </v-flex>
                        <v-flex md5 sm6 xs12>
                            <title-row>
                                <v-btn
                                    color="primary"
                                    dark
                                    :to="{name: 'notification.template.create'}"
                                >
                                    Create
                                    <v-icon>add</v-icon>
                                </v-btn>
                                <v-btn
                                    color="primary"
                                    dark
                                    :to="{name: 'notification.template.email.body'}"
                                >
                                    Email Layout
                                    <v-icon>edit</v-icon>
                                </v-btn>
                            </title-row>
                        </v-flex>
                    </title-row>
                </lq-list-filter>
            </template>
        </title-layout>
        <v-container fluid grid-list-md>
            <v-layout>
                <v-flex sm12>
                    <lq-v-data-table
                        table-name="notification_template_list"
                        action="notification-template"
                        :headers="headers"
                    >
                        <template v-slot:items="{index, item}">
                            <v-serial-no :index="index" />
                            <td>{{item.name}}</td>
                            <td>{{item.subject}}</td>
                            <td>{{item.type}}</td>
                            <td align="right">
                                <v-btn
                                    :to="{name: 'notification.template.edit', params: {id: item.id} }"
                                    slot="activator"
                                    class="v-btn--simple"
                                    color="success"
                                    icon
                                >
                                    <v-icon dark>edit</v-icon>
                                </v-btn>
                                <lq-v-delete-data-table-item
                                        :item="item"
                                        confirm-msg="Are you sure to delete this Notification?"
                                        url="/notification-template"
                                    />
                            </td>
                        </template>
                    </lq-v-data-table>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>
<script>
export default {
    name: 'permission.list.page',
    data() {
        return {
            headers: [
                { text: '#', value: 'sn', sortable: false, align: 'left' },
                {
                    text: 'Name',
                    value: 'notification_templates.name',
                    sortable: true,
                    align: 'left'
                },
                {
                    text: 'Subject',
                    value: 'notification_templates.subject',
                    sortable: true,
                    align: 'left'
                },
                {
                    text: 'Type',
                    value: 'notification_templates.type',
                    sortable: true,
                    align: 'left'
                },
                {
                    text: 'Action',
                    value: 'notification_templates.action',
                    align: 'right'
                }
            ],
            typeOptions: [
                { label: 'SMS Notification', value: 'sms' },
                { label: 'Email Notification', value: 'email' },
                {label: 'Push Notification', value: 'push_notification'},
                { label: 'Database Notification', value: 'database' }
            ]
        };
    }
};
</script>