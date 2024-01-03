<script setup>
	definePageMeta({
		middleware: 'require-auth',
		layout: 'main',
	});
</script>

<template>
	<div
		class="dark:bg-DarkModeFrameColor bg-LightModeFrameColor dark:text-LightModeFrameColor mt-3 flex min-h-[80vh] w-full items-center justify-center rounded-xl"
	>
		<p class="text-xl font-bold">Coming Soon</p>
	</div>
</template>

<style scoped></style>
