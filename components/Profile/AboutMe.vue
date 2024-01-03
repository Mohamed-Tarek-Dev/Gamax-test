<template>
	<div
	class="flex flex-col rounded-2xl bg-LightModeFrameColor text-DarkModeBackGround dark:bg-DarkModeFrameColor dark:text-LightModeFrameColor">
		<div class="flex items-center justify-between border-b border-Gray500 px-8 py-4">
			<h3 class="cursor-pointer font-montserrat text-xl font-semibold dark:text-Gray500">
				{{ $t('profile_page.AboutMeWord') }}
			</h3>
			<Icon name="ri:edit-2-fill" size="24px" class="text-LightModeFrameColor" />
		</div>
		<p class="mt-8 px-8 font-montserrat text-sm" v-if="PersonData?.bio && PersonData?.bio != ''">
			{{ PersonData.bio }}
		</p>
		<div class="mt-3 flex flex-col gap-3 px-8 font-montserrat text-base font-semibold">
			<div class="flex items-center gap-8" v-if="PersonData?.city &&
				PersonData?.city != '' &&
				PersonData?.city != ' '
				">
				<p class="text-Gray500">
					{{ $t('profile_page.CityWord') }}
				</p>
				<p>{{ PersonData.city }}</p>
			</div>
			<div class="flex items-center gap-8" v-if="PersonData?.country &&
				PersonData?.country != '' &&
				PersonData?.country != ' '
				">
				<p class="text-Gray500">
					{{ $t('profile_page.CountryWord') }}
				</p>
				<p>{{ PersonData.country }}</p>
			</div>
			<div class="flex items-center gap-8" v-if="PersonData?.birthdate && PersonData?.birthdate != ''">
				<p class="text-Gray500">
					{{ $t('profile_page.AgeWord') }}
				</p>
				<p>{{ CalcAge(PersonData.birthdate) }}</p>
			</div>
			<div class="flex items-center gap-8" v-if="PersonData?.gender &&
				PersonData?.gender != 'Unknown' &&
				PersonData?.gender != ''
				">
				<p class="text-Gray500">
					{{ $t('profile_page.GenderWord') }}
				</p>
				<p class="capitalize">
					{{ $t(`Genders.${PersonData.gender}`) }}
				</p>
			</div>
		</div>
		<div class="mb-10 mt-8 flex flex-wrap items-center justify-center gap-2 px-2 text-LightModeFrameColor">
			<!-- <div class="cursor-pointer rounded-xl bg-PrimaryColor p-2">
				<Icon name="mdi:instagram" size="30px" />
			</div>
			<div class="cursor-pointer rounded-xl bg-PrimaryColor p-2">
				<Icon name="ic:baseline-facebook" size="30px" />
			</div>
			<div class="cursor-pointer rounded-xl bg-PrimaryColor p-2">
				<Icon name="formkit:twitter" size="30px" />
			</div>
			<div class="cursor-pointer rounded-xl bg-PrimaryColor p-2">
				<Icon name="mdi:twitch" size="30px" />
			</div>
			<div class="cursor-pointer rounded-xl bg-PrimaryColor p-2">
				<Icon name="ic:baseline-discord" size="30px" />
			</div> -->
		</div>
	</div>
</template>

<script setup>
import { useMainStore } from '@/stores/index';
const Store = useMainStore();

const Props = defineProps(['PersonData']);

const CalcAge = (birthdatestr) => {
	// Step 1: Convert birthdate string to Date object
	const birthdate = new Date(birthdatestr);

	// Step 2: Get the current date
	const currentDate = new Date();

	// Step 3: Calculate the difference between current date and birthdate
	const ageInMilliseconds = currentDate - birthdate;

	// Step 4: Calculate the age in years
	// 31536000000 is the number of milliseconds in a year (365 * 24 * 60 * 60 * 1000)
	const ageInYears = Math.floor(ageInMilliseconds / 31536000000);

	return ageInYears > 1 ? ageInYears : ' < 1 ';
};

onMounted(() => {
	console.log(
		Props.PersonData,
		Props.PersonData.country,
		Props.PersonData.city,
		Props.PersonData.birthdate,
		Props.PersonData.id
	);
});
</script>

<style scoped></style>
