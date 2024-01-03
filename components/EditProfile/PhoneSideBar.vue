<script setup>
	import { useMainStore } from '@/stores/index';

	const emits = defineEmits(['CloseSideBar']);
	const CloseSideBar = () => {
		emits('CloseSideBar');
	};

	const MainStore = useMainStore();

	const Config = useRuntimeConfig();
</script>

<template>
	<div
		class="fixed left-0 top-0 z-20 flex h-screen w-full flex-col gap-10 overflow-hidden rounded-[20px] font-montserrat text-2xl font-semibold text-Gray500"
	>
		<div
			class="relative flex h-full flex-col gap-10 overflow-hidden rounded-[20px] bg-LightModeBackGround dark:bg-DarkModeBackGround"
		>
			<Icon
				name="icon-park-outline:close"
				size="30px"
				class="absolute right-4 top-2 z-30 text-LightModeFrameColor"
				@click="CloseSideBar"
			/>

			<div class="cover-holder relative mb-24 h-[200px]">
				<img
					v-if="MainStore.PersonalData?.id"
					:src="`${Config.public.CoverPictureUrl}${MainStore.PersonalData.id}`"
					class="h-full w-full object-cover"
					loading="lazy"
				/>
			</div>
			<div
				class="absolute left-1/2 top-[100px] min-w-[170px] -translate-x-1/2 overflow-hidden"
			>
				<img
					v-if="MainStore.PersonalData?.id"
					:src="`${Config.public.ProfilePictureUrl}${MainStore.PersonalData.id}`"
					class="h-[170px] w-[170px] rounded-full border-8 border-DarkModeBackGround object-cover"
					loading="lazy"
				/>
			</div>
			<router-link
				@click="CloseSideBar"
				to="/editprofile"
				class="should-active relative flex justify-between px-8 py-2"
			>
				<p>Profile</p>
				<Icon name="ep:arrow-right-bold" size="20px" />
			</router-link>
			<router-link
				@click="CloseSideBar"
				to="/editprofile/security"
				class="should-active relative flex justify-between px-8 py-2"
			>
				<p>Security</p>
				<Icon name="ep:arrow-right-bold" size="20px" />
			</router-link>
			<router-link
				@click="CloseSideBar"
				to="/comingsoon"
				class="relative flex justify-between px-8 py-2"
			>
				<p>Social</p>
				<Icon name="ep:arrow-right-bold" size="20px" />
			</router-link>
			<router-link
				@click="CloseSideBar"
				to="/comingsoon"
				class="relative flex justify-between px-8 py-2"
			>
				<p>Games</p>
				<Icon name="ep:arrow-right-bold" size="20px" />
			</router-link>
			<router-link
				@click="CloseSideBar"
				to="/comingsoon"
				class="relative flex justify-between px-8 py-2"
			>
				<p>Devices</p>
				<Icon name="ep:arrow-right-bold" size="20px" />
			</router-link>
			<router-link
				@click="CloseSideBar"
				to="/comingsoon"
				class="relative flex justify-between px-8 py-2"
			>
				<p>Blocked Accounts</p>
				<Icon name="ep:arrow-right-bold" size="20px" />
			</router-link>
			<router-link
				@click="CloseSideBar"
				to="/comingsoon"
				class="relative flex justify-between px-8 py-2"
			>
				<p>Payment Methods</p>
				<Icon name="ep:arrow-right-bold" size="20px" />
			</router-link>
		</div>
	</div>
</template>

<style scoped>
	.should-active.router-link-exact-active {
		@apply text-SecondaryColor;
	}
</style>
