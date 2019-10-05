<template>
    <lq-v-select name="data" 
        v-if="type === 'dropdown'" 
        :label="configLabel"
        :multiple="configIsMultiple"
        v-bind="$attrs"
        id="data"
        :options="elementOptions"
    />
    
    <lq-v-textarea
        v-else-if="type === 'textarea'"
        :label="configLabel"
        auto-grow
        counter
        :rows="3"
        id="data"
        v-bind="$attrs" 
    />
    <lq-v-text-field 
        v-else
        id="data"
        :label="configLabel"
        :type="isSecureElement ? 'password': type" 
        name="data" 
        v-bind="$attrs" 
    />
</template>
<script>
export default {
    name: 'config-field',
    props: ['type'],
    inject: ['lqForm'],
    computed: {
        configLabel: function () {
            return this.$helper.getProp(this.lqForm.formValues, 'name', 'Untitled')
        },
        configIsMultiple: function () {
            return this.$helper.getProp(this.lqForm.formValues, 'options.isMultiple', false);
        },
        isSecureElement: function () {
            return this.$helper.getProp(this.lqForm.formValues, 'options.secure', false);
        },
        elementOptions: function () {
            return this.$helper.getProp(this.lqForm.formValues, 'options.values', []);
        }
    }
}
</script>

