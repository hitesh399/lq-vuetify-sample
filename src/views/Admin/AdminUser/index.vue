<template>
    <div>
        <title-layout>
            <lq-list-filter name="admin_list" class="list_filter">
                <title-row>
                    <v-flex md4 sm6 xs12>
                        <lq-v-text-field id="search" append-icon="search" placeholder="Search" />
                    </v-flex>
                    <v-flex md3 sm6 xs12>
                        <title-row>
                            <v-btn color="primary" :to="{name: 'admin.create'}" dark>
                                Create
                                <v-icon>add</v-icon>
                            </v-btn>
                        </title-row>
                    </v-flex>
                </title-row>
            </lq-list-filter>
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
                    >
                        <template v-slot:items="{index, item}">
                            <v-serial-no :index="index" />
                            <td>{{item.name}}</td>
                            <td>{{item.email}}</td>
                            <td>{{$root.displayDateTime(item.created_at)}}</td>
                            <td align="right">
                                <ChangeStatus :item="item" />
                            </td>
                            <td align="right">
                                <v-btn
                                    :to="{name: 'admin.edit', params: {id: item.id}}"
                                    class="v-btn--simple"
                                    color="success"
                                    icon
                                >
                                    <v-icon dark>edit</v-icon>
                                </v-btn>
                                <lq-v-delete-data-table-item
                                    :item="item"
                                    confirm-msg="Are you sure to delete this admim?"
                                    url="/admin"
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
                { text: 'Status', value: 'users.status', align: 'right' },
                { text: 'Action', value: 'users.action', align: 'right' }
            ]
        };
    }
};
</script>