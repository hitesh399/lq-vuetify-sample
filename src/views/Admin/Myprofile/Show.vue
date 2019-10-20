<template>

    <ProfileForm />
</template>
<script>
import ProfileForm from './Form';

export default {
    name: 'show-profile.page',
    components: { ProfileForm },
    data() {
        return {
            showForm: false,
            user: {}
        };
    },
    created() {
        this.axios('my-profile/show')
            .then(response => {
                const user = this.$helper.getProp(response, 'data', {});
                this.$lqForm.initializeValues('myprofile', user);
            })
            .catch(error => {
                // this.$router.push({name: 'myprofile'});
            });
       
    }
};
</script>