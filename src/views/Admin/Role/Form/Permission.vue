<template>
    <v-layout row fill-height wrap>
        <v-flex md5>
            <div class="scroller-wrapper">
                <v-container fluid grid-list-md>
                    <div v-for="(menu) in roleMenu" :key="`_${menu.id}`">
                        <div v-if="checkMenuAccess(menu)">
                            <span>{{menu.name}}</span>
                            <MenuItems
                                :active-item="activeMenu"
                                :menu-id="menu.id"
                                read-only
                                @click="changeMenu"
                                @first-item="changeMenu"
                            />
                        </div>
                    </div>
                </v-container>
            </div>
        </v-flex>
        <v-flex md7>
            <div class="scroller-wrapper">
                <v-list subheader fill-height two-line>
                    <template v-for="item in menuItems">
                        <v-list-tile :key="`${item.id}`">
                            <v-list-tile-action>
                                <lq-v-checkbox multiple id="menu_items" :value="item.id" />
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title
                                    @click.stop="switchPermission(item)"
                                >{{item.title}}</v-list-tile-title>
                                <div v-if="isDeveloper">
                                    <v-list-tile-sub-title
                                        v-for="permission in item.permissions"
                                        :key="`item${permission.id}`"
                                    >
                                        {{permission.name}}
                                        <v-icon
                                            small
                                            @click.stop="showLimitation(permission)"
                                        >settings</v-icon>
                                        <router-link
                                            :to="{name: 'permission.edit', params: {id: permission.id} }"
                                        >
                                            <v-icon small>edit</v-icon>
                                        </router-link>
                                    </v-list-tile-sub-title>
                                </div>
                            </v-list-tile-content>
                        </v-list-tile>
                    </template>
                </v-list>
            </div>
        </v-flex>
    </v-layout>
</template>
<script>
import MenuItems from '../../ApplicationMenuItem/MenuItems';

export default {
    name: 'permissions-fields',
    inject: ['lqForm'],
    components: { MenuItems },
    data() {
        return {
            selected_group: null,
            menuNestedItems: [],
            menus: [],
            permissions: [],
            menuItems: [],
            activeMenu: null
        };
    },
    computed: {
        roleMenu() {
            //roles
            return this.menus.filter(m => {
                return (
                    m.role_ids &&
                    m.role_ids.includes(parseInt(this.$route.params.id))
                );
            });
        }
    },
    created() {
        this.$axios('application-menu?page_size=-1').then(response => {
            this.menus = response.data.data;
        });
    },
    methods: {
        checkMenuAccess(menu) {
            const clients = menu.client_ids;
            let selectedClients = this.lqForm.formValues.clients;
            selectedClients = selectedClients ? selectedClients : [];
            return selectedClients.some(c => clients.includes(c.id));
        },
        showLimitation(permission) {
            this.$root.$emit('show-limitation', permission);
        },
        switchPermission(item) {
            let menu_items = this.$helper.getProp(
                this.lqForm.formValues,
                'menu_items',
                []
            );
            menu_items = menu_items ? menu_items : [];
            menu_items = menu_items.slice();
            const index = menu_items.indexOf(item.id);
            if (index !== -1) {
                menu_items.splice(index, 1);
            } else {
                menu_items.push(item.id);
            }
            this.$lqForm.setElementVal(
                this.lqForm.name,
                'menu_items',
                menu_items
            );
        },
        changeMenu(item) {
            let items = [];
            this.activeMenu = item.id;
            console.log('Here I am ', item);
            this.getMenuItem(item, items);
            this.menuItems = items;
        },
        getMenuItem(item, items) {
            // let items = [];
            items.push({
                id: item.id,
                name: item.name,
                title: item.title,
                permissions: item.permissions
            });
            if (item.children && item.children.length) {
                item.children.forEach(i => this.getMenuItem(i, items));
            }
            return items;
        }
    }
};
</script>
<style>
.scroller-wrapper {
    height: 100%;
    background: #fff;
}
</style>