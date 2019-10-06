<template>
    <div>
        <title-layout :filter="true" tableName="admin_list">
            <template>
                <title-row>
                    <v-flex md6 sm6 xs12>
                        <lq-v-text-field id="search" append-icon="search" placeholder="Search" />
                    </v-flex>
                    <v-flex md6 sm6 xs12>
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
                    <lq-v-date-range
                        id="created_at_range"
                        display-format="dd/MM/yyyy"
                        label="Created At Range"
                        placeholder="Created At Range"
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
            ]
        };
    }
};
</script>