<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    lazy
    transition="scale-transition"
    offset-y
    full-width
    min-width="290px">
    <template v-slot:activator="{ on }">
        <lq-v-text-field
          :id="id"
          :label="label"
          readonly
          :init-value="(multiple ? [] : null)"
          ref="textInput"
          clearable
          :custom-mask="parseDate"
          :placeholder="placeholder"
          v-on="on">
        </lq-v-text-field>
      </template>
      <v-time-picker
        v-model="date"
        :multiple="multiple"
        @change="menu=false"
        v-bind="$attrs">
        <v-spacer></v-spacer>
      </v-time-picker>
  </v-menu>
</template>

<script>
import helper from 'vuejs-object-helper';
export default {
  name: 'lq-date-picker',
  inject: ['lqForm'],
  props: {
    id: {
      type: String,
      required: true
    },
    label: String,
    format: {
      type: String,
      default: () => 'hh:mm A'
    },
    multiple: Boolean,
    placeholder: String
  },
  data: function() {
    return {
      menu: false
    }
  },
  computed: {
    date: {
      get: function() {
       return helper.getProp(this.$store.state.form,`${this.lqForm.name}.values.${this.id}`);
      },
      set: function(val) {
        this.$refs.textInput.setValueOutSide(val)
      }
    }
  },
  methods: {
    parseDate (time) {
      if (!time) return null;
      if(helper.isArray(time)) {
        return time.map( (d) => {
          return this.$moment('2019-01-01 ' + d).format(this.format);
        }).join(', ');
      }
      return this.$moment('2019-01-01 ' + time).format(this.format);
    },
  }
}
</script>

<style>
</style>