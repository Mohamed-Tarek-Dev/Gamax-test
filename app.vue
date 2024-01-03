<template>
	<div>
		<AppLoader v-show="mainStore.AppInitLoading" />
		<NuxtLayout>
			<PageLoader v-if="mainStore.pageLoading" />
			<NuxtPage :key="useHelpers().lang()" />
			<NuxtLoadingIndicator />
		</NuxtLayout>
	</div>
</template>

<script setup>
	import { useMainStore } from '@/stores/index';
	import * as listerns from '@/public/SignalRListners';

	const mainStore = useMainStore();

	const { locale } = useI18n();

	onMounted(() => {});

	useHead({
		htmlAttrs: {
			lang: locale.value,
			dir: locale.value == 'ar' ? 'rtl' : 'ltr',
		},
	});

	watch(locale, (newval) => {
		useHead({
			htmlAttrs: { lang: newval, dir: newval == 'ar' ? 'rtl' : 'ltr' },
		});
	});

	const nuxtApp = useNuxtApp();
	nuxtApp.hook('app:suspense:resolve', async () => {
		mainStore.AppInitLoading = false;
	});
</script>

<style>
	body {
		@apply bg-LightModeBackGround dark:bg-DarkModeBackGround;
	}
	* {
		transition:
			color,
			background 0.2s ease-in-out;
	}
	.layout-enter-active,
	.layout-leave-active {
		transition: all 0.4s;
	}
	.layout-enter-from,
	.layout-leave-to {
		opacity: 0;
	}
	.skeleton-circle {
		background: #232628;
		opacity: 0.7;
		animation: skeleton-circle-loading 1s linear infinite alternate;
	}
	.skeleton {
		background: #232628;
		background-image: linear-gradient(
			to right,
			#232628 0%,
			#424242 20%,
			#232628 40%,
			#232628 100%
		);
		background-repeat: no-repeat;
		animation: skeleton-loading 1.5s linear infinite alternate;
	}

	@keyframes skeleton-circle-loading {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 0.7;
		}
	}

	@keyframes skeleton-loading {
		0% {
			background-position: -468px 0;
		}
		100% {
			background-position: 468px 0;
		}
	}

	.skeleton-circle-light {
		background: #f0f2f5;
		opacity: 0.7;
		animation: skeleton-circle-loading 1s linear infinite alternate;
	}
	.skeleton-light {
		background: #f0f2f5;
		background-image: linear-gradient(
			to right,
			#f0f2f5 0%,
			#efefef 20%,
			#f0f2f5 40%,
			#f0f2f5 100%
		);
		background-repeat: no-repeat;
		animation: skeleton-loading 1.5s linear infinite alternate;
	}
</style>
