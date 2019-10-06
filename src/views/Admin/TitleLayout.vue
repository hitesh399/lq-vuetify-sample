<template>
    <v-container fluid grid-list-md style="padding-bottom: 0">
        <v-layout row wrap align-center fill-height>
            <v-flex xs12 sm12 md12>
                <v-card>
                    
                    <v-container fluid grid-list-md style="padding: 5px; padding-right: 10px">
                        <v-layout row wrap align-center fill-height>
                            <v-flex v-bind="leftCol">
                                <v-card-title primary class="title">
                                    <slot name="title">{{$route.meta.heading}}</slot>
                                    <v-icon
                                        v-if="$root.responsive"
                                        @click.stop="showFilter = !showFilter"
                                    >{{showFilter ? 'keyboard_arrow_up' :'keyboard_arrow_down'}}</v-icon>
                                </v-card-title>
                            </v-flex>
                            <v-flex v-bind="rightCol" v-if="showFilter || !$root.responsive">
                                <lq-list-filter
                                    v-if="tableName"
                                    :name="tableName"
                                    class="list_filter"
                                >
                                    <slot></slot>
                                </lq-list-filter>
                                <slot v-else></slot>
                            </v-flex>
                        </v-layout>
                    </v-container>
                    <v-progress-linear v-if="requesting" color="primary" indeterminate></v-progress-linear>
                </v-card>
            </v-flex>
        </v-layout>
        <v-btn
            v-if="filter"
            absolute
            fab
            round
            top
            right
            small
            color="primary"
            @click.stop="showFilterDrawer = !showFilterDrawer"
        >
            <v-icon>filter_list</v-icon>
        </v-btn>
        <v-navigation-drawer v-if="filter" app right v-model="showFilterDrawer" fixed>
            <v-toolbar flat dark color="primary">
                <v-icon>filter_list</v-icon>Filters
            </v-toolbar>
            <lq-list-filter :name="tableName">
                <v-progress-linear v-if="requesting" color="success" indeterminate style="margin: 0"></v-progress-linear>
                <v-container fluid grid-list-md>
                    <slot name="filter"></slot>
                </v-container>
                <v-footer
                    v-if="!autoFilter"
                    class="justify-center filter_footer"
                    inset
                    app
                    height="60px"
                >
                    <lq-filter-btn tag="v-btn" color="info">
                        <v-icon>filter_list</v-icon>Filter
                    </lq-filter-btn>
                </v-footer>
            </lq-list-filter>
        </v-navigation-drawer>
    </v-container>
</template>
<script>
export default {
    props: {
        leftCol: {
            type: Object,
            default: () => {
                return { md4: true, sm12: true, xs12: true };
            }
        },
        rightCol: {
            type: Object,
            default: () => {
                return { md8: true, sm12: true, xs12: true };
            }
        },
        filter: Boolean,
        tableName: String
    },
    data() {
        return {
            showFilter: true,
            showFilterDrawer: false
        };
    },
    computed: {
        autoFilter: function() {
            if (!this.filter) {
                return true;
            }
            return this.$helper.getProp(
                this.$store.state,
                ['table', this.tableName, 'settings', 'auto_filter'],
                true
            );
        },
        requesting() {
            if (!this.tableName) return false;
            return this.$helper.getProp(
                this.$store.state,
                ['table', this.tableName, 'requesting'],
                false
            );
        }
    }
};
</script>
<style>
.filter_footer {
    padding-left: 0 !important;
    padding-right: 0 !important;
}
</style>