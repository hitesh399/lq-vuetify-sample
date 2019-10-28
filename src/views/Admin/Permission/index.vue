<template>
    <div>
        <title-layout table-name="permission_list">
            <title-row>
                <v-flex md4>
                    <lq-v-text-field
                        id="search"
                        append-icon="search"
                        placeholder="Search"
                        single-line
                        hide-details
                    />
                </v-flex>
                <v-flex md4>
                    <title-row>
                        <v-btn color="primary" :to="{name: 'permission.create'}" dark>
                            Create
                            <v-icon>add</v-icon>
                        </v-btn>
                        <v-btn color="primary" icon round dark @click.stop="downloadFile">
                            <v-icon>file_download</v-icon>
                        </v-btn>
                    </title-row>
                </v-flex>
            </title-row>
        </title-layout>
        <v-container fluid grid-list-md>
            <v-layout row wrap>
                <v-flex md12>
                    <DropZone
                        @upload-completed="uploadComplete"
                        file-name="file"
                        action="/permission/upload"
                    />
                </v-flex>
            </v-layout>
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
import DropZone from '../../../components/Vuetify/DropZone';
const FileDownload = require('js-file-download');
export default {
    name: 'permission.list.page',
    components: { DropZone },
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
    },
    methods: {
        uploadComplete() {
            console.log('I am here and completed.');
        },
        downloadFile(e) {
            this.$axios('/permission?export=excel', {
                responseType: 'arraybuffer',
            }).then(response => {
                FileDownload(response, 'permissions.xlsx');
            });
        }
    }
};
</script>