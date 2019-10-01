<template>
    <v-btn color="info" :loading="lqForm.isSubmiting" @click.stop="lqForm.submit(data)">
        {{ lqForm.isSubmiting ? busyMessage : label }}
    </v-btn>
</template>

<script>
export default {
    name: 'lq-v-submit-btn',
    inject: ['lqForm'],
    props: {
        label: {
            type: String,
            default: () => 'Submit'
        },
        data: Object,
        busyMessage: {
            type: String,
            default: () => 'Requesting...'
        }
    }
}
</script>

<style>

</style>
