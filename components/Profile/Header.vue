<script setup>
	import { useMainStore } from '@/stores/index';
	import { useFriendsStore } from '@/stores/friends';
	import { storeToRefs } from 'pinia';
	const FriendsStore = useFriendsStore();

	const { CurrentUserFriends, OtherUserFriends } = storeToRefs(FriendsStore);

	const Store = useMainStore();

	const Config = useRuntimeConfig();

	const Route = useRoute();

	const Props = defineProps(['PersonData']);

	const FriendsRelation = ref(['Friends', 'PendingFriends', 'NotFriends']);

	const SendFriendRequest = async () => {
		Disabled.value = true;
		const { data, error } = await useApi(
			'Send-New-Friend-Request',
			`${Config.public.ApiUrl}/Friends/SendFriendRequest?userId=${Route.query?.id}`,
			'POST'
		);
		if (error.value) {
			Disabled.value = false;
			return;
		}
		if (data.value) {
			Store.OtherPersonalData.FriendState = 1;
		}
	};
	const RemoveFriend = async () => {
		Disabled.value = true;
		const { data, error } = await useApi(
			'Remove-Friend',
			`${Config.public.ApiUrl}/Friends/DeleteFriend?UserId=${Route.query?.id}`,
			'POST'
		);
		if (error.value) {
			Disabled.value = false;
			return;
		}
		if (data.value) {
			Store.OtherPersonalData.FriendState = 2;
			window.location.reload();
		}
	};

	const Disabled = ref(false);
</script>

<template>
	<div
		class="relative flex w-full flex-col gap-9 overflow-hidden rounded-t-[37px] bg-LightModeFrameColor pb-8 font-montserrat dark:bg-DarkModeFrameColor"
	>
		<div class="the-bg h-[101px] lg:h-[200px]">
			<img
				v-if="Store.PersonalData?.id"
				loading="lazy"
				:src="`${Config.public.CoverPictureUrl}${
					Route.query?.id || Store.PersonalData.id
				}`"
				class="max-h-full w-full object-cover"
			/>
		</div>
		<div
			class="absolute left-[70%] top-[30px] lg:left-1/2 lg:top-[50px] lg:-translate-x-1/2"
		>
			<img
				v-if="Store.PersonalData?.id"
				:src="
					`${Config.public.ProfilePictureUrl}${
						Route.query?.id || Store.PersonalData.id
					}` || Store.googleUser.picture
				"
				loading="lazy"
				class="h-[97px] w-[97px] rounded-full border-8 border-DarkModeBackGround object-cover lg:h-[170px] lg:w-[170px]"
			/>
		</div>
		<div
			to="/editprofile"
			class="transition-base text-AllColorsBlackColor absolute left-[10%] top-[40px] rounded-lg bg-Gray500 px-4 py-3 font-poppins font-semibold hover:bg-SecondaryColor hover:text-LightModeFrameColor sm:top-[80px] lg:left-[10%] lg:top-[160px] lg:px-10 lg:py-4"
			v-if="
				Route.query?.id &&
				Route.query.id != Store.PersonalData?.id &&
				!Store.OtherPersonalData?.FriendState
			"
			@click="RemoveFriend"
		>
			Remove Friend
		</div>
		<router-link
			to="/editprofile"
			class="transition-base text-AllColorsBlackColor absolute left-[10%] top-[40px] rounded-lg bg-Gray500 px-4 py-3 font-poppins font-semibold hover:bg-SecondaryColor hover:text-LightModeFrameColor sm:top-[80px] lg:left-[70%] lg:top-[160px] lg:px-10 lg:py-4"
			v-if="!Route.query?.id || Route.query?.id == Store.PersonalData?.id"
		>
			{{ $t('profile_page.EditProfile') }}</router-link
		>
		<div
			class="absolute left-[-15%] top-[80px] flex w-full justify-center gap-4 lg:left-[unset] lg:top-[170px] lg:justify-around"
		>
			<router-link
				:to="`/messages?id=${Route.query?.id}`"
				class="transition-base text-AllColorsBlackColor rounded-lg bg-Gray500 px-4 py-3 font-poppins font-semibold hover:bg-SecondaryColor hover:text-LightModeFrameColor lg:px-10 lg:py-4"
				v-if="
					Route.query?.id && Route.query.id != Store.PersonalData?.id
				"
			>
				{{ $t('profile_page.Message') }}</router-link
			>
			<button
				class="transition-base text-AllColorsBlackColor top-[80px] rounded-lg bg-Gray500 px-4 py-3 font-poppins font-semibold hover:bg-SecondaryColor hover:text-LightModeFrameColor lg:px-10 lg:py-4"
				v-if="
					Route.query?.id != Store.PersonalData?.id &&
					Store.OtherPersonalData?.FriendState == 2
				"
				@click="SendFriendRequest"
				:disabled="Disabled"
			>
				{{ $t('profile_page.SendFriendRequest') }}
			</button>
			<div
				class="text-AllColorsBlackColor rounded-lg bg-Gray500 px-4 py-3 font-poppins font-semibold lg:py-4"
				v-if="
					Route.query?.id != Store.PersonalData?.id &&
					Store.OtherPersonalData?.FriendState == 1
				"
			>
				{{ $t('profile_page.Pending') }}
			</div>
		</div>
		<div
			class="flex items-center justify-center gap-4 px-6 sm:justify-between lg:px-24"
		>
			<div
				class="hidden items-center gap-8 text-DarkModeBackGround dark:text-LightModeFrameColor sm:flex"
			>
				<div class="flex flex-col items-center">
					<p class="text-sm font-semibold lg:text-xl">
						{{
							OtherUserFriends?.length ||
							CurrentUserFriends?.length ||
							0
						}}
					</p>
					<p class="text-xs font-medium lg:text-sm">
						{{ $t('profile_page.FriendsWord') }}
					</p>
				</div>
				<div class="flex flex-col items-center">
					<p class="text-sm font-semibold lg:text-xl">60</p>
					<p class="text-xs font-medium lg:text-sm">
						{{ $t('profile_page.PostsWord') }}
					</p>
				</div>
			</div>
			<div
				class="flex flex-col items-center text-DarkModeBackGround dark:text-LightModeFrameColor"
			>
				<p
					class="text-ellipsis break-words break-all text-center text-base font-semibold lg:text-2xl"
				>
					{{
						PersonData?.firstName ||
						Store.googleUser.given_name ||
						''
					}}
					{{
						PersonData?.lastName ||
						Store.googleUser.family_name ||
						''
					}}
				</p>
				<p
					class="text-ellipsis break-words break-all text-center text-xs font-medium lg:text-sm"
				>
					@{{ PersonData?.userName || '' }}
				</p>
			</div>
			<div class="hidden items-center gap-6 lg:flex">
				<div
					class="cursor-pointer rounded-xl bg-PrimaryColor p-2 opacity-30"
				>
					<RouterLink to="/comingsoon">
						<img
							src="@/assets/imgs/lol.svg"
							class="h-[36px] w-[36px] object-contain"
							loading="lazy"
						/>
					</RouterLink>
				</div>
				<div class="cursor-pointer rounded-xl bg-PrimaryColor p-2">
					<RouterLink
						:to="`/gamestatus/valorant/${
							PersonData?.userName || ''
						}`"
					>
						<Icon name="simple-icons:valorant" size="36px" />
					</RouterLink>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
