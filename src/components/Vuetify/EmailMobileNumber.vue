<template>
    <lq-v-text-field
        v-if="isEmailOrBlank"
        label="Email"
        placeholder="Enter Email"
        autocomplete="new-password"
        :autofocus="true"
        @keyup.enter="() => lqForm.submit()"
        :id="id"
        v-bind="$attrs"
    />
    <lq-v-mobile-number
        v-else
        placeholder="000000000"
        label="MOBILE"
        :autofocus="true"
        :id="id"
        @keyup.enter="() => lqForm.submit()"
        v-bind="$attrs"
    />
</template>
<script>
import EmailOrMobile from '@/mixins/email-or-mobile-input';

export default {
    name: 'email-mobile-input',
    mixins: [EmailOrMobile],
    inject: ['lqForm'],
    props: {
        id: {
            type: String,
            required: true
        }
    },
    computed: {
        isEmailOrBlank: function() {
            return this.isAEmailOrBlank(this.lqForm.name, 'email');
        }
    }
};
</script>