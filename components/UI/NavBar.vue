<template>
	<nav class="sticky left-0 top-0 z-10 flex w-full items-center justify-between bg-PrimaryColor font-poppins">
		<div class="fixed bottom-1 right-2 z-20 flex h-[70%] w-[300px] flex-col-reverse gap-3"
		v-if="ActiveNotifs.length > 0">
			<TransitionGroup name="notif">
				<div v-for="thenotif in ActiveNotifs" :key="notif">
					<NuxtLink :to="`/post?id=${thenotif.Notif.postId}&type=${thenotif.Notif.postsType || 0
						}`" class="transition-base flex cursor-pointer items-center gap-3 rounded-xl bg-LightModeFrameColor px-4 py-3 text-DarkModeBackGround shadow-lg hover:bg-PrimaryColor dark:bg-DarkModeFrameColor dark:text-white"
					v-if="!thenotif.Notif.isFriendRequest &&
						!thenotif.Notif.isMessage
						">
						<img :src="`${Config.public.ProfilePictureUrl}${thenotif.Notif.actionedUserId}`" loading="lazy"
						class="h-[30px] w-[30px] rounded-full object-cover" />
						<div class="flex flex-col gap-1 font-montserrat">
							<p class="text-sm font-medium">
								{{ thenotif.Notif.actionUserFirstName }}
								{{ thenotif.Notif.actionUserLastName }}
								{{
									$t('notif_page.' + thenotif.Notif.TextType)
								}}
							</p>
							<p class="text-GrayMedium text-xs font-medium dark:text-Gray500">
								Just Now
							</p>
						</div>
					</NuxtLink>
					<div v-else-if="!thenotif.Notif.isMessage &&
							thenotif.Notif.isFriendRequest
							" class="transition-base flex cursor-pointer items-center gap-3 rounded-xl bg-LightModeFrameColor px-4 py-3 text-DarkModeBackGround shadow-lg hover:bg-PrimaryColor dark:bg-DarkModeFrameColor dark:text-white">
						<img :src="`${Config.public.ProfilePictureUrl}${thenotif.Notif.id}`" loading="lazy"
						class="h-[30px] w-[30px] rounded-full object-cover" />
						<div class="flex flex-col gap-1 font-montserrat">
							<p class="text-sm font-medium">
								{{ thenotif.Notif.firstName }}
								{{ thenotif.Notif.lastName }}
								{{
									$t('notif_page.' + thenotif.Notif.TextType)
								}}
							</p>
							<p class="text-GrayMedium text-xs font-medium dark:text-Gray500">
								Just Now
							</p>
						</div>
					</div>
					<NuxtLink :to="`messages?id=${thenotif.Notif.senderId}`" v-else-if="thenotif.Notif.isMessage &&
							!thenotif.Notif.isFriendRequest
							" class="transition-base flex cursor-pointer items-center gap-3 rounded-xl bg-LightModeFrameColor px-4 py-3 text-DarkModeBackGround shadow-lg hover:bg-PrimaryColor dark:bg-DarkModeFrameColor dark:text-white">
						<img :src="`${Config.public.ProfilePictureUrl}${thenotif.Notif.senderId}`" loading="lazy"
						class="h-[30px] w-[30px] rounded-full object-cover" />
						<div class="flex flex-col gap-1 font-montserrat">
							<p class="text-sm font-medium">
								You Have New Message
							</p>
							<p class="text-GrayMedium text-xs font-medium dark:text-Gray500">
								{{ thenotif.Notif.message }}
							</p>
						</div>
					</NuxtLink>
				</div>
			</TransitionGroup>
		</div>
		<div class="w-[7%] max-w-[96px] pl-6">
			<NuxtLink to="/home">
				<img src="@/assets/imgs/whitelogo.png" loading="lazy" class="h-[60px] w-[60px] object-contain" />
			</NuxtLink>
		</div>
		<div class="ml-20 mr-12 flex flex-grow items-center justify-between">
			<div class="relative w-1/2">
				<form @submit="SearchFriends">
					<input type="text"
					class="bg-g h-[34px] w-full rounded-[20px] bg-SearchBarBg px-6 py-2 pl-14 text-lg text-Gray500 outline-none"
					:placeholder="$t('main_page.search')" v-model="SearchQuery" />
					<Icon name="iconamoon:search-light" size="20px"
					class="absolute left-4 top-1/2 -translate-y-1/2 text-Gray500" role="button" @click="SearchFriends" />
				</form>
				<Transition name="fade">
					<SearchBoxPanel :SearchResult="SearchResult" :SearchQuery="SearchQuery" v-if="!!SearchResult"
					v-click-outside="CloseSearchQuery" />
				</Transition>
			</div>

			<div class="flex items-center gap-14">
				<div class="relative">
					<Icon name="jam:messages-f" size="30px"
					class="transition-base cursor-pointer text-LightModeFrameColor hover:text-LightModeFrameColor/80"
					@click="ToggleMessagesPanel" />
					<div class="absolute right-0 top-0 h-[10px] w-[10px] rounded-full bg-SecondaryColor"
					v-if="UnreadMessageNotification"></div>
					<Transition name="fade">
						<MessagesPanel v-if="MessagesPanelActive" v-click-outside="ToggleMessagesPanel" />
					</Transition>
				</div>
				<div class="relative">
					<Icon name="fa-solid:user-friends" size="30px"
					class="transition-base cursor-pointer text-LightModeFrameColor hover:text-LightModeFrameColor/80"
					@click="ToggleFriendRequestPanel" />
					<Transition name="fade">
						<Icon name="bxs:up-arrow"
						class="absolute left-1/2 top-full z-20 -translate-x-1/2 text-xl text-LightModeBackGround dark:text-DarkModeFrameColor"
						v-if="FriendRequestPanelActive" />
					</Transition>
					<div class="absolute right-0 top-0 h-[10px] w-[10px] rounded-full bg-SecondaryColor"
					v-if="UnreadFriendRequNotification"></div>
					<Transition name="fade">
						<FriendRequestPanel v-if="FriendRequestPanelActive" v-click-outside="ToggleFriendRequestPanel" />
					</Transition>
				</div>
				<div class="relative">
					<Icon name="clarity:notification-solid" size="30px"
					class="transition-base cursor-pointer text-LightModeFrameColor hover:text-LightModeFrameColor/80"
					@click="ToggleNotifPanel" />
					<Transition name="fade">
						<Icon name="bxs:up-arrow"
						class="absolute left-1/2 top-full z-20 -translate-x-1/2 text-xl text-LightModeBackGround dark:text-DarkModeFrameColor"
						v-if="NotifPanelActive" />
					</Transition>
					<div class="absolute right-0 top-0 h-[10px] w-[10px] rounded-full bg-SecondaryColor"
					v-if="UnreadGeneralNotification"></div>
					<Transition name="fade">
						<NotificationPanel v-if="NotifPanelActive" v-click-outside="ToggleNotifPanel" />
					</Transition>
				</div>
			</div>
		</div>
		<div class="border-l-ProfilePictureBorder flex w-[7%] max-w-[96px] items-center justify-center border-l py-1">
			<NuxtLink to="/profile">
				<img :src="`${Config.public.ProfilePictureUrl}${MainStore.PersonalData.id}`"
				class="h-[40px] w-[40px] rounded-full" loading="lazy"
				v-if="MainStore.PersonalData && MainStore.PersonalData.id" />
			</NuxtLink>
		</div>
	</nav>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useMainStore } from '@/stores/index';
import { useChatStore } from '@/stores/chatstore';

import { useNotifStore } from '@/stores/notifications';

const MainStore = useMainStore();
const NotifStore = useNotifStore();
const ChatStore = useChatStore();

const Config = useRuntimeConfig();

onBeforeMount(async () => {
	await ChatStore.GetUserChats();
});

const { ActiveNotifs, GeneralNotifs, FriendReqNotifs } =
	storeToRefs(NotifStore);

const { UserChats } = storeToRefs(ChatStore);

const NotifPanelActive = ref(false);
const MessagesPanelActive = ref(false);
const FriendRequestPanelActive = ref(false);

NotifStore.GetGeneralNotifications();
NotifStore.GetFriendReqNotifications();

const ToggleNotifPanel = async () => {
	FriendRequestPanelActive.value = false;
	MessagesPanelActive.value = false;
	NotifPanelActive.value = !NotifPanelActive.value;
	if (NotifPanelActive.value) {
		NotifStore.SetGeneralNotifsAsRead();
	}
};

const ToggleMessagesPanel = async () => {
	FriendRequestPanelActive.value = false;
	NotifPanelActive.value = false;
	MessagesPanelActive.value = !MessagesPanelActive.value;
};

const ToggleFriendRequestPanel = async () => {
	NotifPanelActive.value = false;
	MessagesPanelActive.value = false;
	FriendRequestPanelActive.value = !FriendRequestPanelActive.value;
	if (FriendRequestPanelActive.value) {
		NotifStore.SetFriendReqNotifsAsRead();
	}
};

const UnreadGeneralNotification = computed(() => {
	let unread = false;
	GeneralNotifs.value.forEach((notif) => {
		if (!notif.seen) {
			unread = true;
		}
	});
	return unread;
});

const UnreadMessageNotification = computed(() => {
	let unread = false;
	UserChats.value.forEach((chat) => {
		if (!chat.read) {
			unread = true;
		}
	});
	return unread;
});

const UnreadFriendRequNotification = computed(() => {
	let unread = false;
	FriendReqNotifs.value.forEach((notif) => {
		if (!notif.seen) {
			unread = true;
		}
	});
	return unread;
});
const CannotSearch = ref(false);
const SearchQuery = ref('');
const SearchResult = ref(false);

const SearchFriends = async (e) => {
	if (SearchQuery.value.length < 2) return;
	if (CannotSearch.value) return;
	CannotSearch.value = true;
	e.preventDefault();
	const { data, error } = await useApi(
		'Search-For-Friends',
		`${Config.public.ApiUrl}/Friends/SearchAccount?searchString=${SearchQuery.value}`,
		'POST'
	);
	CannotSearch.value = false;
	if (data.value || !error.value) {
		SearchResult.value = data.value;
	}
};

watch(SearchQuery, (newval) => {
	if (!SearchResult.value || SearchResult.value.length <= 0) {
		SearchResult.value = false;
	}
});

const CloseSearchQuery = () => {
	SearchResult.value = false;
};
</script>

<style scoped>
.notif-enter-active,
.notif-leave-active {
	transition: all 0.5s ease;
}

.notif-enter-from,
.notif-leave-to {
	opacity: 0;
	transform: translateX(-10px);
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
