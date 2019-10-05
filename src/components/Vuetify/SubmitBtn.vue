<template>
    <v-btn  color="success" class="mx-0 font-weight-light" :loading="lqForm.isSubmiting" @click.stop="lqForm.submit(data)">
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
