<template>
	<div
		class="bg-PrimaryColor sticky -top-1 left-0 z-10 -mt-1 flex w-full items-center justify-between px-4 py-2 shadow-xl"
	>
		<NuxtLink
			v-for="link in Links"
			:to="link.to"
			class="redbg text-LightModeFrameColor relative m-2 flex items-center justify-center p-1"
		>
			<Icon :name="link.icon" size="20px" />
		</NuxtLink>
	</div>
</template>

<script setup>
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
			to: '/messages',
			name: 'Chat',
		},
		{
			icon: 'mdi:achievement',
			to: '/gamestatus',
			name: 'Stats',
		},
	]);
</script>

<style scoped>
	.router-link-exact-active {
		@apply text-LightModeFrameColor;
	}
	.router-link-exact-active.redbg::before {
		content: '';
		inset: -10px;
		border-radius: 50%;
		position: absolute;
		z-index: -1;
		@apply bg-SecondaryColor dark:bg-SecondaryColor;
	}
</style>
