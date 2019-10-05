<template>
    <v-switch
        :value="(item.status === 'active')"
        class="status-switch-btn"
        :disabled="loading"
        :loading="loading"
        :input-value="(item.status === 'active')"
        @click.stop="changeStatus(item)"
    />
</template>
<script>
export default {
    props: {
        item: {
            type: Object,
            required: true
        },
        url: String,
        listName: {
            type: String,
            default: () => 'admin_list'
        }
    },
    data() {
        return {
            loading: false
        };
    },
    methods: {
        changeStatus({ id, status }) {
            this.loading = true;
            const url = this.url ? this.url : `admin/${id}/change-status`;
            this.axios
                .post(url)
                .then(response => {
                    const { message } = response;
                    this.loading = false;
                    this.$message.success(message);
                    this.$lqTable.updateRow(this.listName, {
                        id: id,
                        status: status === 'active' ? 'inactive' : 'active'
                    });
                })
                .catch(() => (this.loading = false));
        }
    }
};
</script>