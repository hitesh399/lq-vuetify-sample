<template>
    <div>
        <title-layout>
           <lq-list-filter name="application_menu_list" class="list_filter">
                <v-layout  justify-end row  align-center >
                <v-flex md4>
                    <lq-v-text-field
                        id="search"
                        append-icon="search"
                        placeholder="Search"
                        single-line
                        hide-details 
                    />
                </v-flex>
                <v-flex md2 >
                    <v-btn color="primary" dark :to="{name: 'application_menu.create'}">
                    Create <v-icon>add</v-icon>
                    </v-btn>
                </v-flex>
                </v-layout>
            </lq-list-filter>
        </title-layout>
        <v-container fluid grid-list-md>
            <v-layout>
                <v-flex sm12>
                    <lq-v-data-table
                        table-name="application_menu_list"
                        action="application-menu"
                        :headers="headers">
                        <template v-slot:items="{index, item}">
                            <tr>
                            <v-serial-no :index="index" />
                            <td>{{item.name}}</td>
                            <td>{{getClientName(item.clients)}}</td>
                            <td>{{getRoleName(item.roles)}}</td>
                            <td align="right">
                                <v-btn :to="{name: 'application_menu.edit', params: {id: item.id}}" class="mx-2" fab dark small color="teal">
                                    <v-icon dark>edit</v-icon>
                                </v-btn>
                                <lq-v-delete-data-table-item :item="item" url="application-menu" />
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
  name: 'application_menu.list.page',
  data () {
    return {
      headers: [
        { text: '#', value: 'sn', sortable: false, align: 'left' },
        { text: 'Application Menu', value: 'application_menus.name', sortable: false, align: 'left' },
        { text: 'For Applications', value: 'application_menus.clients', sortable: false, align: 'left' },
        { text: 'For Role', value: 'application_menus.roles', sortable: false, align: 'left' },
        { text: 'Action', value: 'application_menus.action', align: 'right' },
      ]
    }
  },
  methods: {
      getRoleName (roles) {
          return roles.map(r => r.title ? r.title : r.name).join(', ')
      },
      getClientName (clients) {
          return clients.map(c => c.name).join(', ')
      }
  }
}
</script>