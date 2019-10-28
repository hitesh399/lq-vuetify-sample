<template>
    <div>
        <title-layout table-name="role_list">
            <title-row>
                <v-flex sm6>
                    <lq-v-text-field
                        id="search"
                        append-icon="search"
                        placeholder="Search"
                        single-line
                        hide-details
                    />
                </v-flex>
                <v-flex md3 v-if="isDeveloper">
                    <title-row>
                        <v-btn color="primary" :to="{name: 'role.create'}" dark>
                            Create
                            <v-icon>add</v-icon>
                        </v-btn>
                    </title-row>
                </v-flex>
            </title-row>
        </title-layout>
        <v-container fluid grid-list-md>
            <v-layout>
                <v-flex sm12>
                    <lq-v-data-table
                        table-name="role_list"
                        action="role"
                        :headers="headers"
                        item-key="id"
                        default-sort-by="name"
                    >
                        <template v-slot:items="{index, item}">
                            <v-serial-no :index="index" />
                            <td>{{item.title}}</td>
                            <td>{{item.description}}</td>
                            <td>{{item.clients.map(c => c.name).join(', ')}}</td>
                            <td align="right">
                                <v-btn
                                    :to="`/role/${item.id}/edit`"
                                    slot="activator"
                                    class="v-btn--simple"
                                    color="success"
                                    icon
                                >
                                    <v-icon>edit</v-icon>
                                </v-btn>
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
    name: 'role.list.page',
    data() {
        return {
            headers: [
                { text: '#', value: 'sn', sortable: false, align: 'left' },
                {
                    text: 'Name',
                    value: 'roles.title',
                    sortable: true,
                    align: 'left'
                },
                {
                    text: 'Description',
                    value: 'roles.description',
                    sortable: true,
                    align: 'left'
                },
                {
                    text: 'Applications',
                    value: 'roles.client_ids',
                    sortable: false,
                    align: 'left'
                },
                { text: 'Action', value: 'roles.action', align: 'right' }
            ]
        };
    }
};
</script>