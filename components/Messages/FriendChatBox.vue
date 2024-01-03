<script setup>
	import { useChatStore } from '@/stores/chatstore';

	const ChatStore = useChatStore();

	const Props = defineProps(['TheUser']);
	const Config = useRuntimeConfig();

	const SetActiveChat = async () => {
		await ChatStore.SetActiveChat(Props.TheUser.userId);
	};
</script>

<template>
	<div
		class="transition-base flex cursor-pointer flex-col items-center gap-2 rounded-xl py-2 hover:bg-PrimaryColor/50 md:px-4"
		@click="SetActiveChat"
	>
		<div class="flex w-full items-center justify-between gap-2">
			<div class="pointer-events-none relative min-w-[50px]">
				<img
					:src="`${Config.public.ProfilePictureUrl}${TheUser.userId}`"
					class="h-[50px] w-[50px] rounded-full object-cover"
					loading="lazy"
				/>
				<div
					class="absolute bottom-0 right-0 z-10 h-[15px] w-[15px] rounded-full border-2 border-LightModeFrameColor dark:border-DarkModeFrameColor"
					:class="{
						'bg-SuccessColor': TheUser.online,
						' bg-Gray500': !TheUser.online,
					}"
				></div>
			</div>
			<p class="flex-grow text-sm font-semibold">
				{{ TheUser.firstName }} {{ TheUser.lastName }}
			</p>
			<p
				class="text-LightModePrimaryColorTwo pointer-events-none text-xs dark:text-Gray500"
				v-if="TheUser.message"
			>
				{{ TheUser.timeCreated }}
			</p>
		</div>
		<div
			class="pointer-events-none flex w-full flex-col gap-3 pl-14 font-montserrat"
			v-if="TheUser.message"
		>
			<p
				class="text-LightModePrimaryColorTwo flex items-center gap-2 text-sm font-medium dark:text-Gray500"
			>
				<Icon
					name="carbon:attachment"
					size="20px"
					class="text-DarkModeBackGround dark:text-Gray500"
					v-if="
						TheUser.photos?.length >= 1 ||
						TheUser.videos?.length >= 1
					"
				/>

				{{
					TheUser.message.length > 25
						? `${TheUser.message.slice(0, 25)}...`
						: TheUser.message
				}}
			</p>
		</div>
	</div>
</template>

<style scoped></style>
