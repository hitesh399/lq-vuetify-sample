<template>
    <td>
        {{sNo}}
    </td>
</template>
<script>
export default {
    name: 'serial-no',
    props: {
        index: Number
    },
    inject: ['lqForm'],
    computed: {
        sNo () {
            const page = this.lqForm.currentPage - 1
            const PageSize = this.lqForm.pageSize ? this.lqForm.pageSize : 15;
            return page*PageSize + this.index + 1;
        }
    }
}
</script>

