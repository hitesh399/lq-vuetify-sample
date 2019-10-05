<template>
    <div>
        <title-layout>
            <v-layout  justify-end row  align-center >
                <v-flex md2 >
                    <v-btn color="primary" dark :to="{name: 'application_menu_item.create'}">
                    Create <v-icon>add</v-icon>
                    </v-btn>
                </v-flex>
            </v-layout>
        </title-layout>

        <v-container fluid grid-list-md v-for="(menu) in menus" :key="`_${menu.id}`">
            <v-subheader>{{menu.name}}</v-subheader>
            <v-card>
                <v-container fluid grid-list-md>
                    <MenuItem :menu-id="menu.id" />
                </v-container>
            </v-card>
        </v-container>
    </div>
</template>
<script>
import MenuItem from './MenuItems';

export default {
  name: 'application_menu.list.page',
  components: { MenuItem },
  data () {
    return {
      menus: [],
      active: 0,
    }
  },
  created () {
    this.$axios('application-menu?page_size=-1')
        .then(response => {
            this.menus = response.data.data
        })
  },
  methods: {
  }
}
</script>
