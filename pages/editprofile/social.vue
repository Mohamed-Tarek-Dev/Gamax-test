<script setup>
	const Config = useRuntimeConfig();

	definePageMeta({
		middleware: 'require-auth',
		layout: 'edit-profile',
	});
</script>

<template>
	<div
		class="dark:bg-DarkModeFrameColor bg-LightModeFrameColor relative flex min-h-[80vh] w-full flex-col items-center justify-center overflow-hidden rounded-2xl"
	>
		<div class="flex h-full items-center justify-center">
			{{ $t('ComingSoon.ComingSoonWord') }}
		</div>
	</div>
</template>

<style scoped></style>
