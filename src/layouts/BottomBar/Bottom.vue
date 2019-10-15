<template>
    <v-footer id="core-footer"  height="82" :style="{
        'margin-left': !$root.responsive ? '240px': 0
    }">
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
            <v-icon color="tertiary" size="17">favorite</v-icon> for a better web
        </span>
    </v-footer>
</template>

<script>
export default {
    data: () => ({
        links: [
            { name: 'Home', Link: '/dashboard' },
        ]
    })
};
</script>

<style>
#core-footer {
    z-index: 0;
}
</style>
