import { useLangStore } from '~/stores/lang';
import { useMainStore } from '@/stores/index';

// ========= Google Maps

export default defineNuxtPlugin((nuxtApp) => {
	// Lang
	const lang_store = useLangStore();
	lang_store.handleFirstLoad();

	nuxtApp.hook('app:mounted', async () => {
		// Handle Page Loading...
		nuxtApp.hook('page:start', () => {
			if (useMainStore().AppInitLoading) return;
			useMainStore().pageLoading = true;
		});
		nuxtApp.hook('page:finish', () => {
			useMainStore().pageLoading = false;
		});
	});
});
