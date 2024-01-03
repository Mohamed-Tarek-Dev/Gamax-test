<template>
	<div
	class="flex min-h-[100dvh] w-full flex-col items-center justify-center bg-LightModeFrameColor font-poppins text-DarkModeBackGround dark:bg-DarkModeFrameColor dark:text-LightModeFrameColor lg:w-[48%]">
		<Teleport to="body">
			<Transition name="fade" mode="out-in">
				<div v-if="ShowVerify"
				class="absolute bottom-1 right-1 z-10 flex w-[300px] flex-col gap-4 overflow-hidden rounded-3xl bg-LightModeFrameColor p-4 font-montserrat before:absolute before:-top-[5px] before:left-0 before:h-[11px] before:w-full before:bg-SecondaryColor dark:bg-DarkModeFrameColor md:w-[500px]">
					<p class="text-lg font-semibold tracking-wide text-SecondaryColor">
						Email Verified
					</p>
					<p class="text-sm font-medium text-LightModeFrameColor">
						Thank you for activating your email, you can now login,
						enjoy your time and communicate with other users
					</p>
				</div>
			</Transition>
		</Teleport>
		<img src="@/assets/imgs/whitelogo.png" class="mb-10 h-[200px] w-[200px] lg:hidden" loading="lazy" />
		<h3 class="flex items-center justify-center text-3xl font-medium">
			{{ $t('login_page.loginword') }}
		</h3>
		<h4 class="mb-12 mt-4 flex items-center justify-center text-center font-normal sm:text-2xl">
			{{ $t('login_page.welcome') }}
			<span class="ml-1 flex items-center justify-center gap-3 text-SecondaryColor">
				{{ $t('login_page.gamersverse') }}
				<img src="@/assets/imgs/whitelogo.png" class="h-[40px] w-[40px]" loading="lazy" />
			</span>
		</h4>
		<form class="flex w-[90%] flex-col gap-6 sm:w-2/3" @submit="SubmitForm">
			<MyInput id="email" :label="$t('login_page.emaillabel')" :placeholder="$t('login_page.emailplaceholder')"
			type="text" :modelValue="Email.Value" @update:modelValue="Email.Value = $event" :error="Email.Error"
			bg="dark:bg-DarkModeBackGround bg-LightModeBackGround" border="border-transparent"
			labelcolor="dark:text-LightModeFrameColor text-DarkModeBackGround"></MyInput>
			<MyInput id="password" :isPassword="true" :label="$t('login_page.passwordlabel')"
			:placeholder="$t('login_page.passwordplaceholder')" type="password" :modelValue="Password.Value"
			@update:modelValue="Password.Value = $event" :error="Password.Error"
			bg="dark:bg-DarkModeBackGround bg-LightModeBackGround" border="border-transparent"
			labelcolor="dark:text-LightModeFrameColor text-DarkModeBackGround"></MyInput>
			<div class="flex items-center justify-end px-2 text-sm font-normal">
				<NuxtLink to="/forgetpassword" class="text-SecondaryColor">{{
					$t('login_page.lost_password')
				}}</NuxtLink>
			</div>
			<p v-if="!!LoginError" class="flex items-center justify-center text-sm capitalize text-SecondaryColor">
				{{ LoginError }}
				<span v-if="LoginError == 'Please Confirm your Email '"
				class="text-AllColorsPrimaryColor ml-1 cursor-pointer underline" @click="ResendVerifyCode">
					Resend Verification Mail
				</span>
			</p>
			<p v-if="!!LoginMessage" class="flex items-center justify-center text-sm capitalize text-green-700">
				{{ LoginMessage }}
				<span v-if="LoginMessage == 'Please Confirm your Email '"
				class="text-AllColorsPrimaryColor ml-1 cursor-pointer underline" @click="ResendVerifyCode">
					Resend Verification Mail
				</span>
			</p>
			<button :disabled="!CanLogin" type="submit"
			class="transition-base rounded-[28px] bg-SecondaryColor px-12 py-4 text-LightModeFrameColor hover:bg-SecondaryColor/90 disabled:opacity-30">
				<span>
					{{ $t('login_page.login_btn') }}
					<Icon name="svg-spinners:90-ring-with-bg" v-if="!CanLogin" />
				</span>
			</button>

			<div class="other__methods flex justify-center gap-5">
				<GoogleSignInButton @success="handleGoogleLoginSuccess" @error="handleGoogleLoginError">
				</GoogleSignInButton>
				<!-- <TwitchSignInButton></TwitchSignInButton> -->
			</div>
		</form>
		<div class="mt-5 flex items-center justify-center gap-1 text-sm">
			{{ $t('login_page.donthaveaccount') }}
			<NuxtLink to="/register" class="text-SecondaryColor">{{
				$t('login_page.signup_btn')
			}}</NuxtLink>
		</div>

		<!-- <button @click="Store.getFirstLogin">Test</button> -->
	</div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useMainStore } from '@/stores/index';
import { GoogleSignInButton } from 'vue3-google-signin';
import { useInterestsStore } from '@/stores/interests';

definePageMeta({
	middleware: ['require-unauth'],
	layout: 'login',
	// or middleware: 'auth'
});

const interestsStore = useInterestsStore();

const Config = useRuntimeConfig();

const { locale } = useI18n();

const Store = useMainStore();

const Route = useRoute();

const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LoginError = ref('');
const LoginMessage = ref('');

const CanLogin = ref(true);

const Email = reactive({
	Value: null,
	Error: null,
});

const Password = reactive({
	Value: null,
	Error: null,
});

watch(Email, (newVal) => {
	if (!EmailRegex.test(newVal.Value)) {
		Email.Error = 'Enter Valid Email.';
	} else {
		Email.Error = null;
	}
});

watch(Password, (newVal) => {
	if (!Password) {
		Password.Error = 'This Field Is Required.';
	} else {
		Password.Error = null;
	}
});

const SubmitForm = async (e) => {
	e.preventDefault();
	if (!CanLogin.value) return;
	CanLogin.value = false;
	LoginError.value = '';
	LoginMessage.value = '';
	if (!Password.Value || Password.Error || !Email.Value || Email.Error) {
		if (!Password.Value) {
			Password.Error = 'This Field Is Required.';
		}
		if (!Email.Value) {
			Email.Error = 'This Field Is Required.';
		}
		CanLogin.value = true;
		return;
	}
	const { data, pending, error, refresh } = await useFetch(
		`${Config.public.ApiUrl}/Auth/login`,
		{
			method: 'POST',
			body: {
				email: Email.Value,
				password: Password.Value,
			},
			credentials: 'include',
		}
	);

	CanLogin.value = true;
	if (error.value) {
		LoginError.value = error.value.data.message;
		console.log(error.value.data.message);
		return;
	}
	if (!error.value) {
		setTimeout(async () => {
			await Store.Login();
			navigateTo('/home');

		}, 400);
	}
};

const ResendVerifyCode = async () => {
	if (!CanLogin.value) return;
	CanLogin.value = false;
	LoginError.value = '';
	LoginMessage.value = '';
	if (!Email.Value || Email.Error) {
		if (!Password.Value) {
			Password.Error = 'This Field Is Required.';
		}
		if (!Email.Value) {
			Email.Error = 'This Field Is Required.';
		}
		CanLogin.value = true;
		return;
	}
	const { data, pending, error, refresh } = await useFetch(
		`${Config.public.ApiUrl}/Auth/ResendConfirmMail?Email=${Email.Value}`,
		{
			method: 'POST',
		}
	);

	CanLogin.value = true;
	if (error.value) {
		LoginError.value = error.value.data.message;
		return;
	}
	if (data.value) {
		LoginMessage.value = data.value;
		return;
	}
};
const ShowVerify = ref(false);
onMounted(() => {
	if (process.client) {
		if (Route.query?.verfiy) {
			ShowVerify.value = true;
			setTimeout(() => {
				ShowVerify.value = false;
			}, 10000);
		}
	}
});

// handle Google login
const handleGoogleLoginSuccess = async (googleResponse) => {
	await Store.getGoogleLoginData(googleResponse);
	if (Store.googleUser) {
		Store.googleLogin()
	}
};

// handle Google login error
const handleGoogleLoginError = () => {
	console.error('Login failed');
};

// handle Google login
// const handleTwitchLoginSuccess = async (twitchUser) => {
// 	try {
// 		// Assuming twitchUser contains a token or some identifier
// 		const user = await $fetch('/api/auth/twitch-login', {
// 			method: 'POST',
// 			body: {
// 				token: twitchUser.token,
// 			},
// 		});

// 		console.log('Twitch User', user);
// 		// Additional logic to handle the user data
// 	} catch (error) {
// 		console.error('Failed to retrieve Twitch user data:', error);
// 	}
// };

// const handleTwitchLoginError = (error) => {
// 	// Handle the error scenario
// 	console.error('Twitch login failed:', error);
// 	// Implement additional error handling logic as required
// };
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
