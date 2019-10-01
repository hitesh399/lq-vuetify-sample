<template>
    <v-layout column>
        <v-flex xs12>
            <v-layout align-center justify-center row fill-height>
                <v-btn class="red-btn text-white" v-if="requesting || loadedTotal < total" @click="loadMore" :disabled="requesting">
                    {{requesting ? 'Loading...': 'Load More'}}
                </v-btn>
            </v-layout>
    </v-flex>
    </v-layout>
</template>
<script>
export default {
    name: 'load-more',
    inject: ['lqForm'],
    computed: {
        total: function() {
            return this.lqForm.total;
        },
        loadedTotal: function() {
            return this.lqForm.items.length;
        },
        requesting: function() {
            return this.lqForm.requesting;
        }
    },
    methods: {
        loadMore () {
            this.lqForm.next();
        }
    },
}
</script>