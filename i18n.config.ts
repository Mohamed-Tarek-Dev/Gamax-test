import en from './locales/en_static.js';
import ar from './locales/ar_static.js';

export default defineI18nConfig(() => ({
	legacy: false,
	locales: ['en', 'ar'],
	locale: 'en',
	strategy: 'prefix_except_default',
	defaultLocale: 'en',
	messages: {
		en,
		ar,
	},
	detectBrowserLanguage: {
		useCookie: true,
		cookieKey: 'lang_locale',
		redirectOn: 'root', // recommended
	},
}));
