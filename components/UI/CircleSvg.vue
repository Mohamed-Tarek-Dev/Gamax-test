<template>
	<canvas ref="circleCanvas"></canvas>
</template>

<script setup>
	const {
		radius,
		strokeColor,
		strokePercentage,
		remainingColor,
		strokeWidth,
	} = defineProps([
		'radius',
		'strokeColor',
		'strokePercentage',
		'remainingColor',
		'strokeWidth',
	]);

	const circleCanvas = ref(null);

	// Function to draw the circle
	const drawCircle = () => {
		if (!circleCanvas.value) return;

		const canvas = circleCanvas.value;
		const ctx = canvas.getContext('2d');
		// Calculate the diameter of the circle
		const diameter = radius * 2 + strokeWidth * 2;

		// Set the canvas width and height based on the diameter
		canvas.width = diameter;
		canvas.height = diameter;

		// Clear the canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// Calculate the center of the canvas
		const centerX = canvas.width / 2;
		const centerY = canvas.height / 2;

		// Calculate the end angle based on the stroke percentage
		const endAngle = (strokePercentage / 100) * (2 * Math.PI);

		// Draw the remaining part of the circle (without the stroke)
		if (strokePercentage < 100) {
			ctx.beginPath();
			ctx.arc(centerX, centerY, radius, endAngle, 2 * Math.PI);
			ctx.strokeStyle = remainingColor;
			ctx.lineWidth = strokeWidth;
			ctx.stroke();
		}

		// Draw the stroked part of the circle
		ctx.beginPath();
		ctx.arc(centerX, centerY, radius, 0, endAngle);
		ctx.strokeStyle = strokeColor;
		ctx.lineWidth = strokeWidth;
		ctx.stroke();
	};

	// Watch for changes in props.radius, props.strokeColor, props.strokePercentage, props.remainingColor, or props.strokeWidth
	watch(
		[radius, strokeColor, strokePercentage, remainingColor, strokeWidth],
		() => {
			drawCircle();
		}
	);

	// Resize canvas when the component is mounted
	onMounted(() => {
		const canvas = circleCanvas.value;
		canvas.width = radius * 2;
		canvas.height = radius * 2;
		drawCircle();
	});

	// Cleanup when the component is unmounted
	onUnmounted(() => {
		// Clean up resources here, if needed
	});
</script>

<style scoped>
	/* Add any additional styles for your component here */
</style>
