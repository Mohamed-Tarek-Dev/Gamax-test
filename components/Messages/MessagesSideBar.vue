<script setup>
	import { storeToRefs } from 'pinia';
	import { useChatStore } from '@/stores/chatstore';
	import { useBreakpoints, breakpointsTailwind } from '@vueuse/core';

	const ChatStore = useChatStore();

	const { UserChats } = storeToRefs(ChatStore);
	const ActivePage = ref('chat');

	const SetActivePage = (type) => {
		ActivePage.value = type;
	};
	const breakpoints = useBreakpoints(breakpointsTailwind);

	const desktopAndLarger = breakpoints.greaterOrEqual('xl'); // sm and larger
</script>

<template>
	<div
		class="relative flex h-[90vh] w-full flex-col overflow-hidden rounded-[17px] bg-transparent pt-7 md:bg-LightModeFrameColor md:p-4 md:text-DarkModeBackGround md:dark:bg-DarkModeFrameColor md:dark:text-LightModeFrameColor"
	>
		<div
			class="mx-auto mb-12 flex w-[225px] items-center justify-center gap-12 rounded-2xl bg-LightModeFrameColor px-4 py-2 dark:bg-DarkModeFrameColor md:w-full md:justify-between md:gap-0 md:bg-LightModeBackGround md:p-4 md:dark:bg-DarkModeBackGround"
		>
			<div
				class="flex w-[45%] cursor-pointer items-center justify-center rounded-2xl py-2 md:p-0 md:py-4"
				@click="SetActivePage('chat')"
				:class="
					ActivePage == 'chat'
						? 'bg-SecondaryColor text-LightModeFrameColor dark:bg-DarkModeFrameColor'
						: ''
				"
			>
				Chat
			</div>
			<div
				class="flex w-[45%] items-center justify-center rounded-2xl py-2 opacity-30 md:p-0 md:px-0 md:py-4"
				:class="
					ActivePage == 'groups'
						? 'bg-SecondaryColor text-LightModeFrameColor dark:bg-DarkModeFrameColor'
						: ''
				"
			>
				Groups {{ desktopAndLarger ? '( soon )' : '' }}
			</div>
		</div>
		<div class="flex flex-col gap-8 overflow-y-auto pb-8 pr-2">
			<FriendChatBox v-for="User in UserChats" :TheUser="User" />
		</div>
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
