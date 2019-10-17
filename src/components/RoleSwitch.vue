<template>
    <v-select
        v-if="roleAccessType === 'one_at_time' && roles.length > 1"
        @change="switchRole"
        :items="roles"
        :value="role.id"
        :disabled="switching"
        item-text="title"
        item-value="id"
    ></v-select>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    name: 'role-switch',
    data() {
        return {
            switching: false
        };
    },
    computed: {
        ...mapGetters(['authProfile']),
        role() {
            return this.authProfile.role;
        },
        roles() {
            return this.authProfile.roles;
        },
        roleAccessType() {
            return this.authProfile.role_access_type;
        }
    },
    methods: {
        switchRole(role_id) {
            this.switching = true;
            const processbar = this.$processbar('Switching...');
            this.$axios(`device/role/${role_id}/switch`)
                .then(response => {
                    this.switching = false;
                    processbar.hide();
                    this.$store.dispatch('profile/set', {
                        data: response.data.user
                    });
                    this.$router.replace('/');
                })
                .catch(() => {
                    this.switching = false;
                    processbar.hide();
                });
        }
    }
};
</script>