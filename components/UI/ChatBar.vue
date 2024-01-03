<script setup>
	import { storeToRefs } from 'pinia';
	import { useChatStore } from '@/stores/chatstore';
	import { useBreakpoints } from '@vueuse/core';

	const ChatStore = useChatStore();
	await ChatStore.GetUserChats();

	const { UserChats } = storeToRefs(ChatStore);
	const Expanded = ref(false);
	const ShowElems = ref(false);
	const SearchBarValue = ref('');
	const Config = useRuntimeConfig();

	const CurrentFriends = computed(() => {
		return UserChats.value.filter((friend) =>
			(friend.firstName + ' ' + friend.lastName)
				.toLowerCase()
				.includes(SearchBarValue.value.toLowerCase())
		);
	});

	const OnlineFriends = computed(() => {
		return UserChats.value.filter((friend) => friend.online);
	});

	const OfflineFriends = computed(() => {
		return UserChats.value.filter((friend) => !friend.online);
	});

	const Expand = () => {
		Expanded.value = true;
		ShowElems.value = true;
	};

	const UnExpand = () => {
		Expanded.value = false;
		setTimeout(() => {
			ShowElems.value = false;
		}, 250);
	};

	const SearchForFriend = () => {};
	const breakpoints = useBreakpoints({
		desktop: 1920,
	});

	const desktopAndLarger = breakpoints.greaterOrEqual('desktop'); // sm and larger
</script>

<template>
	<div
		class="transition-base fixed right-0 top-[60px] h-full overflow-hidden bg-LightModeFrameColor py-7 font-montserrat dark:bg-DarkModeFrameColor desktop:w-[320px] desktop:rounded-xl"
		@mouseover="Expand"
		@mouseleave="UnExpand"
		:class="{
			'w-[320px] max-w-[320px] rounded-xl': Expanded,
			'sm:w-[48px] lg:w-[64px] xl:w-[96px]': !Expanded,
		}"
	>
		<div
			class="right-0 top-0 flex flex-col items-center justify-between gap-6 dark:text-LightModeFrameColor"
		>
			<div
				class="flex max-h-[90%] w-full flex-col items-center gap-6 overflow-hidden overflow-y-scroll"
				v-if="!SearchBarValue"
			>
				<template v-if="OnlineFriends.length > 0">
					<div
						class="relative flex items-center gap-3 px-3"
						v-for="Friend in OnlineFriends"
					>
						<div class="relative">
							<img
								:src="`${Config.public.ProfilePictureUrl}${Friend.userId}`"
								loading="lazy"
								class="rounded-full object-cover sm:h-[30px] sm:w-[30px] lg:h-[38px] lg:w-[38px] xl:h-[49px] xl:w-[49px]"
							/>
							<div
								class="absolute bottom-0 right-0 h-[15px] w-[15px] rounded-full border-2 border-LightModeFrameColor dark:border-DarkModeFrameColor"
								:class="{
									'bg-SuccessColor': Friend.online,
									' bg-Gray500': !Friend.online,
								}"
							></div>
						</div>

						<p
							class="opacity-0 desktop:block desktop:opacity-100"
							:class="ShowElems ? 'block opacity-100' : 'hidden'"
						>
							{{ Friend.firstName }} {{ Friend.lastName }}
						</p>
						<div
							class="transition-base items-center gap-4 opacity-0 desktop:flex desktop:opacity-100"
							:class="ShowElems ? 'flex opacity-100' : 'hidden'"
						>
							<NuxtLink :to="`/profile?id=${Friend.userId}`">
								<Icon
									name="iconamoon:profile-circle-fill"
									size="24px"
								/>
							</NuxtLink>
							<NuxtLink :to="`/messages?id=${Friend.userId}`">
								<Icon name="bxs:chat" size="24px" />
							</NuxtLink>
						</div>
					</div>
				</template>
				<p
					v-else
					class="px-3 text-center text-xs font-semibold desktop:block"
					:class="{ ' block': Expanded, ' hidden': !Expanded }"
				>
					No One Appears To Be Online Right Now
				</p>
				<div
					class="my-2 flex w-full border-b border-LightModeBackGround dark:border-Gray500"
					v-if="
						(OfflineFriends.length > 0 &&
							OnlineFriends.length > 0) ||
						Expanded ||
						desktopAndLarger
					"
				></div>
				<template v-if="OfflineFriends.length > 0">
					<div
						class="relative flex items-center gap-3 px-3"
						v-for="Friend in OfflineFriends"
					>
						<div class="relative">
							<img
								:src="`${Config.public.ProfilePictureUrl}${Friend.userId}`"
								loading="lazy"
								class="rounded-full object-cover sm:h-[30px] sm:w-[30px] lg:h-[38px] lg:w-[38px] xl:h-[49px] xl:w-[49px]"
							/>
							<div
								class="absolute bottom-0 right-0 h-[15px] w-[15px] rounded-full border-2 border-LightModeFrameColor dark:border-DarkModeFrameColor"
								:class="{
									'bg-SuccessColor': Friend.online,
									' bg-Gray500': !Friend.online,
								}"
							></div>
						</div>

						<p
							class="opacity-0 desktop:block desktop:opacity-100"
							:class="ShowElems ? 'block opacity-100' : 'hidden'"
						>
							{{ Friend.firstName }} {{ Friend.lastName }}
						</p>
						<div
							class="transition-base items-center gap-4 opacity-0 desktop:flex desktop:opacity-100"
							:class="ShowElems ? 'flex opacity-100' : 'hidden'"
						>
							<NuxtLink :to="`/profile?id=${Friend.userId}`">
								<Icon
									name="iconamoon:profile-circle-fill"
									size="24px"
								/>
							</NuxtLink>
							<NuxtLink :to="`/messages?id=${Friend.userId}`">
								<Icon name="bxs:chat" size="24px" />
							</NuxtLink>
						</div>
					</div>
				</template>
			</div>
			<div
				class="flex max-h-[90%] w-full flex-col items-center gap-6 overflow-hidden overflow-y-scroll"
				v-if="SearchBarValue"
			>
				<p>test</p>
				<template v-for="Friend in CurrentFriends">
					<div class="relative flex items-center gap-3 px-3">
						<div class="relative">
							<img
								:src="`${Config.public.ProfilePictureUrl}${Friend.userId}`"
								loading="lazy"
								class="rounded-full object-cover sm:h-[30px] sm:w-[30px] lg:h-[38px] lg:w-[38px] xl:h-[49px] xl:w-[49px]"
							/>
							<div
								class="absolute bottom-0 right-0 h-[15px] w-[15px] rounded-full border-2 border-LightModeFrameColor dark:border-DarkModeFrameColor"
								:class="{
									'bg-SuccessColor': Friend.online,
									' bg-Gray500': !Friend.online,
								}"
							></div>
						</div>

						<p
							class="opacity-0 desktop:block desktop:opacity-100"
							:class="ShowElems ? 'block opacity-100' : 'hidden'"
						>
							{{ Friend.firstName }} {{ Friend.lastName }}
						</p>
						<div
							class="transition-base items-center gap-4 opacity-0 desktop:flex desktop:opacity-100"
							:class="ShowElems ? 'flex opacity-100' : 'hidden'"
						>
							<NuxtLink :to="`/profile?id=${Friend.userId}`">
								<Icon
									name="iconamoon:profile-circle-fill"
									size="24px"
								/>
							</NuxtLink>
							<NuxtLink :to="`/messages?id=${Friend.userId}`">
								<Icon name="bxs:chat" size="24px" />
							</NuxtLink>
						</div>
					</div>
				</template>
			</div>
			<div
				class="px-5 opacity-0 desktop:block desktop:opacity-100"
				:class="ShowElems ? 'block opacity-100' : 'hidden'"
			>
				<SearchBar
					placeholder="Search For Friend"
					:bgcolor="`dark:bg-DarkModeBackGround bg-LightModeBackGround`"
					:modelValue="SearchBarValue"
					@update:model-value="SearchBarValue = $event"
					@SearchFunction="SearchForFriend"
				/>
			</div>
		</div>
	</div>
</template>

<style scoped>
	/* width */
	::-webkit-scrollbar {
		width: 0px;
	}

	/* Handle */
	::-webkit-scrollbar-thumb {
		background: #888;
		border-radius: 10px;
	}

	/* Handle on hover */
	::-webkit-scrollbar-thumb:hover {
		background: #555;
	}
</style>
