<template>
    <div>
        <title-layout />
        <v-container>
            <v-card>
                <ProfileForm />
            </v-card>
        </v-container>
    </div>
</template>
<script>

import ProfileForm from './Form';

export default {
    name: 'admin.profile',
    components: { ProfileForm }
}
</script>