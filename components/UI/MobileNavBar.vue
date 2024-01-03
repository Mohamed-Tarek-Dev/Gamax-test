<script setup>
	import { storeToRefs } from 'pinia';

	import { useNotifStore } from '@/stores/notifications';
	const NotifStore = useNotifStore();
	const { ActiveNotifs, GeneralNotifs, FriendReqNotifs } =
		storeToRefs(NotifStore);

	const NotifPanelActive = ref(false);
	const FriendRequestPanelActive = ref(false);

	NotifStore.GetGeneralNotifications();
	NotifStore.GetFriendReqNotifications();
	const ToggleNotifPanel = async () => {
		FriendRequestPanelActive.value = false;
		NotifPanelActive.value = !NotifPanelActive.value;
		if (NotifPanelActive.value) {
			NotifStore.SetGeneralNotifsAsRead();
		}
	};

	const ToggleFriendRequestPanel = async () => {
		NotifPanelActive.value = false;
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

	const UnreadFriendRequNotification = computed(() => {
		let unread = false;
		FriendReqNotifs.value.forEach((notif) => {
			if (!notif.seen) {
				unread = true;
			}
		});
		return unread;
	});
</script>

<template>
	<div class="flex justify-between bg-PrimaryColor px-4 py-3 shadow-xl">
		<img
			src="@/assets/imgs/whitelogo.png"
			loading="lazy"
			class="h-[40px] w-[40px] object-contain"
		/>
		<div class="flex items-center gap-4">
			<div class="relative">
				<Icon
					name="fa-solid:user-friends"
					size="20px"
					class="transition-base cursor-pointer text-LightModeFrameColor"
					@click="ToggleFriendRequestPanel"
				/>
				<Transition name="fade">
					<Icon
						name="bxs:up-arrow"
						class="absolute left-1/2 top-full z-20 -translate-x-1/2 text-xl text-LightModeBackGround dark:text-DarkModeFrameColor"
						v-if="FriendRequestPanelActive"
					/>
				</Transition>
				<div
					class="absolute right-0 top-0 h-[10px] w-[10px] rounded-full bg-SecondaryColor"
					v-if="UnreadFriendRequNotification"
				></div>
				<Transition name="fade">
					<FriendRequestPanel
						v-if="FriendRequestPanelActive"
						v-click-outside="ToggleFriendRequestPanel"
					/>
				</Transition>
			</div>
			<div class="relative">
				<Icon
					name="clarity:notification-solid"
					size="20px"
					class="transition-base cursor-pointer text-LightModeFrameColor"
					@click="ToggleNotifPanel"
				/>
				<Transition name="fade">
					<Icon
						name="bxs:up-arrow"
						class="absolute left-1/2 top-full z-20 -translate-x-1/2 text-xl text-LightModeBackGround dark:text-DarkModeFrameColor"
						v-if="NotifPanelActive"
					/>
				</Transition>
				<div
					class="absolute right-0 top-0 h-[10px] w-[10px] rounded-full bg-SecondaryColor"
					v-if="UnreadGeneralNotification"
				></div>
				<Transition name="fade">
					<NotificationPanel
						v-if="NotifPanelActive"
						v-click-outside="ToggleNotifPanel"
					/>
				</Transition>
			</div>
		</div>
	</div>
</template>

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
