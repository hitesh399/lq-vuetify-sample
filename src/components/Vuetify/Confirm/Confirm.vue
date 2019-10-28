  
<template>
    <v-dialog
        @input="change"
        value="true"
        :max-width="width"
        :persistent="persistent || disabled"
        @keydown.esc="unset(false) && !disabled"
    >
        <v-toolbar v-if="Boolean(title)" dark :color="color" dense>
            <v-icon v-if="Boolean(icon)">{{ icon }}</v-icon>
            <v-toolbar-title class="white--text" v-text="title" />
        </v-toolbar>
        <v-card tile>
            <v-card-text>
                <p v-html="message" v-if="message" />
                <component
                    :is="customComponent"
                    v-bind="componentProps"
                    ref="my_component"
                    v-if="customComponent"
                ></component>
            </v-card-text>
            <v-card-actions>
                <v-spacer />
                <v-btn
                    v-if="Boolean(buttonFalseText)"
                    :color="buttonFalseColor"
                    flat
                    :disabled="disabled"
                    @click="choose(false) && !disabled"
                >{{ buttonFalseText }}</v-btn>
                <v-btn
                    v-if="Boolean(buttonTrueText)"
                    :color="buttonTrueColor"
                    flat
                    :disabled="disabled"
                    @click="choose(true)"
                    :loading="disabled"
                >{{ buttonTrueText }}</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: {
        buttonTrueText: {
            type: String,
            default: 'Yes'
        },
        buttonFalseText: {
            type: String,
            default: 'No'
        },
        buttonTrueColor: {
            type: String,
            default: 'primary'
        },
        customComponent: Object,
        callback: Function,
        buttonFalseColor: {
            type: String,
            default: 'secondary'
        },
        color: {
            type: String,
            default: 'warning'
        },
        icon: {
            type: String,
            default: 'warning'
        },
        message: {
            type: String,
            required: true
        },
        persistent: Boolean,
        title: {
            type: String
        },
        width: {
            type: Number,
            default: 350
        },
        componentProps: Object
    },
    data() {
        return {
            value: false,
            disabled: false
        };
    },
    methods: {
        choose(value) {
            this.$emit('result', value);
            this.value = value;
            if (this.value && this.callback) {
                this.callback({
                    destroy: this.unset,
                    myComponent: this.$refs.my_component,
                    busy: this.busy,
                    relax: this.relax,
                });
            } else {
                this.unset();
            }
        },
        unset() {
            this.$destroy();
        },
        busy() {
            this.disabled = true;
        },
        relax() {
            this.disabled = false;
        },
        change(res) {
            this.unset();
        }
    }
};
</script>