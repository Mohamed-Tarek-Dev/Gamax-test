<template>
	<Teleport to="body">
		<Transition name="fade-up">
			<div
				class="absolute left-0 top-0 z-10 flex h-screen w-screen items-center justify-center overflow-hidden bg-DarkModeBackGround/60"
				v-if="ShowRegisterMessage"
			>
				<div
					class="relative mt-12 flex w-[300px] flex-col items-center rounded-xl bg-LightModeBackGround p-4 font-montserrat text-DarkModeFrameColor shadow-lg dark:bg-DarkModeFrameColor dark:text-white sm:w-[400px] md:w-[500px]"
				>
					<div
						class="theborder absolute -top-3 left-1/2 h-[80px] w-[97%] -translate-x-1/2 rounded-full bg-SecondaryColor"
					></div>
					<img
						src="@/assets/imgs/whitelogo.png"
						loading="lazy"
						class="absolute -top-16 h-[150px] w-[150px] object-contain drop-shadow-md"
					/>
					<div
						class="absolute -top-16 left-1/2 -z-[1] h-[500px] w-[97%] -translate-x-1/2 rounded-3xl bg-SecondaryColor"
					></div>
					<p
						class="mb-12 mt-20 text-3xl font-semibold text-SecondaryColor"
					>
						Gamers Verse
					</p>
					<p class="mb-12 text-xl font-semibold">Almost Done</p>
					<p class="mb-16 text-center text-lg font-semibold">
						Please Verify Your Email address to complete your Gamers
						verse account registration
					</p>
					<NuxtLink
						class="mb-10 rounded-3xl bg-SecondaryColor px-24 py-3 text-center text-LightModeFrameColor"
						to="/login"
					>
						Verify Email
					</NuxtLink>
				</div>
			</div>
		</Transition>
	</Teleport>
	<div
		class="flex min-h-[100dvh] w-full flex-col items-center justify-center bg-LightModeFrameColor font-poppins text-DarkModeBackGround dark:bg-DarkModeFrameColor dark:text-LightModeFrameColor lg:w-[48%]"
	>
		<img
			src="@/assets/imgs/whitelogo.png"
			class="mb-10 h-[200px] w-[200px] lg:hidden"
			loading="lazy"
		/>
		<h3 class="flex items-center justify-center text-3xl font-medium">
			{{ $t('login_page.signupword') }}
		</h3>
		<h4
			class="mb-12 mt-4 flex items-center justify-center font-normal sm:text-2xl"
		>
			{{ $t('login_page.signuptitle') }}
			<span
				class="ml-1 flex items-center justify-center gap-3 text-SecondaryColor"
			>
				{{ $t('login_page.gamersverse') }}
				<img
					src="@/assets/imgs/whitelogo.png"
					class="h-[40px] w-[40px]"
					loading="lazy"
				/>
			</span>
		</h4>
		<form
			class="flex w-[90%] flex-col gap-6 lg:w-[75%]"
			@submit="SubmitForm"
		>
			<div class="flex justify-between gap-4">
				<MyInput
					id="firstname"
					:label="$t('login_page.firstnamelabel')"
					:placeholder="$t('login_page.firstnameplaceholder')"
					type="text"
					:modelValue="FirstName.Value"
					@update:modelValue="FirstName.Value = $event"
					:error="FirstName.Error"
					bg="dark:bg-DarkModeBackGround bg-LightModeBackGround"
					border="border-transparent"
					labelcolor="dark:text-LightModeFrameColor text-DarkModeBackGround"
				></MyInput>
				<MyInput
					id="lastname"
					:label="$t('login_page.lastnamelabel')"
					:placeholder="$t('login_page.lastnameplaceholder')"
					type="text"
					:modelValue="LastName.Value"
					@update:modelValue="LastName.Value = $event"
					:error="LastName.Error"
					bg="dark:bg-DarkModeBackGround bg-LightModeBackGround"
					border="border-transparent"
					labelcolor="dark:text-LightModeFrameColor text-DarkModeBackGround"
				></MyInput>
			</div>

			<div class="align-center flex items-center justify-between gap-4">
				<MyInput
					id="dateOfBirth"
					:label="$t('login_page.dateOfBirth')"
					:placeholder="$t('login_page.dateOfBirthPlaceholder')"
					type="date"
					:modelValue="dateOfBirth.Value"
					@update:modelValue="dateOfBirth.Value = $event"
					:error="dateOfBirth.Error"
					bg="dark:bg-DarkModeBackGround bg-LightModeBackGround"
					border="border-transparent"
					labelcolor="dark:text-LightModeFrameColor text-DarkModeBackGround"
				></MyInput>
				<div class="gender">
					<label for="gender">Gender</label>
					<select
						name="Gender"
						id="gender"
						class="rounded-[0.375rem] bg-[#232628] p-[1rem] text-[white]"
						v-model="gender.Value"
					>
						<option :value="null" v-if="gender.Value === null">
							Choose
						</option>
						<option :value="0">Male</option>
						<option :value="1">Female</option>
						<option :value="2">Other</option>
					</select>
					<div
						v-if="gender.Error"
						class="mt-[0.5rem] text-xs text-[#c3423f]"
					>
						{{ gender.Error }}
					</div>
				</div>
			</div>
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
			<MyInput
				id="password"
				:isPassword="true"
				:label="$t('login_page.passwordlabel')"
				:placeholder="$t('login_page.passwordplaceholder')"
				type="password"
				:modelValue="Password.Value"
				@update:modelValue="Password.Value = $event"
				:error="Password.Error"
				bg="dark:bg-DarkModeBackGround bg-LightModeBackGround"
				border="border-transparent"
				labelcolor="dark:text-LightModeFrameColor text-DarkModeBackGround"
			></MyInput>
			<MyInput
				id="confirmpassword"
				:isPassword="true"
				:label="$t('login_page.confirmpassword')"
				:placeholder="$t('login_page.confirmpassword')"
				type="password"
				:modelValue="ConfirmPassword.Value"
				@update:modelValue="ConfirmPassword.Value = $event"
				:error="ConfirmPassword.Error"
				bg="dark:bg-DarkModeBackGround bg-LightModeBackGround"
				border="border-transparent"
				labelcolor="dark:text-LightModeFrameColor text-DarkModeBackGround"
			></MyInput>
			<div class="flex flex-col">
				<div class="flex items-center gap-3">
					<input
						type="checkbox"
						id="agreeonterms"
						v-model="AgreeOnTerms.Value"
					/>
					<label for="agreeonterms">
						By Click Sign Up You Agree On Our Both
						<NuxtLink
							to="static/termsofservice"
							class="text-SecondaryColor"
						>
							terms of service
						</NuxtLink>
						and
						<NuxtLink
							to="static/privacypolicy"
							class="text-SecondaryColor"
						>
							privacy policy
						</NuxtLink>
					</label>
				</div>

				<div
					v-if="!!AgreeOnTerms.Error"
					class="text-xs text-DangerColor"
				>
					{{ AgreeOnTerms.Error }}
				</div>
			</div>

			<p
				v-if="!!RegisterMessage"
				class="flex items-center justify-center text-sm text-green-600"
			>
				{{ RegisterMessage }}
			</p>
			<p
				v-if="!!RegisterError"
				class="flex items-center justify-center text-sm text-SecondaryColor"
			>
				{{ RegisterError }}
			</p>
			<button
				:disabled="!CanSend"
				type="submit"
				class="transition-base rounded-[28px] bg-SecondaryColor px-12 py-4 text-LightModeFrameColor hover:bg-SecondaryColor/90 disabled:opacity-30"
			>
				{{ $t('login_page.signup_btn') }}
			</button>
			<div class="other__methods flex justify-center gap-5">
				<GoogleSignInButton
					@success="handleGoogleLoginSuccess"
					@error="handleGoogleLoginError"
				></GoogleSignInButton>
			</div>
		</form>
		<div class="mt-5 flex items-center justify-center gap-1 text-sm">
			{{ $t('login_page.already_have_account') }}
			<NuxtLink to="/login" class="text-SecondaryColor">{{
				$t('login_page.login_btn')
			}}</NuxtLink>
		</div>
	</div>
</template>

<script setup>
	import { useMainStore } from '@/stores/index';

	definePageMeta({
		middleware: ['require-unauth'],
		layout: 'login',
		// or middleware: 'auth'
	});

	const Store = useMainStore();

	const { locale } = useI18n();

	const Config = useRuntimeConfig();

	const CanSend = ref(true);

	const ShowRegisterMessage = ref(false);

	const Email = reactive({
		Value: null,
		Error: null,
	});

	const Password = reactive({
		Value: null,
		Error: null,
	});

	const ConfirmPassword = reactive({
		Value: null,
		Error: null,
	});

	const FirstName = reactive({
		Value: null,
		Error: null,
	});

	const LastName = reactive({
		Value: null,
		Error: null,
	});

	const dateOfBirth = reactive({
		Value: null,
		Error: null,
	});

	const gender = reactive({
		Value: null,
		Error: null,
	});

	const AgreeOnTerms = reactive({
		Value: null,
		Error: null,
	});

	const RegisterMessage = ref('');
	const RegisterError = ref('');

	const passwordRegex =
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
	const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	watch(Password, (newVal) => {
		if (!passwordRegex.test(newVal.Value)) {
			Password.Error =
				'Password Must Be At Least 8 Characters, 1 Uppercase Character, 1 Lowercase Character and 1 Special Character.';
		} else {
			Password.Error = null;
		}
	});

	watch(ConfirmPassword, (newVal) => {
		if (newVal.Value != Password.Value) {
			ConfirmPassword.Error =
				'Password Confirmation Doesnt Match The Original Password';
		} else {
			ConfirmPassword.Error = null;
		}
	});

	watch(Email, (newVal) => {
		if (!EmailRegex.test(newVal.Value)) {
			Email.Error = 'Enter Valid Email.';
		} else {
			Email.Error = null;
		}
	});

	watch(FirstName, (newVal) => {
		if (!newVal.Value) {
			FirstName.Error = 'This Field Is Required';
		} else {
			FirstName.Error = null;
		}
	});

	watch(LastName, (newVal) => {
		if (!newVal.Value) {
			LastName.Error = 'This Field Is Required';
		} else {
			LastName.Error = null;
		}
	});

	watch(dateOfBirth, (newVal) => {
		if (!newVal.Value) {
			dateOfBirth.Error = 'This Field Is Required';
		} else {
			dateOfBirth.Error = null;
		}
	});

	watch(gender, (newVal) => {
		if (!newVal.Value) {
			gender.Error = 'This Field Is Required';
		} else {
			gender.Error = null;
		}
	});

	const SubmitForm = async (e) => {
		e.preventDefault();
		if (!CanSend.value) return;
		CanSend.value = false;
		RegisterError.value = '';
		RegisterMessage.value = '';
		if (
			Password.Error ||
			ConfirmPassword.Error ||
			FirstName.Error ||
			LastName.Error ||
			Email.Error ||
			dateOfBirth.Error ||
			gender.Error ||
			!FirstName.Value ||
			!LastName.Value ||
			!dateOfBirth.Value ||
			!gender.Value ||
			!ConfirmPassword.Value ||
			!Password.Value ||
			!AgreeOnTerms.Value
		) {
			if (!FirstName.Value) {
				FirstName.Error = 'This Field Is Required';
			}
			if (!LastName.Value) {
				LastName.Error = 'This Field Is Required';
			}
			if (!dateOfBirth.Value) {
				dateOfBirth.Error = 'This Field Is Required';
			}
			if (!gender.Value) {
				gender.Error = 'This Field Is Required';
			}
			if (!Password.Value) {
				Password.Error = 'This Field Is Required';
			}
			if (!ConfirmPassword.Value) {
				ConfirmPassword.Error = 'This Field Is Required';
			}
			if (!Email.Value) {
				Email.Error = 'This Field Is Required';
			}
			if (!AgreeOnTerms.Value) {
				AgreeOnTerms.Error = 'This Field Is Requried';
			}
			CanSend.value = true;
			return;
		}

		const { data, pending, error } = await useFetch(
			`${Config.public.ApiUrl}/Auth/register`,
			{
				method: 'POST',
				body: {
					email: Email.Value,
					password: Password.Value,
					birthdate: dateOfBirth.Value,
					gender: gender.Value,
					firstName: FirstName.Value,
					lastName: LastName.Value,
				},
				credentials: 'include',
			}
		);
		CanSend.value = true;
		if (error.value) {
			RegisterError.value = error.value.data.message;
			return;
		}

		if (data.value || !error.value) {
			ShowRegisterMessage.value = true;
			RegisterMessage.value = data.value.message;
			return;
		}
	};

	// handle Google login
	const handleGoogleLoginSuccess = async (googleResponse) => {
		await Store.getGoogleLoginData(googleResponse);
		if (Store.googleUser) {
			const { data, pending, error, refresh } = await useFetch(
				`${Config.public.ApiUrl}/Auth/google-login`,
				{
					method: 'POST',
					body: {
						email: Store.googleUser.email,
						email_verified: Store.googleUser.email_verified,
						family_name: Store.googleUser.family_name,
						given_name: Store.googleUser.given_name,
						name: Store.googleUser.name,
					},
					credentials: 'include',
				}
			);
			if (error.value) {
				console.error('Error posting data:', error.value);
			}
			if (!error.value) {
				setTimeout(async () => {
					await Store.Login();
					navigateTo('/home');
				}, 400);
			}
		}
	};

	// handle Google login error
	const handleGoogleLoginError = () => {
		console.error('Login failed');
	};
</script>

<style scoped>
	.theborder {
		border-radius: 0% 0% 100% 100% / 0% 0% 70% 70%;
	}
	.fade-up-enter-active,
	.fade-up-leave-active {
		transition: all 0.5s ease;
	}

	.fade-up-enter-from,
	.fade-up-leave-to {
		opacity: 0;
		transform: translateY(-10px);
	}
</style>
