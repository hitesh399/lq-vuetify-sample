<template>
    <component v-if="isContainChildren && childrenLength > 1"
        v-bind:is="rootComponent"
        :sub-group="subGroup"
        no-action>
        <template v-slot:activator>
            <v-list-tile>
                <v-list-tile-content>
                    <v-list-tile-title>
                        {{ item.title }}
                    </v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </template>
        <menu-item 
            :item="subItem" 
            :mini-variant="false"
            :sub-group="true"
            @click="clickEmit(subItem)"
            :key="subItem.name || subItem.title" 
            v-for="subItem in item.children">
        </menu-item>
    </component>
    <component 
      slot="activator" 
      v-else-if="aItem.show_in_menu === 'Yes'" 
      v-bind:is="rootComponent" 
      :class="{active: activeItem === item.id}"
      nudge-right="200" min-width="120px" left>        
        <v-list-tile-content
            @click="clickEmit(aItem)"
            exact>
            {{aItem.title}} 
        </v-list-tile-content>        
    </component>
</template>
<script>
export default {
  name: 'menu-item',
  props: {
    item: Object,
    subGroup: {
        type: Boolean,
        default: false
    },
    activeItem: Number
  },
  computed: {
    rootComponent: function() {
        return this.isContainChildren && this.childrenLength > 1 ? 'v-list-group' : 'v-list-tile';
    },
    childrenLength: function () {
        return this.children.length;
    },
    isContainChildren: function () {
        return this.hasChildren(this.item);
    },  
    children: function(){
      return this.item.children ? this.item.children.filter( c => c.show_in_menu === 'Yes') : [];
    },
    aItem: function () {
      return this.item;
    }
  },
  methods: {
    hasChildren: function(route) {
        let hasChildren = route.children ? route.children.some(r => r.show_in_menu === 'Yes') : false;
        return hasChildren;
    },
    clickEmit(item) {
      this.$emit('click', item)
    }
  }
}
</script>
<style  scoped>
  .active {
      background: #f3f3f3;
  }
  .v-list__tile {
      cursor: pointer;
  }
</style>