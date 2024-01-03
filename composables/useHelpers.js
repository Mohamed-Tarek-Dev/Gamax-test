import { useLangStore } from '@/stores/lang';

export const useHelpers = () => {
	return {
		dir: () => {
			return useLangStore().current_lang === 'ar' ? 'rtl' : 'ltr';
		},

		lang: () => {
			return useLangStore().current_lang;
		},
	};
};
