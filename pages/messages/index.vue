<script setup>
import { useMainStore } from '@/stores/index';
import { useChatStore } from '@/stores/chatstore';

const Config = useRuntimeConfig();

const Store = useMainStore();

const ChatStore = useChatStore();
await ChatStore.GetUserChats();

const Route = useRoute();
onBeforeMount(async () => {
	await ChatStore.GetUserChats();
	if (Route.query?.id) {
		await ChatStore.SetActiveChat(Route.query.id);
	}
});

definePageMeta({
	middleware: 'require-auth',
	layout: 'messages',
});

onUnmounted(() => {
	ChatStore.RemoveActiveChat();
});
</script>

<template>
	<div
	class="mx-auto flex w-[95%] gap-8 text-DarkModeBackGround dark:text-white md:mr-4 md:w-[calc(100vw-75px)] xl:w-[calc(100vw-100px)] desktop:w-[calc(100vw-150px)]">
		<div class="w-full md:block md:w-[35%]" :class="{ ' hidden': ChatStore.ActiveChatPage }">
			<Suspense>
				<MessagesSideBar />
				<template #fallback>
					<p>Loading</p>
				</template>
			</Suspense>
		</div>
		<div class="w-full md:block md:w-[70%]" :class="{ ' hidden': !ChatStore.ActiveChatPage }">
			<EditMessage />
			<ChatWindow />
		</div>
	</div>
</template>

<style scoped></style>
