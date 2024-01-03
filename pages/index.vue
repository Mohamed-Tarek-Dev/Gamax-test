<template>
	<div>
		<comingSoon></comingSoon>
	</div>
</template>

<script setup>
	import comingSoon from '@/pages/comingsoon/index.vue';
	const { locale } = useI18n();

	// const router = useRouter();
	// router.push('/login');

	definePageMeta({
		middleware: ['require-unauth'],
	});
</script>

<style scoped></style>
