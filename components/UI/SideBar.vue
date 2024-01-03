<script setup>
import { storeToRefs } from 'pinia';
import { useMainStore } from '@/stores/index';
import { useChatStore } from '@/stores/chatstore';
const ChatStore = useChatStore();
const { UserChats } = storeToRefs(ChatStore);

const Store = useMainStore();
const colorMode = useColorMode();
const isDark = computed(() => {
	return colorMode.preference == 'dark';
});

// const scrolled = ref(false);

const chatUserId = computed(() =>
	UserChats.value.map((chat) => {
		return chat.userId;
	})
);

const Links = ref([
	{
		icon: 'solar:home-2-bold',
		to: '/home',
		name: 'Home',
	},
	{
		icon: 'clarity:user-solid',
		to: '/profile',
		name: 'Profile',
	},
	{
		icon: 'bxs:chat',
		to: `/messages`,
		// to: `/messages?id=${chatUserId.value}`,
		name: 'Chat',
	},
	{
		icon: 'mdi:achievement',
		to: '/gamestatus',
		name: 'Stats',
	},
]);

const setColorTheme = (theme) => {
	useColorMode().preference = theme;
};

const Logout = async () => {
	await Store.Logout();
};
</script>

<template>
	<div
	class="transition-base fixed left-0 top-[60px] flex h-full flex-col bg-LightModeFrameColor py-7 dark:bg-DarkModeFrameColor sm:w-[48px] lg:w-[64px] xl:w-[96px] desktop:w-[150px]">
		<div class="sticky right-0 top-2 flex w-full flex-col gap-12">
			<NuxtLink v-for="link in Links" :to="link.to"
			class="relative flex items-center justify-center text-Gray500 dark:text-LightModeFrameColor desktop:gap-3">
				<div class="theroundedd"></div>
				<div class="redbg relative m-2">
					<Icon :name="link.icon" size="24px" />
				</div>
				<div class="hidden desktop:block">{{ link.name }}</div>
			</NuxtLink>

			<div class="lg:p-3">
				<ClientOnly>
					<div
					class="flex flex-col items-center gap-8 rounded-full p-5 text-Gray500 dark:text-LightModeFrameColor lg:bg-LightModeBackGround lg:dark:bg-DarkModeBackGround desktop:mx-auto desktop:w-fit">
						<div class="relative cursor-pointer rounded-full p-2 opacity-30" :class="{ ' active': isDark }">
							<Icon name="bi:moon-fill" size="24px" class="z-10" @click="setColorTheme('dark')" />
						</div>
						<div class="relative cursor-pointer rounded-full p-2 opacity-30" :class="{ ' active': !isDark }">
							<Icon name="iconoir:sun-light" size="24px" class="z-10" @click="setColorTheme('light')" />
						</div>
					</div>
				</ClientOnly>
			</div>
			<div
			class="relative mt-12 flex items-center justify-center text-LightModeFrameColor dark:text-LightModeFrameColor desktop:gap-3">
				<div
				class="transition-base cursor-pointer rounded-full bg-DangerColor p-3 hover:bg-DangerColor/50 dark:bg-DangerColor dark:hover:bg-DangerColor/50"
				@click="Logout">
					<Icon name="majesticons:logout" size="24px"></Icon>
				</div>
				<p class="hidden desktop:block">Logout</p>
			</div>
		</div>
	</div>
</template>

<style scoped>
.router-link-exact-active .redbg::before,
.log-out .redbg::before {
	content: '';
	inset: -10px;
	border-radius: 50%;
	position: absolute;
	z-index: -1;
	@apply bg-SecondaryColor dark:bg-SecondaryColor;
}

.router-link-exact-active .redbg {
	@apply text-LightModeFrameColor;
}

.router-link-exact-active .theroundedd {
	position: absolute;
	width: 100%;
	left: 2px;
	border-top-left-radius: 20px;
	border-bottom-left-radius: 20px;
	height: 150%;
	z-index: -2;
	@apply bg-LightModeBackGround dark:bg-DarkModeBackGround;
}

.active {
	@apply rounded-full bg-SecondaryColor text-LightModeFrameColor opacity-100;
}
</style>
