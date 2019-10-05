<template>
    <div>
        <title-layout>
            <lq-list-filter name="permission_list" class="list_filter">
                <v-layout justify-end row align-center>
                    <v-flex md4>
                        <lq-v-text-field
                            id="search"
                            append-icon="search"
                            placeholder="Search"
                            single-line
                            hide-details
                        />
                    </v-flex>
                    <v-flex md2>
                        <v-btn color="primary" :to="{name: 'permission.create'}" dark>
                            Create
                            <v-icon>add</v-icon>
                        </v-btn>
                    </v-flex>
                </v-layout>
            </lq-list-filter>
        </title-layout>
        <v-container fluid grid-list-md>
            <v-layout>
                <v-flex sm12>
                    <lq-v-data-table
                        table-name="permission_list"
                        action="permission"
                        :headers="headers"
                    >
                        <template v-slot:items="{index, item}">
                            <tr>
                                <v-serial-no :index="index" />
                                <td>{{item.name}}</td>
                                <td>{{item.title}}</td>
                                <td align="right">
                                    <v-btn
                                        :to="{name: 'permission.edit', params: {id: item.id} }"
                                        slot="activator"
                                        class="v-btn--simple"
                                        color="success"
                                        icon
                                    >
                                        <v-icon dark>edit</v-icon>
                                    </v-btn>
                                </td>
                            </tr>
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
                    value: 'permissions.name',
                    sortable: true,
                    align: 'left'
                },
                {
                    text: 'Title',
                    value: 'permissions.title',
                    sortable: true,
                    align: 'left'
                },
                { text: 'Action', value: 'permissions.action', align: 'right' }
            ]
        };
    }
};
</script>