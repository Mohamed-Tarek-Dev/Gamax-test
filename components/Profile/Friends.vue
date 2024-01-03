<script setup>
import { storeToRefs } from 'pinia';
import { useFriendsStore } from '@/stores/friends';
const FriendsStore = useFriendsStore();

const { CurrentUserFriends, OtherUserFriends } = storeToRefs(FriendsStore);

const Config = useRuntimeConfig();
</script>

<template>
	<div
	class="flex flex-col rounded-2xl bg-LightModeFrameColor text-DarkModeBackGround dark:bg-DarkModeFrameColor dark:text-LightModeFrameColor">
		<div class="flex items-center justify-between border-b border-Gray500 p-4">
			<h3 class="font-montserrat text-xl font-semibold text-Gray500">
				{{ $t('profile_page.FriendsWord') }}
				<span class="text-DarkModeBackGround dark:text-LightModeFrameColor">
					(
					{{ OtherUserFriends?.length || CurrentUserFriends?.length }}
					)</span>
			</h3>
			<Icon name="mdi:users" size="24px"
			class="cursor-pointer text-DarkModeBackGround dark:text-LightModeFrameColor" />
		</div>
		<template v-if="OtherUserFriends.length > 0 || CurrentUserFriends.length > 0">
			<div class="mb-5 mt-3 flex flex-col gap-4 px-4 font-montserrat text-base font-semibold"
			v-for="Friend in OtherUserFriends || CurrentUserFriends">
				<div class="flex items-center justify-between gap-4">
					<div class="flex items-center gap-3">
						<div class="relative">
							<img :src="`${Config.public.ProfilePictureUrl}${Friend.id}`" loading="lazy"
							class="h-[50px] min-h-[50px] w-[50px] min-w-[50px] rounded-full object-cover" />
							<!-- <div
							class="absolute bottom-0 right-0 h-[15px] w-[15px] rounded-full border-2 border-DarkModeFrameColor bg-green-600"
							v-if="i % 2"
						></div>
						<div
							class="absolute bottom-0 right-0 h-[15px] w-[15px] rounded-full border-2 border-DarkModeFrameColor bg-gray-600"
							v-else
						></div> -->
						</div>
						<div class="flex flex-col">
							<NuxtLink :to="`/profile?id=${Friend.id}`">
								<p class="text-base font-semibold hover:underline">
									{{ Friend.firstName }} {{ Friend.lastName }}
								</p>
							</NuxtLink>

							<!-- <p
							class="text-sm font-medium text-Gray500"
						>
							5 {{ $t('profile_page.MutualFriends') }}
						</p> -->
						</div>
					</div>
					<div
					class="bg-LightModePrimaryColorTwo cursor-pointer rounded-lg p-2 text-LightModeFrameColor dark:bg-DarkModeBackGround">
						<NuxtLink :to="`/messages?id=${Friend.id}`">
							<Icon name="bxs:chat" size="30px" />
						</NuxtLink>
					</div>
				</div>
			</div>
		</template>
		<div v-else class="my-2 text-center">
			You Have No Friends Start Add Some Now
		</div>
	</div>
</template>

<style scoped></style>
