<template>
	<div
	class="absolute -right-[10px] top-full z-20 mt-3 flex max-h-[300px] w-[300px] cursor-auto flex-col gap-4 overflow-hidden overflow-y-auto rounded-2xl bg-LightModeBackGround text-DarkModeBackGround shadow-lg dark:bg-DarkModeFrameColor dark:text-white md:-left-full md:right-0 md:max-h-[600px] md:w-[350px] md:-translate-x-1/2">
		<div class="p-6 pb-3 font-montserrat text-xl font-semibold">
			<p>Messages</p>
		</div>
		<template v-if="UserChats.length > 0">
			<NuxtLink :to="`/messages?id=${Chat.userId}`"
			class="transition-base flex items-center gap-3 px-4 py-3 hover:bg-PrimaryColor/30" v-for="Chat in UserChats">
				<img :src="`${Config.public.ProfilePictureUrl}${Chat.userId}`"
				class="h-[30px] w-[30px] rounded-full object-cover" loading="lazy" />
				<div class="flex flex-col gap-1 font-montserrat">
					<p class="text-sm font-medium">
						{{ Chat.firstName }}
						{{ Chat.lastName }}
						Sent You New Message
					</p>
					<p class="text-GrayMedium text-xs font-medium dark:text-Gray500">
						<Icon name="carbon:attachment" size="20px" class="text-DarkModeBackGround dark:text-Gray500" v-if="Chat.photos?.length >= 1 ||
							Chat.videos?.length >= 1
							" />

						{{
							Chat.message?.length > 25
							? `${Chat.message.slice(0, 25)}...`
							: Chat.message
						}}
					</p>
				</div>
			</NuxtLink>
		</template>
		<p v-else class="pb-8 text-center font-montserrat text-lg font-semibold">
			No New Messages Yet
		</p>
	</div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useChatStore } from '@/stores/chatstore';

const Config = useRuntimeConfig();
const ChatStore = useChatStore();

const { UserChats } = storeToRefs(ChatStore);
</script>

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
