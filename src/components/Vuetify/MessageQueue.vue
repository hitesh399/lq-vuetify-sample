<template>
    <v-snackbar-queue :items="items" :top="true" @remove="removeItem"></v-snackbar-queue>
</template>
<script>
import { EventBus } from 'lq-form';
import VSnackbarQueue from './VSnackbarQueue';

export default {
    components: { VSnackbarQueue },
    data: () => ({
        id: 0,
        items: [],
        colors: ['warning', 'error', 'info', 'success']
    }),
    created() {
        EventBus.$on('queue-message-show', this.addQueue);
    },
    methods: {
        addQueue({ message, color, options }) {
            this.addItem(message, color, options);
        },
        addItem(message, color, options) {
            const vm = this;
            // const index = vm.randomInt(0, 2)
            vm.id++;
            vm.items.push({
                id: vm.id,
                color: color,
                message: message,
                ...options
            });
        },
        removeItem(id) {
            const vm = this;
            let index = null;
            vm.items.every((item, i) => {
                if (item.id === id) {
                    index = i;
                    return false;
                }
                return true;
            });

            if (index !== null) {
                vm.items.splice(index, 1);
            }
        },
        randomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    },
    beforeDestroy() {
        EventBus.$off('queue-message-show', this.addQueue);
    }
};
</script>