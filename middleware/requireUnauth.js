import { useMainStore } from '@/stores/index';

export default defineNuxtRouteMiddleware(async (to) => {
	// skip middleware on server
	if (process.server) return;
	const Store = useMainStore();
	const Config = useRuntimeConfig();

	if (!localStorage.getItem('PersonalData')) {
		return;
	}
	const { data, error, pending } = await useFetch(
		`${Config.public.ApiUrl}/Auth/token`,
		{
			method: 'POST',
			credentials: 'include',
		}
	);
	if (error.value) {
		Store.Logout();
		return;
	}
	if (Store.firstLogin) {
		return navigateTo('/interests');
	} else {
		return navigateTo('/home');
	}
});
