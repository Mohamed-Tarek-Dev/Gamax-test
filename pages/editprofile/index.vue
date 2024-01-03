<script setup>
	import { useMainStore } from '@/stores/index';
	import { RegionSelect, CountrySelect } from 'vue3-country-region-select';
	import { storeToRefs } from 'pinia';

	import Cropper from 'cropperjs';
	import VueDatePicker from '@vuepic/vue-datepicker';
	import '@vuepic/vue-datepicker/dist/main.css';
	const { t } = useI18n();

	const Config = useRuntimeConfig();

	const Store = useMainStore();

	const { PersonalData } = storeToRefs(Store);

	definePageMeta({
		middleware: 'require-auth',
		layout: 'edit-profile',
	});
	// Start Of Edit Pictures Section
	const ProfilePicPreview = ref();
	const ProfilePictureCropperImage = ref();
	const ProfilePictureCropper = ref();
	const CanUploadProfilePicture = ref(true);

	const CoverPicturePreview = ref();
	const CoverPictureCropperImage = ref();
	const CoverPictureCropper = ref();
	const CanUploadCoverPicture = ref(true);

	const ProfilePictureUploaded = (e) => {
		let file = e.target.files[0],
			reader = new FileReader();
		if (checkFileSize(file)) {
			reader.onloadend = function () {
				ProfilePicPreview.value = reader.result;
				ProfilePictureCropper.value = null;
				setTimeout(() => {
					ProfilePictureCropper.value = new Cropper(
						ProfilePictureCropperImage.value,
						{
							dragMode: 'move',
							restore: false,
							guides: false,
							center: true,
							highlight: false,
							cropBoxMovable: true,
							cropBoxResizable: false,
							aspectRatio: 1, // Set your desired aspect ratio or remove this line for free cropping
							viewMode: 1, // Enable the "strict" view mode, so the crop box cannot be larger than the container
							responsive: true, // Enable responsive behavior
							toggleDragModeOnDblclick: false,
							minCropBoxHeight: 170,
							minCropBoxWidth: 170,
							minCanvasHeight: 170,
							minCanvasWidth: 170,
							minContainerHeight: 170,
							minContainerWidth: 170,
						}
					);
				}, 100);
			};
			reader.readAsDataURL(file);
			e.target.value = ''; // to make sure the change event will fire again
		} else {
			alert(
				'File size exceeds the limit (8MB). Please choose a smaller file.'
			);
		}
	};

	const CoverPictureUploaded = (e) => {
		let file = e.target.files[0],
			reader = new FileReader();
		if (checkFileSize(file)) {
			reader.onloadend = function () {
				CoverPicturePreview.value = reader.result;
				CoverPictureCropper.value = null;
				setTimeout(() => {
					CoverPictureCropper.value = new Cropper(
						CoverPictureCropperImage.value,
						{
							dragMode: 'move',
							restore: false,
							guides: false,
							center: true,
							highlight: false,
							cropBoxMovable: true,
							cropBoxResizable: false,
							aspectRatio: 6, // Set your desired aspect ratio or remove this line for free cropping
							viewMode: 0, // Enable the "strict" view mode, so the crop box cannot be larger than the container
							responsive: true, // Enable responsive behavior
							toggleDragModeOnDblclick: false,
							minCropBoxHeight: 200,
							minCropBoxWidth: 1200,
						}
					);
				}, 100);
			};
			reader.readAsDataURL(file);
			e.target.value = ''; // to make sure the change event will fire again
		} else {
			alert(
				'File size exceeds the limit (8MB). Please choose a smaller file.'
			);
		}
	};

	const UploadProfilePicture = async () => {
		if (!CanUploadProfilePicture.value) return;
		CanUploadProfilePicture.value = false;
		const croppedCanvas = ProfilePictureCropper.value.getCroppedCanvas();

		// Convert the canvas to a FormData object
		const formData = new FormData();
		croppedCanvas.toBlob(async (blob) => {
			formData.append('formFile', blob, 'cropped_image.jpg'); // You can set a desired filename

			const { data, error } = await useApi(
				'Add-Profile-Picture',
				`${Config.public.ApiUrl}/Accounts/AddProfilePhoto`,
				'post',
				formData
			);
			if (data.value) {
				window.location.reload();
			}

			CanUploadProfilePicture.value = true;
		});
	};

	const UploadCoverPicture = async () => {
		if (!CanUploadCoverPicture.value) return;
		CanUploadCoverPicture.value = false;
		const croppedCanvas = CoverPictureCropper.value.getCroppedCanvas();

		const formData = new FormData();
		croppedCanvas.toBlob(async (blob) => {
			formData.append('formFile', blob, 'cropped_image.jpg'); // You can set a desired filename

			const { data, error } = await useApi(
				'Add-Cover-Picture',
				`${Config.public.ApiUrl}/Accounts/AddProfileCover`,
				'post',
				formData
			);
			if (data.value) {
				window.location.reload();
			}
			CanUploadCoverPicture.value = true;
		});
	};

	//Start Of Personal Info Section
	const Firstname = reactive({
		Value: null,
		Error: null,
	});

	const Lastname = reactive({
		Value: null,
		Error: null,
	});

	const country = ref();
	const region = ref();

	const dateofbirth = ref();
	const Gender = ref(t('Genders.SelectGender'));
	const SelectingGender = ref(false);

	const disabled = ref(false);

	const SetGender = (gender) => {
		Gender.value = gender;
		SelectingGender.value = false;
	};

	const SelectGender = () => {
		if (disabled.value) return;
		SelectingGender.value = !SelectingGender.value;
	};

	const Bio = ref('');

	watch(Firstname, (newVal) => {
		if (!newVal.Value) {
			Firstname.Error = t('Fields.Required');
		} else {
			Firstname.Error = null;
		}
	});

	watch(Lastname, (newVal) => {
		if (!newVal.Value) {
			Lastname.Error = t('Fields.Required');
		} else {
			Lastname.Error = null;
		}
	});

	const SubmitChanges = async (e) => {
		e.preventDefault();
		disabled.value = true;
		if (
			Firstname.Error ||
			Lastname.Error ||
			!Firstname.Value ||
			!Lastname.Value
		)
			return;
		const { data, error } = await useApi(
			'Update-Profile',
			`${Config.public.ApiUrl}/Accounts/UpdateProfileAcountData`,
			'post',
			{
				id: PersonalData.value.id,
				firstName: Firstname.Value,
				lastName: Lastname.Value,
				city: region.value || '',
				country: country.value || '',
				bio: Bio.value || '',
				birthdate:
					dateofbirth.value == new Date() ? '' : dateofbirth.value,
				gender:
					Gender.value == t('Genders.SelectGender')
						? ''
						: t(`Genders.${Gender.value}`),
			}
		);

		if (data.value && !error.value) {
			await Store.UpdateProfileAccountData();
		}
		disabled.value = false;
	};

	const StartFormHandling = () => {
		Firstname.Value = PersonalData.value.firstName;
		Lastname.Value = PersonalData.value.lastName;
		Firstname.Error = null;
		Lastname.Error = null;

		country.value = PersonalData.value.country;
		setTimeout(() => {
			region.value = PersonalData.value.city;
		}, 100);

		dateofbirth.value = PersonalData.value.birthdate || new Date();
		PersonalData.value.gender == '' ||
		PersonalData.value.gender == 'Unknown'
			? (Gender.value = t('Genders.SelectGender'))
			: (Gender.value = t(`Genders.${PersonalData.value.gender}`));
		Bio.value = PersonalData.value.bio;
	};

	onMounted(async () => {
		StartFormHandling();
	});
</script>

<template>
	<Teleport to="body" v-if="!!ProfilePicPreview">
		<div class="profile-pic absolute left-0 top-0 z-10 h-full w-full">
			<div
				class="fixed left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-2 rounded bg-DarkModeFrameColor p-9"
			>
				<div
					class="absolute top-2 flex w-full items-center justify-between gap-4 px-4"
				>
					<div class="flex flex-col gap-1">
						<p
							class="text-center font-montserrat text-sm font-semibold text-LightModeFrameColor"
						>
							{{ $t('editprofile_page.CropProfilePicture') }}
						</p>
					</div>
					<Icon
						name="ic:round-close"
						size="30px"
						@click="ProfilePicPreview = null"
						class="transition-base cursor-pointer text-Gray500 hover:text-SecondaryColor"
					/>
				</div>
				<div class="mt-2 w-[210px]">
					<img
						:src="ProfilePicPreview"
						class="max-w-full object-fill"
						ref="ProfilePictureCropperImage"
						loading="lazy"
					/>
				</div>
				<button
					@click="UploadProfilePicture"
					class="transition-base rounded bg-PrimaryColor px-6 py-2 text-LightModeFrameColor hover:bg-PrimaryColor/60 disabled:opacity-40"
					:disabled="!CanUploadProfilePicture"
				>
					{{ $t('editprofile_page.Confirm') }}
				</button>
			</div>
		</div>
	</Teleport>
	<Teleport to="body" v-if="!!CoverPicturePreview">
		<div class="absolute left-0 top-0 z-10 h-full w-full">
			<div
				class="fixed left-1/2 top-1/2 z-10 flex h-[90%] w-[90%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-2 overflow-hidden rounded bg-DarkModeFrameColor p-9"
			>
				<div
					class="absolute top-2 flex w-full items-center justify-between gap-4 px-4"
				>
					<div class="flex flex-col gap-1">
						<p
							class="text-center font-montserrat text-sm font-semibold text-LightModeFrameColor"
						>
							{{ $t('editprofile_page.CropProfileCover') }}
						</p>
					</div>
					<Icon
						name="ic:round-close"
						size="30px"
						@click="CoverPicturePreview = null"
						class="transition-base cursor-pointer text-Gray500 hover:text-SecondaryColor"
					/>
				</div>
				<div class="mt-2 h-[95%] w-full xl:w-[1200px]">
					<img
						:src="CoverPicturePreview"
						class="max-w-full object-contain"
						ref="CoverPictureCropperImage"
						loading="lazy"
					/>
				</div>
				<button
					@click="UploadCoverPicture"
					class="transition-base rounded bg-PrimaryColor px-6 py-2 text-LightModeFrameColor hover:bg-PrimaryColor/60 disabled:opacity-40"
					:disabled="!CanUploadCoverPicture"
				>
					{{ $t('editprofile_page.Confirm') }}
				</button>
			</div>
		</div>
	</Teleport>
	<div
		class="relative w-full flex-col overflow-hidden rounded-2xl bg-LightModeFrameColor dark:bg-DarkModeFrameColor"
	>
		<div class="cover-holder relative mb-24 h-[200px]">
			<label
				for="cover-picture-input"
				class="transition-base absolute flex h-full w-full cursor-pointer justify-center bg-Gray500/50 pt-12 hover:bg-Gray500/60"
			>
				<Icon
					name="icon-park-outline:add-picture"
					size="40px"
					class="text-LightModeFrameColor"
				/>
			</label>
			<input
				:disabled="disabled"
				type="file"
				id="cover-picture-input"
				class="hidden"
				accept=".jpg"
				@change="CoverPictureUploaded"
			/>
			<img
				v-if="Store.PersonalData?.id"
				:src="`${Config.public.CoverPictureUrl}${Store.PersonalData.id}`"
				class="h-full w-full object-cover"
				loading="lazy"
			/>
		</div>
		<div
			class="absolute left-1/2 top-[100px] min-w-[170px] -translate-x-1/2 overflow-hidden rounded-full"
		>
			<img
				v-if="Store.PersonalData?.id"
				:src="`${Config.public.ProfilePictureUrl}${Store.PersonalData.id}`"
				class="h-[170px] w-[170px] rounded-full border-8 border-DarkModeBackGround object-cover"
				loading="lazy"
			/>
			<input
				:disabled="disabled"
				type="file"
				id="profile-picture-input"
				class="hidden"
				@change="ProfilePictureUploaded"
				accept=".jpg"
			/>
			<label
				for="profile-picture-input"
				class="transition-base absolute top-0 flex h-full w-full cursor-pointer items-center justify-center bg-Gray500/50 hover:bg-Gray500/60"
			>
				<Icon
					name="icon-park-outline:add-picture"
					size="40px"
					class="text-LightModeFrameColor"
				/>
			</label>
		</div>
		<form
			class="flex flex-col gap-8 px-3 desktop:px-36"
			@submit="SubmitChanges"
		>
			<div
				class="flex items-center justify-center gap-8 text-DarkModeBackGround dark:text-LightModeFrameColor"
			>
				<MyInput
					:disabled="disabled"
					id="first-name"
					:label="$t('login_page.firstnamelabel')"
					:placeholder="$t('login_page.firstnameplaceholder')"
					type="text"
					:modelValue="Firstname.Value"
					@update:modelValue="Firstname.Value = $event"
					:error="Firstname.Error"
					bg="dark:bg-DarkModeBackGround bg-LightModeBackGround"
					border="border-transparent"
					labelcolor="dark:text-LightModeFrameColor text-DarkModeBackGround"
				></MyInput>
				<MyInput
					:disabled="disabled"
					id="last-name"
					:label="$t('login_page.lastnamelabel')"
					:placeholder="$t('login_page.lastnameplaceholder')"
					type="text"
					:modelValue="Lastname.Value"
					@update:modelValue="Lastname.Value = $event"
					:error="Lastname.Error"
					bg="dark:bg-DarkModeBackGround bg-LightModeBackGround"
					border="border-transparent"
					labelcolor="dark:text-LightModeFrameColor text-DarkModeBackGround"
				></MyInput>
			</div>
			<div
				class="flex items-center justify-center gap-8 text-DarkModeBackGround dark:text-LightModeFrameColor"
			>
				<div class="flex w-1/2 flex-col gap-4">
					<p>{{ $t('editprofile_page.CurrentLocation') }}</p>
					<country-select
						:disabled="disabled"
						:countryName="true"
						:usei18n="false"
						v-model="country"
						:country="country"
						topCountry="EG"
						class="w-full rounded-md bg-LightModeBackGround p-4 px-4 focus:outline-none disabled:opacity-30 dark:bg-DarkModeBackGround"
					/>
				</div>
				<div class="flex w-1/2 flex-col gap-4">
					<p>{{ $t('editprofile_page.City') }}</p>
					<region-select
						:disabled="disabled"
						:countryName="true"
						:regionName="true"
						:usei18n="false"
						v-model="region"
						:country="country"
						:region="region"
						class="w-full rounded-md bg-LightModeBackGround p-4 px-4 focus:outline-none disabled:opacity-30 dark:bg-DarkModeBackGround"
					/>
				</div>
			</div>
			<div
				class="flex justify-center gap-8"
				:class="{
					'items-start': SelectingGender,
					'items-center': !SelectingGender,
				}"
			>
				<div class="flex w-1/2 flex-col gap-4">
					<p>{{ $t('editprofile_page.DateOfBirth') }}</p>
					<VueDatePicker
						:disabled="disabled"
						input-class-name="date-picker"
						:enable-time-picker="false"
						:dark="$colorMode.value == 'dark'"
						v-model="dateofbirth"
					></VueDatePicker>
				</div>
				<div class="flex w-1/2 flex-col gap-4">
					<p>{{ $t('Genders.SelectGender') }}</p>
					<div
						class="relative flex flex-col rounded-md bg-LightModeBackGround p-4 text-DarkModeBackGround dark:bg-DarkModeBackGround dark:text-LightModeFrameColor"
					>
						<div
							class="flex cursor-pointer items-center justify-between gap-2"
							:class="{
								'mb-2': SelectingGender,
								'cursor-auto opacity-30': disabled,
							}"
							@click="SelectGender"
						>
							<p class="capitalize">{{ Gender }}</p>
							<Icon
								name="ep:arrow-down-bold"
								class="transition-base"
								:class="{ 'rotate-180': SelectingGender }"
							/>
						</div>
						<div
							class="absolute -bottom-12 left-0 w-full overflow-hidden rounded-md bg-LightModeBackGround dark:bg-DarkModeBackGround"
							v-if="SelectingGender"
							v-click-outside="
								() => {
									SelectingGender = false;
								}
							"
						>
							<div
								class="transition-base hover:bg-LightModePrimaryColor dark:hover:bg-GrayLight flex cursor-pointer items-center justify-center gap-2 border-b p-4"
								@click="SetGender($t('Genders.Male'))"
								v-if="SelectingGender"
							>
								<p>{{ $t('Genders.Male') }}</p>
								<Icon
									name="mingcute:check-2-fill"
									v-if="Gender == $t('Genders.Male')"
								/>
							</div>
							<div
								class="transition-base hover:bg-LightModePrimaryColor dark:hover:bg-GrayLight flex cursor-pointer items-center justify-center gap-2 border-t p-4"
								@click="SetGender($t('Genders.Female'))"
								v-if="SelectingGender"
							>
								<p>{{ $t('Genders.Female') }}</p>
								<Icon
									name="mingcute:check-2-fill"
									v-if="Gender == $t('Genders.Female')"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="flex flex-col gap-4">
				<p>{{ $t('profile_page.BioWord') }}</p>
				<MyTextArea
					:disabled="disabled"
					:placeholder="$t('editprofile_page.BioPlaceHolder')"
					:model-value="Bio"
					@update:model-value="Bio = $event"
					bg="dark:bg-DarkModeBackGround bg-LightModeBackGround"
					textColor="dark:text-LightModeFrameColor text-DarkModeBackGround"
					minHeight="min-h-[100px]"
					class="rounded-md p-4"
				/>
			</div>
			<div
				class="flex items-center justify-center gap-6 pb-4 font-poppins text-base font-semibold"
			>
				<button
					:disabled="disabled"
					@click="StartFormHandling"
					class="rounded-lg bg-LightModeBackGround px-8 py-4 text-LightModeTextColor disabled:opacity-30 dark:bg-LightModeFrameColor"
				>
					{{ $t('editprofile_page.Cancel') }}
				</button>
				<button
					:disabled="disabled"
					type="submit"
					class="rounded-lg bg-SecondaryColor px-8 py-4 text-LightModeFrameColor disabled:opacity-30"
				>
					{{ $t('editprofile_page.Submit') }}
				</button>
			</div>
		</form>
	</div>
</template>

<style scoped>
	.cover-holder::after,
	.cover-holder::before {
		content: '';
		height: 8px;
		width: calc(50% - calc(190px / 2));
		border-radius: 10px;
		@apply absolute -bottom-1 bg-SecondaryColor;
	}
	.cover-holder::before {
		@apply left-0 z-10;
	}
	.cover-holder::after {
		right: 0 !important;
	}
</style>

<style lang="scss">
	.date-picker {
		padding-block: 1rem !important;
		@apply border-0 bg-LightModeBackGround text-DarkModeBackGround dark:bg-DarkModeBackGround dark:text-LightModeFrameColor;
	}
	.date-picker:disabled {
		opacity: 0.3;
	}
</style>
