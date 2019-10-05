<template>
    <v-dialog
        value="true"
        persistent
        :width="options.width"
        v-bind:style="{ zIndex: options.zIndex }"
    >
        <v-card :color="options.color" dark>
            <v-card-text>
                <div v-html="message"></div>
                <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
    props: {
        message: String,
        options: {
            type: Object,
            default: () => {
                return {
                    color: 'primary',
                    width: 290,
                    zIndex: 200,
                    showProcessBar: false
                };
            }
        }
    },
    methods: {
        hide() {
            this.$destroy();
        }
    }
};
</script>