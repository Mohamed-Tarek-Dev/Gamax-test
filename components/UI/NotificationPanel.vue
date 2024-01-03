<script setup>
	import { storeToRefs } from 'pinia';
	import { useNotifStore } from '@/stores/notifications';

	const Config = useRuntimeConfig();
	const NotifStore = useNotifStore();

	const { GeneralNotifs } = storeToRefs(NotifStore);
</script>

<template>
	<div
		class="absolute -right-[10px] top-full z-20 mt-3 flex max-h-[300px] w-[300px] cursor-auto flex-col gap-4 overflow-hidden overflow-y-auto rounded-2xl bg-LightModeBackGround text-DarkModeBackGround shadow-lg dark:bg-DarkModeFrameColor dark:text-white md:-left-full md:right-0 md:max-h-[600px] md:w-[350px] md:-translate-x-1/2"
	>
		<div class="p-6 pb-3 font-montserrat text-xl font-semibold">
			<p>Notifications</p>
		</div>
		<template v-if="GeneralNotifs.length > 0">
			<NuxtLink
				:to="`/post?id=${Notif.postId}&type=${Notif.postsType || 0}`"
				class="transition-base flex items-center gap-3 px-4 py-3 hover:bg-PrimaryColor/30"
				v-for="Notif in GeneralNotifs"
			>
				<img
					:src="`${Config.public.ProfilePictureUrl}${Notif.actionedUserId}`"
					loading="lazy"
					class="h-[30px] w-[30px] rounded-full object-cover"
				/>
				<div class="flex flex-col gap-1 font-montserrat">
					<p class="text-sm font-medium">
						{{ Notif.actionUserFirstName }}
						{{ Notif.actionUserLastName }}
						{{ $t('notif_page.' + Notif.TextType) }}
					</p>
					<p
						class="text-GrayMedium text-xs font-medium dark:text-Gray500"
					>
						Hour ago
					</p>
				</div>
			</NuxtLink>
		</template>
		<p
			v-else
			class="pb-8 text-center font-montserrat text-lg font-semibold"
		>
			No New Notification Yet
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
