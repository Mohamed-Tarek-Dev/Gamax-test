<script setup>
	definePageMeta({
		middleware: ['require-unauth'],
		layout: 'login',
		// or middleware: 'auth'
	});

	const Config = useRuntimeConfig();
	const CanClick = ref(true);
	const Router = useRouter();

	const ForgetMessage = ref('');

	const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	const Email = reactive({
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
	const SubmitForm = async (e) => {
		e.preventDefault();
		if (!CanClick.value) return;
		CanClick.value = false;
		if (!Email.Value || Email.Error) {
			if (!Email.Value) {
				Email.Error = 'This Field Is Required.';
			}
			CanClick.value = true;
			return;
		}
		const { data, pending, error } = await useFetch(
			`${Config.public.ApiUrl}/Auth/ResetPasswordCode?Email=${Email.Value}`,
			{ method: 'POST' }
		);

		CanClick.value = true;
		if (data.value) {
			ForgetMessage.value =
				'Message Has Been Sent Successfully You Will Redirect To Login Page After 5 Secs';
			setTimeout(() => {
				Router.replace('/login');
			}, 5000);
		}
	};
</script>

<template>
	<div
		class="flex min-h-[100dvh] w-full flex-col items-center justify-center bg-LightModeFrameColor font-poppins text-DarkModeBackGround dark:bg-DarkModeFrameColor dark:text-LightModeFrameColor lg:w-[48%]"
	>
		<img
			src="@/assets/imgs/whitelogo.png"
			class="mb-10 h-[200px] w-[200px] lg:hidden"
		/>
		<h3 class="flex items-center justify-center text-3xl font-medium">
			{{ $t('login_page.passwordreset') }}
		</h3>
		<h4
			class="mb-12 mt-4 flex items-center justify-center font-normal sm:text-2xl"
		>
			{{ $t('login_page.welcome') }}
			<span
				class="ml-1 flex items-center justify-center gap-3 text-SecondaryColor"
			>
				{{ $t('login_page.gamersverse') }}
				<img
					src="@/assets/imgs/whitelogo.png"
					class="h-[19px] w-[17px]"
					loading="lazy"
				/>
			</span>
		</h4>
		<form class="flex w-[90%] flex-col gap-6 sm:w-2/3" @submit="SubmitForm">
			<MyInput
				id="email"
				:label="$t('login_page.emaillabel')"
				:placeholder="$t('login_page.emailplaceholder')"
				type="text"
				:modelValue="Email.Value"
				@update:modelValue="Email.Value = $event"
				:error="Email.Error"
				bg="dark:bg-DarkModeBackGround bg-LightModeBackGround"
				border="border-transparent"
				labelcolor="dark:text-LightModeFrameColor text-DarkModeBackGround"
			></MyInput>
			<p
				v-if="!!ForgetMessage"
				class="flex items-center justify-center text-sm capitalize text-green-700"
			>
				{{ ForgetMessage }}
			</p>
			<button
				:disabled="!CanClick"
				type="submit"
				class="transition-base rounded-[28px] bg-SecondaryColor px-12 py-4 text-LightModeFrameColor hover:bg-SecondaryColor/90"
			>
				{{ $t('login_page.reset_password') }}
			</button>
		</form>
		<div class="mt-5 flex items-center justify-center gap-1 text-sm">
			{{ $t('login_page.donthaveaccount') }}
			<NuxtLink to="/register" class="text-SecondaryColor">{{
				$t('login_page.signup_btn')
			}}</NuxtLink>
		</div>
	</div>
</template>

<style scoped></style>
