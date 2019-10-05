<template>
<div>
    <title-layout >
        <lq-list-filter name="config_list" class="list_filter">
            <template v-slot="{ model }">
                <v-layout  justify-end row align-center>
                <v-flex sm6 md6>
                    <lq-v-text-field
                        id="search"
                        label="Search"
                        append-icon="search"
                        placeholder="Search"
                    />
                </v-flex>
                <v-flex md3 v-if="isDeveloper">
                    <v-layout  justify-end row align-center>
                        <v-btn @click="editAction = undefined; method = 'POST'; createdialog = true;">Create</v-btn>
                    </v-layout>
                </v-flex>
                </v-layout>
            </template>
        </lq-list-filter>
    </title-layout>
    <v-dialog v-model="createdialog" max-width="500px">
        <ConfigForm v-if="createdialog" 
            @submited-success="createdSuccess" 
            :action="editAction" 
            :method="method" 
            @close="createdialog = false"
        />
    </v-dialog>

    <v-dialog v-model="editdialog" max-width="500px">
        <UpdateDataForm v-if="editdialog" @saved="editdialog = false" @cancel="editdialog = false" />
    </v-dialog>
    <v-container fluid grid-list-md>
        <v-layout row wrap>
            <v-flex md12>
                 <v-alert
                    :value="true"
                    type="warning">
                    Please refer the user guide to change the configurations.
                </v-alert>
            </v-flex>
            <v-flex sm12>               
               
                <lq-v-data-table
                    table-name="config_list"
                    action="config"
                    :headers="headers"
                    item-key="id"
                    default-sort-by="name">
                    <template v-slot:items="props">
                        <v-serial-no :index="props.index" />
                        <td>
                            <a v-if="isDeveloper" href="javascript:void(0)" 
                                @click="openCreatePopup(props.item)">
                                {{props.item.name}}
                            </a>
                            <span v-else>
                                {{props.item.name}}
                            </span>
                        </td>
                        <td>{{props.item.config_group}}</td>
                        <td>
                            <div :style="{'width': '450px', 'max-width': '100%', 'word-break': 'break-all'}" class="text-no-warp">
                                <a href="javascript:void(0)" @click="openEditPopup(props.item)">
                                    {{dataValue(props.item)}}
                                </a>
                            </div>
                        </td>
                        <td align="right" v-if="isDeveloper">
                            <!-- <v-icon @click="openEditPopup(props.item)">edit</v-icon> -->
                            <v-icon @click="deleteConfig(props.item)">delete</v-icon>
                        </td>
                    </template>
                </lq-v-data-table>
            </v-flex>
        </v-layout>
    </v-container>
</div>
</template>
<script>

import UpdateDataForm from './UpdateDataForm';
import ConfigForm from './Form';

export default {
    name: 'config-page',
    components: { UpdateDataForm, ConfigForm },
    data () {
        return {
            editdialog: false,
            editAction: undefined,
            rules: null,
            createdialog: false,
            method: 'POST'
        }
    },
    computed: {
        headers () {
            let h = [
                { text: '#', value: 'sn', sortable: false },
                { text: 'Name', value: 'name', sortable: true },
                { text: 'Group', value: 'config_group', sortable: true },
                { text: 'Data', value: 'data', sortable: false, width: 200},
                // { text: 'Action', value: 'sn', sortable: false, align: 'right', hidden: true },
            ]
            if (this.isDeveloper) {
                h.push({ text: 'Action', value: 'sn', sortable: false, align: 'right'})
            }
            return h;
        }
    },
    methods: {
        deleteConfig (config) {
            this.confirmAndAction('/config/' + config.id, {
                confirmMsg: 'Are you sure to delete this configuration?'
            }).then(this.refreshTable);
        },
        openCreatePopup(config) {
            this.createdialog = true;
            this.method = 'PUT';
            this.editAction = '/config/' + config.id;
            this.$lqForm.initializeValues('config', config);
        },
        openEditPopup(config) {
            this.editdialog = true;
            const rules = this.$helper.getProp(config, 'options.rules', null);
            this.rules = rules ? {data: rules} : null;
            this.$lqForm.initializeValues('editconfig', config);
        },
        createdSuccess (response) {
            if (!this.editAction) {
                // New Config created so need to refresh the table data
                this.refreshTable()
            } else {
                // Edit Config so just need to update the row data/
                this.$lqTable.updateRow('config_list', response.data.config, 'id');
                this.refreshTable();
            }
            this.editAction = undefined; 
            this.createdialog = false; 
            this.method = 'POST'
        },
        refreshTable () {
            this.$lqTable.refresh('config_list', true);
        },
        dataValue (item) {
            const val = this.$helper.getProp(item, 'options.secure', false) ? '*******(Protected Data)' : item.data
            return val ? val : '(empty)';
        }
        
    }
}
</script>
