import { useLangStore } from '@/stores/lang';
export default defineNuxtRouteMiddleware(() => {
	const nuxtApp = useNuxtApp();
	const lang_store = useLangStore();

	// Retrieve the locales from the cookie
	const lang_locale = useCookie('lang_locale');

	// Set the locales if the cookie is present
	nuxtApp.$i18n.locale.value = lang_locale.value || lang_store.default_lang;
});
