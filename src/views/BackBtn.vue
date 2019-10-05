<template>
    <div class="text-xs-right">
        <v-btn @click.stop="goBack" flat class="ma-0" color="primary">
            <v-icon>keyboard_backspace</v-icon>Back
        </v-btn>
    </div>
</template>
<script>
export default {
    name: 'back-btn',
    props: {
        to: [Object, String]
    },
    methods: {
        goBack() {
            if (window.history.length > 2) {
                this.$router.back();
            } else {
                this.$router.push(this.to);
            }
        }
    }
};
</script>