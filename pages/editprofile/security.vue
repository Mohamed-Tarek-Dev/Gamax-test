<script setup>
	import { useMainStore } from '@/stores/index';

	const Store = useMainStore();
	const Config = useRuntimeConfig();

	definePageMeta({
		middleware: 'require-auth',
		layout: 'edit-profile',
	});

	const ErrorMessage = ref();
	const SuccessMessage = ref();

	const OldPassword = reactive({
		Value: null,
		Error: null,
	});

	const NewPassword = reactive({
		Value: null,
		Error: null,
	});

	const ConfirmNewPassword = reactive({
		Value: null,
		Error: null,
	});

	const passwordRegex =
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

	watch(OldPassword, (newVal) => {
		if (!newVal) {
			OldPassword.Error = 'This Field Is Required';
		} else {
			NewPassword.Error = null;
		}
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
		if (!passwordRegex.test(newVal.Value)) {
			ConfirmNewPassword.Error =
				'Password Must Be At Least 8 Characters, 1 Uppercase Character, 1 Lowercase Character and 1 Special Character.';
		} else {
			if (ConfirmNewPassword.Value != NewPassword.Value) {
				ConfirmNewPassword.Error = 'Password Mismatch.';
			} else {
				ConfirmNewPassword.Error = null;
			}
		}
	});

	const SubmitChanges = async (e) => {
		ErrorMessage.value = null;
		SuccessMessage.value = null;
		e.preventDefault();
		if (
			ConfirmNewPassword.Error ||
			NewPassword.Error ||
			OldPassword.Error ||
			!ConfirmNewPassword.Value ||
			!NewPassword.Value ||
			!OldPassword.Value
		)
			return;

		const { data, error } = await useApi(
			'Update-Password',
			`${Config.public.ApiUrl}/Auth/UpdateUserPassword`,
			'POST',
			{
				id: Store.PersonalData.id,
				oldPassword: OldPassword.Value,
				newPassword: NewPassword.Value,
			}
		);

		if (error.value) {
			ErrorMessage.value =
				error.value.data?.message || 'Some Thing Went Wrong';
		} else {
			SuccessMessage.value = 'Password Has Been Changed.';
		}
	};
</script>

<template>
	<div
		class="relative flex w-full flex-col overflow-hidden rounded-2xl bg-LightModeFrameColor dark:bg-DarkModeFrameColor"
	>
		<form
			class="flex h-full flex-col justify-between gap-8 px-3 pb-8 pt-24 desktop:px-36"
			@submit="SubmitChanges"
		>
			<div class="flex flex-col gap-8 text-LightModeFrameColor">
				<MyInput
					id="currentpassword"
					:label="$t('editprofile_page.CurrentPasswordLabel')"
					:placeholder="
						$t('editprofile_page.CurrentPasswordPlaceHolder')
					"
					type="password"
					:is-password="true"
					:modelValue="OldPassword.Value"
					@update:modelValue="OldPassword.Value = $event"
					:error="OldPassword.Error"
					bg="dark:bg-DarkModeBackGround bg-LightModeBackGround"
					border="border-transparent"
					labelcolor="dark:text-LightModeFrameColor text-DarkModeBackGround"
				></MyInput>
				<MyInput
					id="newpassword"
					:label="$t('login_page.newpasswordlabel')"
					:placeholder="$t('login_page.newpasswordplaceholder')"
					type="password"
					:is-password="true"
					:modelValue="NewPassword.Value"
					@update:modelValue="NewPassword.Value = $event"
					:error="NewPassword.Error"
					bg="dark:bg-DarkModeBackGround bg-LightModeBackGround"
					border="border-transparent"
					labelcolor="dark:text-LightModeFrameColor text-DarkModeBackGround"
				></MyInput>
				<MyInput
					id="confirmnewpassword"
					:label="$t('login_page.cnofirmnewpasswordlabel')"
					:placeholder="$t('login_page.newpasswordplaceholder')"
					type="password"
					:is-password="true"
					:modelValue="ConfirmNewPassword.Value"
					@update:modelValue="ConfirmNewPassword.Value = $event"
					:error="ConfirmNewPassword.Error"
					bg="dark:bg-DarkModeBackGround bg-LightModeBackGround"
					border="border-transparent"
					labelcolor="dark:text-LightModeFrameColor text-DarkModeBackGround"
				></MyInput>
			</div>
			<div
				class="flex flex-wrap items-center justify-center gap-6 pb-4 font-poppins text-base font-semibold"
			>
				<p
					class="w-full text-center text-PrimaryColor"
					v-if="!!SuccessMessage"
				>
					{{ SuccessMessage }}
				</p>
				<p
					class="w-full text-center text-SecondaryColor"
					v-if="!!ErrorMessage"
				>
					{{ ErrorMessage }}
				</p>
				<button
					type="reset"
					class="rounded-lg bg-LightModeBackGround px-8 py-4 text-LightModeTextColor dark:bg-LightModeFrameColor"
				>
					{{ $t('editprofile_page.Cancel') }}
				</button>
				<button
					type="submit"
					class="rounded-lg bg-SecondaryColor px-8 py-4 text-LightModeFrameColor"
				>
					{{ $t('editprofile_page.Submit') }}
				</button>
			</div>
		</form>
	</div>
</template>

<style scoped></style>
