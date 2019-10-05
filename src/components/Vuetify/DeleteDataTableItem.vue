<template>
    <v-btn
        :disabled="deleting"
        class="v-btn--simple"
        color="danger"
        icon
        @click.prevent="deleteItem"
    >
        <v-icon>{{icon}}</v-icon>
    </v-btn>
</template>
<script>
export default {
    name: 'delete.selected',
    props: {
        url: {
            type: String,
            required: true
        },
        confirmMsg: String,
        item: {
            type: Object,
            required: true
        },
        icon: {
            type: String,
            default: () => 'delete'
        }
    },
    inject: ['lqForm', 'lqVDataTable'],
    data() {
        return {
            deleting: false
        };
    },
    methods: {
        deleteItem() {
            this.deleting = true;
            this.confirmAndAction(
                this.url + '/' + this.item[this.lqVDataTable.itemKey],
                {
                    confirmMsg: this.confirmMsg
                }
            )
                .then(() => {
                    this.deleting = false;
                    this.$lqForm.removeElement(this.lqForm.name, 'selected');
                    this.$lqTable.refresh(this.lqForm.name);
                })
                .catch(err => {
                    this.deleting = false;
                });
        }
    }
};
</script>