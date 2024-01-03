import { useMainStore } from '@/stores/index';

export default defineNuxtRouteMiddleware(async (to) => {
	// skip middleware on server
	if (process.server) return;
	const Config = useRuntimeConfig();
	const Store = useMainStore();
	if (localStorage.getItem('PersonalData')) {
		const { data, error, pending } = await useFetch(
			`${Config.public.ApiUrl}/Auth/token`,
			{
				method: 'POST',
				credentials: 'include',
			}
		);
		if (!error.value) {
			Store.Login();
			return;
		}
		Store.Logout();
		return navigateTo('/login');
	}
	return navigateTo('/login');
});
