export const useLangStore = defineStore('lang', () => {
	const nuxtApp = useNuxtApp();

	const current_lang = ref(null);
	const default_lang = ref('en');

	const setCurrentLang = () => {
		current_lang.value = current_lang.value === 'en' ? 'ar' : 'en';
		return current_lang.value;
	};

	const domManipulation = (lang) => {
		// Vuetify App Direction :(
		const vApp = document.querySelector('.v-application');
		if (vApp) {
			vApp.classList.add(`v-locale--is-${lang === 'ar' ? 'rtl' : 'ltr'}`);
			vApp.classList.remove(
				`v-locale--is-${lang === 'ar' ? 'ltr' : 'rtl'}`
			);
		}

		// Vuetify Containers Direction :(
		const vContainers = document.querySelectorAll('.v-container');
		vContainers.forEach((container) => {
			container.classList.add(
				`v-locale--is-${lang === 'ar' ? 'rtl' : 'ltr'}`
			);
			container.classList.remove(
				`v-locale--is-${lang === 'ar' ? 'ltr' : 'rtl'}`
			);
		});

		// Body Direction
		const BODY = document.querySelector('body');
		BODY.classList.add(`${lang === 'ar' ? 'rtl' : 'ltr'}`);
		BODY.classList.remove(`${lang === 'ar' ? 'ltr' : 'rtl'}`);

		// Root  Attribuets
		BODY.setAttribute('dir', `${lang === 'ar' ? 'rtl' : 'ltr'}`);
		document.documentElement['lang'] = current_lang.value;
	};

	const framworksLocale = (lang) => {
		nuxtApp.$i18n.locale.value = lang;
	};

	const fillStorage = (lang) => {
		const lang_locale = useCookie('lang_locale');
		lang_locale.value = lang;
		nuxtApp.$encryptStorage.setItem('blank_App_Lang', lang);
	};

	const switchLang = () => {
		setCurrentLang(current_lang.value);
		domManipulation(current_lang.value);
		framworksLocale(current_lang.value);
		fillStorage(current_lang.value);
	};

	const handleFirstLoad = () => {
		domManipulation(current_lang.value);
		fillStorage(current_lang.value);
		framworksLocale(current_lang.value);
	};

	return { current_lang, default_lang, switchLang, handleFirstLoad };
});
