<script setup>
	import { storeToRefs } from 'pinia';
	import { useNotifStore } from '@/stores/notifications';
	import { useChatStore } from '@/stores/chatstore';

	const Config = useRuntimeConfig();
	const NotifStore = useNotifStore();
	const ChatStore = useChatStore();
	const { FriendReqNotifs } = storeToRefs(NotifStore);

	const Loading = ref(false);

	const AcceptFriendRequest = async (reqid) => {
		if (Loading.value) return;
		Loading.value = true;
		const { data, error, pending } = await useApi(
			'Accept-Friend-Request',
			`${Config.public.ApiUrl}/Friends/AproveFriendRequest?RequestId=${reqid}`,
			'POST'
		);

		if (data.value || !error.value) {
			NotifStore.RemoveFriendReqNotif(reqid);
			await ChatStore.GetUserChats();
		}

		Loading.value = false;
	};

	const DeclineFriendRequest = async (reqid) => {
		if (Loading.value) return;
		Loading.value = true;
		const { data, error, pending } = await useApi(
			'Accept-Friend-Request',
			`${Config.public.ApiUrl}/Friends/DeneyFriendRequest?RequestId=${reqid}`,
			'POST'
		);

		if (data.value || !error.value) {
			NotifStore.RemoveFriendReqNotif(reqid);
		}

		Loading.value = false;
	};
</script>

<template>
	<div
		class="absolute -right-[60px] top-full z-20 mt-3 flex max-h-[300px] w-[300px] cursor-auto flex-col gap-4 overflow-hidden overflow-y-auto rounded-2xl bg-LightModeBackGround text-DarkModeBackGround shadow-lg dark:bg-DarkModeFrameColor dark:text-white md:-left-full md:right-0 md:max-h-[600px] md:w-[350px] md:-translate-x-1/2"
	>
		<div class="p-6 pb-3 font-montserrat text-xl font-semibold">
			<p>Friend Requests</p>
		</div>
		<template v-if="FriendReqNotifs.length > 0">
			<div
				class="transition-base flex flex-col gap-3 px-4 py-3 hover:bg-PrimaryColor/30"
				v-for="Notif in FriendReqNotifs"
			>
				<div class="flex items-center gap-3">
					<img
						:src="`${Config.public.ProfilePictureUrl}${Notif.id}`"
						loading="lazy"
						class="h-[30px] w-[30px] rounded-full object-cover"
					/>
					<div class="flex flex-col gap-1 font-montserrat">
						<p class="text-sm font-medium">
							{{ Notif.firstName }} {{ Notif.lastName }}
							{{ $t('notif_page.SendFriendRequest') }}
						</p>
						<p
							class="text-GrayMedium text-xs font-medium dark:text-Gray500"
						>
							Hour ago
						</p>
					</div>
				</div>
				<div
					class="flex items-center justify-end gap-4 text-sm"
					v-if="!Notif.AcceptedNotif"
				>
					<button
						class="flex items-center gap-1 rounded-xl bg-PrimaryColor px-3 py-2 text-LightModeFrameColor disabled:cursor-not-allowed disabled:opacity-30"
						@click="AcceptFriendRequest(Notif.requestId)"
						:disabled="Loading"
					>
						<Icon name="lucide:check" size="18px" />
						<span>{{ $t('post_page.ConfirmWord') }}</span>
					</button>
					<button
						class="bg-Se transition-base flex items-center gap-1 rounded-xl border border-SecondaryColor bg-transparent px-3 py-2 hover:bg-SecondaryColor hover:text-LightModeFrameColor disabled:cursor-not-allowed disabled:opacity-30"
						@click="DeclineFriendRequest(Notif.requestId)"
						:disabled="Loading"
					>
						<Icon name="ph:x-bold" size="18px" />
						<span>{{ $t('post_page.DeclineWord') }}</span>
					</button>
				</div>
			</div>
		</template>
		<p
			v-else
			class="pb-8 text-center font-montserrat text-lg font-semibold"
		>
			No New Friend Requests Yet
		</p>
	</div>
</template>

<style scoped>
	/* width */
	::-webkit-scrollbar {
		width: 5px;
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
