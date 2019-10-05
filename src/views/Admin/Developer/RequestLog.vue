<template>
    <div>
        <title-layout>
            <lq-list-filter name="request_log_list" class="list_filter">
                <title-row>
                    <v-flex md4 sm6 xs12>
                        <lq-v-text-field id="search" append-icon="search" placeholder="Search" />
                    </v-flex>
                    <v-flex md4 sm6 xs12>
                        <lq-v-select
                            action="oauth-client"
                            item-text="name"
                            item-value="id"
                            clearable
                            id="client_ids"
                            placeholder="For Application"
                        />
                    </v-flex>
                    <v-flex md4 sm6 sx12>
                        <lq-v-select
                            :options="['ok', 'exception']"
                            clearable
                            id="response_status"
                            placeholder="Status"
                        />
                    </v-flex>
                </title-row>
            </lq-list-filter>
        </title-layout>
        <v-container fluid grid-list-md>
            <v-layout>
                <v-flex sm12>
                    <lq-v-data-table
                        table-name="request_log_list"
                        action="developer/request-log"
                        :headers="headers"
                    >
                        <template v-slot:items="{index, item}">
                            <v-serial-no :index="index" />
                            <td>{{item.url}}</td>
                            <td>{{item.request_method}}</td>
                            <td>{{item.ip_address}}</td>
                            <td>{{$helper.getProp(item, 'client.name', 'N/A')}}</td>
                            <td>{{item.response_status ? item.response_status : 'N/A'}}</td>
                            <td>
                                <v-icon
                                    large
                                    @click="showPopUp(item)"
                                    color="darken-2"
                                >remove_red_eye</v-icon>
                            </td>
                        </template>
                    </lq-v-data-table>
                </v-flex>
            </v-layout>
        </v-container>
        <RequestLogPopUp />
    </div>
</template>
<script>
import RequestLogPopUp from './RequestLogPopUp';

export default {
    name: 'permission.list.page',
    components: { RequestLogPopUp },
    data() {
        return {
            headers: [
                { text: '#', value: 'sn', sortable: false, align: 'left' },
                {
                    text: 'URL',
                    value: 'request_logs.url',
                    sortable: true,
                    align: 'left'
                },
                {
                    text: 'Method',
                    value: 'request_logs.request_method',
                    sortable: true,
                    align: 'left'
                },
                {
                    text: 'IP Address',
                    value: 'request_logs.ip_address',
                    sortable: false,
                    align: 'left'
                },
                {
                    text: 'Application Name',
                    value: 'request_logs.client_id',
                    align: 'left'
                },
                {
                    text: 'Status',
                    value: 'request_logs.response_status',
                    align: 'left'
                },
                { text: 'Action', value: 'request_logs.action', align: 'right' }
            ]
        };
    },
    methods: {
        showPopUp(log) {
            this.$root.$emit('show-request-log', log);
        }
    }
};
</script>