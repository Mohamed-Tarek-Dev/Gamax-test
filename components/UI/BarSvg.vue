<script setup>
	const Props = defineProps({
		width: {
			type: Number,
			required: false,
			default: 8,
		},
		height: {
			type: Number,
			required: false,
			default: 34,
		},
		targetheight: {
			type: Number,
			required: false,
			default: 17,
		},

		primarycolor: {
			type: String,
			required: false,
			default: '#D9D9D9',
		},
		secondarycolor: {
			type: String,
			required: false,
			default: '#3C99C0',
		},
	});

	const GetY = computed(() => {
		return Props.height - Props.targetheight;
	});
</script>

<template>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		:width="width"
		:height="height"
		fill="none"
	>
		<rect :width="width" :height="height" rx="4" :fill="primarycolor" />
		<rect
			:width="width"
			:height="targetheight"
			rx="4"
			:fill="secondarycolor"
			:y="GetY"
		/>
	</svg>
</template>

<style scoped></style>
