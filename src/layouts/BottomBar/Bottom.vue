<template>
    <v-footer id="core-footer"  height="82" absolute>
        <!-- <v-layout :style="{
        'margin-left': leftMargin
    }"> -->
            <div class="footer-items">
                <span v-for="link in links" :key="link.name">
                    <a :href="link.Link" class="tertiary--text footer-links">{{ link.name }}</a>
                </span>
            </div>
            <v-spacer />
            <span class="font-weight-light copyright">
                &copy;
                {{ (new Date()).getFullYear() }}
                <a
                    href="javascript:void(0)"
                    target="_blank"
                >A Company</a>, made with
                <v-icon color="tertiary" size="17">favorite</v-icon>for a better web
            </span>
        <!-- </v-layout> -->
    </v-footer>
</template>

<script>
export default {
    data: () => ({
        links: [{ name: 'Home', Link: '/dashboard' }]
    }),
    computed: {
        // isDrawerOpen() {
        //     const status = this.$helper.getProp(
        //         this.$store.state.app,
        //         'sidebar.opened',
        //         'yes'
        //     );
        //     return status === 'yes';
        // },
        // isMiniVariant() {
        //     const status = this.$helper.getProp(
        //         this.$store.state.app,
        //         'sidebar.miniVariant',
        //         'yes'
        //     );
        //     return status === 'yes';
        // },
        // leftMargin() {
        //     if (this.isMiniVariant) {
        //         return '60px'
        //     } else if(this.isDrawerOpen ) {
        //         return '240px'
        //     } else {
        //         return 0
        //     }
        //     // return this.isDrawerOpen && !this.isMiniVariant
        //     //     ? '240px'
        //     //     : this.isMiniVarian
        //     //     ? '100px'
        //     //     : 0;
        // }
    }
};
</script>

<style>
#core-footer {
    z-index: 0;
}
</style>
