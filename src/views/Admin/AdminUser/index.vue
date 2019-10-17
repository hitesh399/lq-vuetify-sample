<template>
    <div>
        <title-layout :filter="true" tableName="admin_list" v-if="showTable">
            <template>
                <title-row>
                    <v-flex md4 sm4 xs12>
                        <lq-v-date-range
                            id="created_at_range"
                            display-format="dd/MM/yyyy"
                            label="Created At Range"
                            placeholder="Created At Range"
                        />
                    </v-flex>
                    <v-flex md4 sm4 xs12>
                        <lq-v-text-field id="search" label="Keyword Search" append-icon="search" placeholder="Search" />
                    </v-flex>
                    <v-flex md4 sm4 xs12>
                        <title-row>
                            <lq-filter-btn tag="v-btn" color="info">
                                <v-icon>filter_list</v-icon>Filter
                            </lq-filter-btn>

                            <v-btn
                                color="primary"
                                :to="{name: 'admin.create'}"
                                dark
                                v-if="can('admin.admin-user.create')"
                            >
                                Create
                                <v-icon>add</v-icon>
                            </v-btn>
                        </title-row>
                    </v-flex>
                </title-row>
            </template>
            <template v-slot:filter>
                <v-flex md12 sm12 xs12>
                    <lq-v-text-field id="email" placeholder="Email" />
                    <lq-v-select
                        id="status"
                        :options="['Active', 'In-active']"
                        placeholder="Status"
                    />
                </v-flex>
            </template>
        </title-layout>
        <v-container fluid grid-list-md>
            <v-layout>
                <v-flex sm12>
                    <lq-v-data-table
                        table-name="admin_list"
                        action="admin"
                        :headers="headers"
                        item-key="id"
                        :static-data="{my_app_user: 'yes'}"
                        default-sort-by="users.name"
                        :auto-filter="false"
                        v-if="showTable"
                    >
                        <template v-slot:items="{index, item}">
                            <v-serial-no :index="index" />
                            <td>{{item.name}}</td>
                            <td>{{item.email}}</td>
                            <td>{{$root.displayDateTime(item.created_at)}}</td>
                            <td class="align-center" v-if="can('admin.admin-user.change-status')">
                                <ChangeStatus
                                    :item="item"
                                    v-if="can('admin.admin-user.change-status')"
                                />
                            </td>
                            <td
                                class="align-right"
                                v-if="can(['admin.admin-user.delete', 'admin.admin-user.edit'])"
                            >
                                <v-layout justify-end>
                                    <v-btn
                                        :to="{name: 'admin.edit', params: {id: item.id}}"
                                        class="v-btn--simple"
                                        color="success"
                                        icon
                                        v-if="can('admin.admin-user.edit')"
                                    >
                                        <v-icon dark>edit</v-icon>
                                    </v-btn>
                                    <lq-v-delete-data-table-item
                                        :item="item"
                                        v-if="can('admin.admin-user.delete')"
                                        confirm-msg="Are you sure to delete this admim?"
                                        url="/admin"
                                    />
                                </v-layout>
                            </td>
                        </template>
                    </lq-v-data-table>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>
<script>
import ChangeStatus from './ChangeStatus';
import { tableAliveOnly } from '../../../utils';
export default {
    name: 'admin.list.page',
    components: { ChangeStatus },
    data() {
        return {
            headers: [
                { text: '#', value: 'sn', sortable: false, align: 'left' },
                {
                    text: 'Name',
                    value: 'users.name',
                    sortable: true,
                    align: 'left'
                },
                {
                    text: 'Email',
                    value: 'users.email',
                    sortable: true,
                    align: 'left'
                },
                {
                    text: 'Created At',
                    value: 'users.created_at',
                    sortable: true,
                    align: 'left'
                },
                {
                    text: 'Status',
                    value: 'users.status',
                    permissions: ['admin.admin-user.change-status']
                },
                {
                    text: 'Action',
                    value: 'users.action',
                    align: 'right',
                    permissions: [
                        'admin.admin-user.edit',
                        'admin.admin-user.delete'
                    ]
                }
            ],
            showTable: false,
            example: {
                title: 'Range',
                inputClass: 'exampleDatePicker',
                lang: 'en',
                position: 'right',
                range: true,
                value: ['2019-10-06T18:30:00.000Z', '2019-10-25T18:30:00.000Z'],
                firstDayOfWeek: 'monday'
            }
        };
    },
    beforeRouteEnter(to, from, next) {
        tableAliveOnly(
            from,
            next,
            'admin_list',
            ['admin.edit', 'admin.create'],
            function(vm) {
                vm.showTable = true;
            }
        );
    }
};
</script>