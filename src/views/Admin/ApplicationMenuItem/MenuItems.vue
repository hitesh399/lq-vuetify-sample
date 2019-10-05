<template>
    <div>
    <VueNestable v-if="!readOnly" v-model="menuNestedItems" @change="whenChange">
        <VueNestableHandle
            slot-scope="{ item }"
            :key="`${item.id}`"
            :item="item">
            <div>
                <v-icon>menu</v-icon>
                <span class="row-in-line">
                    <span>{{ item.title }} ({{item.menu_order}})</span>
                    <router-link :to="{name: 'application_menu_item.edit', params: {id: item.id}}">
                        <v-icon small>edit</v-icon>
                    </router-link>
                    <v-icon small  @click.stop="deleteMenuItem(item)">delete</v-icon>
                </span>
            </div>
        </VueNestableHandle>
    </VueNestable>
    <div v-else>
        <v-list class="pa-0" >
            <menu-item
                :item="item"
                :active-item="activeItem"
                :mini-variant="false"
                @click="(e) => $emit('click', e)"
                v-for="item in menuNestedItems"
                :key="`${item.name ? item.name : item.title}`"
            />
        </v-list>
    </div>
    </div>
</template>
<script>
import cloneDeep from 'lodash/cloneDeep'
import MenuItem from './MenuItem'
import ParentChildren from '../../../mixins/parent-children'

export default {
    name: 'menuitems',
    mixins: [ ParentChildren ],
    components: { MenuItem },
    props: {
        menuId: {
            type: Number,
            required: true
        },
        roleId: Number,
        readOnly: Boolean,
        activeItem: Number
    },
    data () {
        return {
            menuItems: [],
            menuNestedItems: [],
        }
    },
    created () {
        this.$axios('application-menu-item?page_size=-1&application_menu_id=' + this.menuId + '&role_id' + this.roleId)
        .then((response) => {
            this.menuItems = response.data.data;
            let data = cloneDeep(this.menuItems);
            this.menuNestedItems = this.getNestedChildren(data)
            if (this.menuNestedItems[0] !== undefined) {
                this.$emit('first-item', this.menuNestedItems[0])
            }
        })
    },
    methods: {
        whenChange(value, options) {
            let items = []
            this.getPlaneObject(options.items, items)
            this.menuItems = items;
            let data = cloneDeep(this.menuItems);
            this.menuNestedItems = this.getNestedChildren(data)
            this.updateOrder()
        },
        getPlaneObject(items, data = []) {
            items.map( (item, index) => {
                let t = {...item}
                t.menu_order = index
                data.push(t)
                if (item.children && item.children.length) {
                    this.getPlaneObject(item.children, data)
                }
            })
        },
        updateOrder() {
            let data = [];
            this.menuItems.forEach(item => {
                data.push({id: item.id, menu_order: item.menu_order, parent_id: item.parent_id});
            })
            this.$axios.put('application-menu-item/re-arrange/order', {
                data
            }).then((response) => {

            })
        },
        deleteMenuItem(item) {
            this.confirmAndAction('application-menu-item/' + item.id, {})
                .then((response) => {
                    let index = null;  
                    this.menuItems.map((mi, i) => {
                        if (item.id === mi.parent_id) {
                            mi.parent_id = null;
                        }
                        if (mi.id === item.id) {
                            index = i
                        }
                        return mi;
                    })
                    if (index !==  null) {
                        this.menuItems.splice(index, 1);
                    }
                    let data = cloneDeep(this.menuItems);
                    this.menuNestedItems = this.getNestedChildren(data)
                })
        },
    }
}
</script>