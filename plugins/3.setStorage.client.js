import { useLangStore } from '~/stores/lang';

export default defineNuxtPlugin((nuxtApp) => {
	// Lang
	const lang_store = useLangStore();
	lang_store.current_lang =
		nuxtApp.$encryptStorage.getItem('blank_App_Lang') ||
		lang_store.default_lang;
});
