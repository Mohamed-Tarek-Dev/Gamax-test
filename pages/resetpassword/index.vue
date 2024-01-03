<script setup>
	definePageMeta({
		middleware: ['require-unauth'],
		layout: 'login',
		// or middleware: 'auth'
	});
	const Config = useRuntimeConfig();

	const Router = useRouter();

	const rawQueries = useRoute().fullPath.split('?')[1];

	const t = rawQueries.split('&')[0].replace('t=', '');
	const u = rawQueries.split('&')[1].replace('u=', '');

	const CanClick = ref(true);

	const ResetMessage = ref('');

	const passwordRegex =
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

	const NewPassword = reactive({
		Value: null,
		Error: null,
	});

	const ConfirmNewPassword = reactive({
		Value: null,
		Error: null,
	});

	watch(NewPassword, (newVal) => {
		if (!passwordRegex.test(newVal.Value)) {
			NewPassword.Error =
				'Password Must Be At Least 8 Characters, 1 Uppercase Character, 1 Lowercase Character and 1 Special Character.';
		} else {
			NewPassword.Error = null;
		}
	});

	watch(ConfirmNewPassword, (newVal) => {
		if (newVal.Value != NewPassword.Value) {
			ConfirmNewPassword.Error =
				"Password Confirmation Doesn't Match The Original Password";
		} else {
			ConfirmNewPassword.Error = null;
		}
	});

	const SubmitForm = async (e) => {
		e.preventDefault();
		if (!CanClick.value) return;
		CanClick.value = false;
		if (
			!NewPassword.Value ||
			NewPassword.Error ||
			!ConfirmNewPassword.Value ||
			ConfirmNewPassword.Error
		) {
			if (!NewPassword.Value) {
				NewPassword.Error = 'This Field Is Required.';
			}

			if (!ConfirmNewPassword.Value) {
				ConfirmNewPassword.Error = 'This Field Is Required.';
			}
			CanClick.value = true;
			return;
		}
		const { data, error } = await useFetch(
			`${Config.public.ApiUrl}/Auth/UpdatePassword`,
			{
				method: 'POST',
				body: {
					email: u,
					password: NewPassword.Value,
					token: t,
				},
			}
		);

		if (data.value) {
			ResetMessage.value =
				'Password Reset Successfully You Will Redirect To Login Page After 5 Secs';
			setTimeout(() => {
				Router.replace('/login');
			}, 5000);
		}
		CanClick.value = true;
	};
</script>

<template>
	<div
		class="flex min-h-[100dvh] w-full flex-col items-center justify-center bg-LightModeFrameColor font-poppins text-DarkModeBackGround dark:bg-DarkModeFrameColor dark:text-LightModeFrameColor lg:w-[48%]"
	>
		<img
			src="@/assets/imgs/whitelogo.png"
			class="mb-10 h-[200px] w-[200px] lg:hidden"
			loading="lazy"
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
				id="password"
				:label="$t('login_page.newpasswordlabel')"
				:placeholder="$t('login_page.newpasswordplaceholder')"
				type="password"
				:modelValue="NewPassword.Value"
				@update:modelValue="NewPassword.Value = $event"
				:error="NewPassword.Error"
				:is-password="true"
				bg="dark:bg-DarkModeBackGround bg-LightModeBackGround"
				border="border-transparent"
				labelcolor="dark:text-LightModeFrameColor text-DarkModeBackGround"
			></MyInput>
			<MyInput
				id="password"
				:label="$t('login_page.cnofirmnewpasswordlabel')"
				:placeholder="$t('login_page.newpasswordplaceholder')"
				type="password"
				:modelValue="ConfirmNewPassword.Value"
				@update:modelValue="ConfirmNewPassword.Value = $event"
				:error="ConfirmNewPassword.Error"
				:is-password="true"
				bg="dark:bg-DarkModeBackGround bg-LightModeBackGround"
				border="border-transparent"
				labelcolor="dark:text-LightModeFrameColor text-DarkModeBackGround"
			></MyInput>
			<p
				v-if="!!ResetMessage"
				class="flex items-center justify-center text-sm capitalize text-green-700"
			>
				{{ ResetMessage }}
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
			Don't have an account?
			<NuxtLink to="/register" class="text-SecondaryColor"
				>Sign Up</NuxtLink
			>
		</div>
	</div>
</template>

<style scoped></style>
