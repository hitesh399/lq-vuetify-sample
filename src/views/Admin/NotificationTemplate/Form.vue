<template>
    <v-layout row wrap>
        <v-flex md6 >
            <lq-v-text-field id="name" label="Name" />
        </v-flex>
        <v-flex md6 >
            <lq-v-select id="type" 
                label="Notification Type" 
                :options="typeOptions" 
                item-text="label" 
                item-value="value" 
            />
        </v-flex>
        <v-flex md12 >
            <lq-v-text-field id="subject" label="Subject" />
        </v-flex>
        <v-flex md12 v-if="type !== 'database'">
            <lq-v-text-editor id="body" 
                v-if="type === 'email'" 
                label="Body" 
            />
            <lq-v-textarea v-else id="body" label="Body" auto-grow />
        </v-flex>
        <v-flex md12 >
            <lq-v-combobox id="options.variables" label="Variables" multiple />
        </v-flex>
    </v-layout>
</template>
<script>
export default {
    name: 'notification.template.elements',
    props: {
        model: Object
    },
    data () {
        return {
            typeOptions: [
                {label: 'SMS Notification', value: 'sms'},
                {label: 'Email Notification', value: 'email'},
                {label: 'Push Notification', value: 'push_notification'},
                {label: 'Database Notification', value: 'database'},
            ]
        }
    },
    computed: {
        type () {
            if (!this.model || !this.model.type) {
                return null;
            }
            if (typeof this.model.type !== 'object') {
                return this.model.type
            } else {
                return this.$helper.getProp(this.model, 'type.value');
            }
        }
    }
}
</script>