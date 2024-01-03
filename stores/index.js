import { usePostStore } from './posts';
import { hubConnection } from '@/public/SignalR';

export const useMainStore = defineStore('main', {
	state: () => ({
		PersonalData: null,
		OtherPersonalData: null,
		LoggedIn: false,
		AppInitLoading: true,
		pageLoading: false,
		googleUser: null,
		firstLogin: null,
	}),
	getters: {
		GetPersonalData(state) {
			return state.PersonalData;
		},
	},
	actions: {
		async Login() {
			const Config = useRuntimeConfig();
			if (process.client && !this.LoggedIn) {
				hubConnection
					.start()
					.then(() => {
						this.LoggedIn = true;
						console.log('Connected to SignalR hub.');
					})
					.catch((err) => {
						console.error(err.toString());
					});
			}
			let ThePersonalData = JSON.parse(
				localStorage.getItem('PersonalData')
			);
			this.PersonalData = ThePersonalData || null;
			const { data, error } = await useApi(
				'GET-Account-Data',
				`${Config.public.ApiUrl}/Accounts/GetProfileAcountData`,
				'POST'
			);
			if (!error.value) {
				localStorage.setItem(
					'PersonalData',
					JSON.stringify(data.value)
				);
				this.PersonalData = data.value;
			}
		},
		async getGoogleLoginData(response) {
			try {
				const { credential } = response;
				if (credential) {
					this.googleUser = await $fetch('/api/auth/google-login', {
						method: 'POST',
						body: {
							token: credential,
						},
					});
					console.log('User', this.googleUser);
				} else {
					console.log('No credential provided');
				}
			} catch (error) {
				console.error('Error during Google login:', error);
			}
		},

		async googleLogin() {
			const Config = useRuntimeConfig();
			const { data, pending, error, refresh } = await useFetch(
				`${Config.public.ApiUrl}/Auth/google-login`,
				{
					method: 'POST',
					body: {
						email: this.googleUser.email,
						email_verified: this.googleUser.email_verified,
						family_name: this.googleUser.family_name,
						given_name: this.googleUser.given_name,
						name: this.googleUser.name,
					},
					credentials: 'include',
				}
			);
			this.firstLogin = data.value.message;
			if (error.value) {
				console.error('Error posting data:', error.value);
			}
			if (!error.value) {
				setTimeout(async () => {
					await this.Login();
					if (this.firstLogin) {
						navigateTo('/interests');
					} else {
						navigateTo('/home');
					}
				}, 400);
			}
		},

		async UpdateProfileAccountData() {
			const Config = useRuntimeConfig();
			const { data, error } = await useApi(
				'GET-Account-Data',
				`${Config.public.ApiUrl}/Accounts/GetProfileAcountData`,
				'POST'
			);
			if (!error.value) {
				localStorage.setItem(
					'PersonalData',
					JSON.stringify(data.value)
				);
				this.PersonalData = data.value;
			}
		},
		async Logout() {
			const PostStore = usePostStore();
			const Config = useRuntimeConfig();
			const { data, error, pending } = await useFetch(
				`${Config.public.ApiUrl}/Auth/revokeTokens`,
				{
					method: 'post',
					credentials: 'include',
				}
			);
			this.PersonalData = null;
			localStorage.removeItem('PersonalData');
			const Router = useRouter();
			Router.push('/login');
			PostStore.$reset();
		},

		SetOtherPersonData(data) {
			this.OtherPersonalData = data;
		},

		async InitProfilePage(id) {
			const Config = useRuntimeConfig();
			const { data, pending } = await useApi(
				'Get-Other-Profile-Data',
				`${Config.public.ApiUrl}/Accounts/GetProfileAcountData?userId=${id}`,
				'POST'
			);
			console.log(data.value, pending.value);
			if (!pending.value) {
				console.log(data.value);
				this.OtherPersonalData = data.value;
			} else {
				watch(pending, (newval) => {
					console.log(data.value, pending.value, newval);
					if (!newval) {
						if (data.value) {
							this.OtherPersonalData = data.value;
						}
					}
				});
			}
		},
	},
});
