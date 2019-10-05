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
                                    <!-- <v-icon @click.stop="showFilterDrawer = !showFilterDrawer"  color="primary">filter_list</v-icon> -->
                                </v-card-title>
                            </v-flex>
                            <v-flex v-bind="rightCol" v-if="showFilter || !$root.responsive">
                                <slot></slot>
                            </v-flex>
                        </v-layout>
                    </v-container>
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
        <v-navigation-drawer v-if="filter" app right v-model="showFilterDrawer" fixed core-view>
            <v-toolbar flat dark color="primary">
                <v-icon>filter_list</v-icon>Filters
            </v-toolbar>
            <v-container fluid grid-list-md >
                <lq-list-filter :name="filter">
                    <slot name="filter"></slot>
                </lq-list-filter>
            </v-container>
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
        filter: String
    },
    data() {
        return {
            showFilter: true,
            showFilterDrawer: false
        };
    }
};
</script>
