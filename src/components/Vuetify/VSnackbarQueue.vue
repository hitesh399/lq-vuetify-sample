<template>
    <div>
        <v-snackbar
            v-for="(item, i) in items"
            :key="item.id"
            :value="i === 0"
            :timeout="timeout"
            :color="item.color"
            :top="top"
            :right="right"
            :absolute="absolute"
            :auto-height="autoHeight"
            :bottom="bottom"
            dark
            :left="left"
            :multi-line="multiLine"
            :vertical="vertical"
        >
            <v-icon color="white" class="mr-3">add_alert</v-icon>
            <div v-html="item.message" />
            <v-btn
                v-if="items.length > 1"
                icon
                color="white"
                flat
                @click="removeItem(item.id)"
            >Next ({{items.length - 1}} more)</v-btn>
            <v-btn icon v-else color="white" flat @click="removeItem(item.id)">
                <v-icon>close</v-icon>
            </v-btn>
        </v-snackbar>
    </div>
</template>

<script>
import { first, isEmpty } from 'underscore';

export default {
    name: 'VSnackbarQueue',
    data: () => ({
        processing: false,
        timeoutId: false
    }),
    props: {
        /**
         * Array for items to display [{id: '', color: '', message: ''}]
         */
        items: {
            type: Array,
            required: true
        },
        value: {
            required: false,
            default: false
        },
        timeout: {
            required: false,
            default: 6000
        },
        color: {
            required: false,
            default: 'error'
        },
        top: {
            required: false,
            default: true
        },
        right: {
            required: false,
            default: true
        },
        absolute: {
            required: false,
            default: false
        },
        autoHeight: {
            required: false,
            default: false
        },
        bottom: {
            required: false,
            default: false
        },
        left: {
            required: false,
            default: false
        },
        multiLine: {
            required: false,
            default: false
        },
        vertical: {
            required: false,
            default: false
        }
    },
    methods: {
        processItems() {
            const vm = this;
            vm.processing = true;

            if (!isEmpty(vm.items)) {
                const item = first(vm.items);
                return (vm.timeoutId = setTimeout(() => {
                    vm.removeItem(item.id);
                }, vm.timeout));
            }

            vm.processing = false;
        },
        removeItem(id) {
            const vm = this;
            clearTimeout(vm.timeoutId);
            vm.$emit('remove', id);

            if (vm.items.length > 0) {
                return vm.processItems();
            }
        }
    },
    watch: {
        items() {
            this.processItems();
        }
    }
};
</script>
