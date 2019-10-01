<template>
	<v-flex xs12 v-if="(total === 0 || !total) && !requesting" class="no-record subheading color-red text-md-center">
		<v-card flat class="white--text pa-3" color="orange">
			No Record Found
		</v-card>
	</v-flex>
</template>
<script>
export default {
	name: "no-record-found",
	inject: ["lqForm"],
	computed: {
		total: function() {
			return this.lqForm.total;
		},
		requesting: function() {
			return this.lqForm.requesting;
		}
	}
};
</script>