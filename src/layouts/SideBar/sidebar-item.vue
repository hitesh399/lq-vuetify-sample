<template>
    <component
        v-if="isContainChildren && childrenLength > 1"
        v-bind:is="rootComponent"
        :sub-group="subGroup"
        :value="matchedInCurrentRoute(item)"
        no-action
    >
        <template v-slot:activator>
            <v-tooltip nudge-right="200" min-width="120px" left :disabled="!miniVariant">
                <span>{{ item.title }}</span>
                <v-list-tile slot="activator">
                    <v-list-tile-action v-if="item.meta && item.meta.icon">
                        <i
                            aria-hidden="true"
                            class="v-icon material-icons theme--light"
                        >{{item.meta && item.meta.icon ? item.meta.icon : 'dashboard' }}</i>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-tooltip>
        </template>
        <sidebar-item
            :item="subItem"
            :mini-variant="miniVariant"
            :sub-group="true"
            :key="subItem.name || subItem.title"
            v-for="subItem in getChildren(item)"
        ></sidebar-item>
    </component>
    <component
        v-else-if="aItem && !aItem.hidden"
        v-bind:is="rootComponent"
        nudge-right="200"
        min-width="120px"
        left
        :disabled="!miniVariant"
    >
        <span>{{aItem.title}}</span>
        <v-list-tile :to="{name: aItem.name}" exact slot="activator" v-bind="$attrs">
            <v-list-tile-action v-if="!subGroup && aItem.meta && aItem.meta.icon">
                <v-icon>{{aItem.meta && aItem.meta.icon ? aItem.meta.icon : 'dashboard' }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
                {{aItem.title}}
                <span
                    v-if="aItem.meta && aItem.meta.count_key"
                >({{getCount(aItem.meta.count_key)}})</span>
            </v-list-tile-content>
        </v-list-tile>
    </component>
</template>

<script>
import { canAccess } from '../../utils';

export default {
    name: 'sidebar-item',
    props: {
        miniVariant: {
            type: Boolean,
            default: false
        },
        isNested: {
            type: Boolean,
            default: false
        },
        item: {
            type: Object,
            required: true
        },
        subGroup: {
            type: Boolean,
            default: false
        },
        checkPermission: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        totalPending() {
            return this.$helper.getProp(
                this.$store.state.table,
                'pending_list.settings.total'
            );
        },
        rootComponent: function() {
            return this.isContainChildren && this.childrenLength > 1
                ? 'v-list-group'
                : 'v-tooltip';
        },
        isContainChildren: function() {
            return this.hasChildren(this.item);
        },
        childrenLength: function() {
            return this.children.length;
        },
        children() {
            return this.getChildren(this.item);
        },
        aItem: function() {
            let childern = this.getChildren(this.item, false);
            let item = childern && childern.length ? childern[0] : this.item;
            if (!this.isValid(item)) {
                return;
            }
            return item;
        }
    },
    methods: {
        isValid(item) {
            if (!this.checkPermission) return true;
            return canAccess(this.$helper.getProp(item, 'meta.permission'));
        },
        getCount(key) {
            return this[key] ? this[key] : 0;
        },
        getChildren(item, test = true) {
            return item.children
                ? item.children.filter(
                      c => c.hidden !== true && (!test || this.isValid(c))
                  )
                : [];
        },
        hasChildren: function(route, test = true) {
            let hasChildren = route.children
                ? route.children.some(
                      r => r.hidden !== true && (!test || this.isValid(r))
                  )
                : false;
            return hasChildren;
        },
        matchedInCurrentRoute: function(item) {
            const has_child = item.children ? !!item.children.length : false;
            let matchedInChild = false;
            // console.log('item', item)
            if (has_child) {
                // console.log('Has children ')
                item.children.forEach(itemChild => {
                    // console.log('itemChild', itemChild)
                    if (this.matchedInCurrentRoute(itemChild)) {
                        matchedInChild = true;
                    }
                });
            }
            let matched = this.$route.matched.filter(r => r.name === item.name);
            return item.name
                ? matched.length > 0
                : matchedInChild
                ? true
                : false;
        }
    }
};
</script>

<style>
</style>
